import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { extractTextFromPDF } from '@/lib/pdf-parser'
import { chunkText } from '@/lib/chunker'
import { generateEmbedding, generateEmbeddings, analyzeWithLLM, extractTextFromImage } from '@/lib/ai'
import { ANALYSIS_SYSTEM_PROMPT, ANALYSIS_USER_PROMPT } from '@/lib/prompts'
import { AnalysisResult } from '@/types'

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  essencial: Infinity,
  pro: Infinity,
  b2b: Infinity,
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const service = createServiceClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { documentPath, documentName } = await request.json()
  if (!documentPath || !documentName) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  // Check usage limit
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, analyses_used, analyses_limit')
    .eq('id', user.id)
    .single()

  if (profile) {
    const limit = PLAN_LIMITS[profile.plan] ?? 3
    if (profile.analyses_used >= limit) {
      return NextResponse.json(
        { error: 'Limite de análises atingido. Faça upgrade do seu plano.' },
        { status: 403 }
      )
    }
  }

  // Download file from storage
  const { data: fileData, error: downloadError } = await service.storage
    .from('documents')
    .download(documentPath)

  if (downloadError || !fileData) {
    return NextResponse.json({ error: `Erro ao baixar arquivo: ${downloadError?.message}` }, { status: 500 })
  }

  // Extract text
  const buffer = Buffer.from(await fileData.arrayBuffer())
  let rawText = ''

  if (documentPath.toLowerCase().endsWith('.pdf')) {
    rawText = await extractTextFromPDF(buffer)
  } else {
    rawText = await extractTextFromImage(buffer.toString('base64'))
  }

  if (!rawText.trim()) {
    return NextResponse.json({ error: 'Não foi possível extrair texto do documento' }, { status: 422 })
  }

  // Save document
  const { data: doc, error: docError } = await supabase
    .from('documents')
    .insert({ user_id: user.id, name: documentName, storage_path: documentPath, raw_text: rawText })
    .select()
    .single()

  if (docError || !doc) {
    return NextResponse.json({ error: 'Erro ao salvar documento' }, { status: 500 })
  }

  // Chunk + embed (max 40 chunks; batch all in one/two Jina calls)
  const allChunks = chunkText(rawText).slice(0, 40)
  const docSummaryText = rawText.slice(0, 2000)
  const textsToEmbed = [...allChunks, docSummaryText]
  const embeddings = await generateEmbeddings(textsToEmbed)
  const chunkEmbeddings = embeddings.slice(0, allChunks.length)
  const docEmbedding = embeddings[allChunks.length]

  const chunkInserts = allChunks.map((content, chunk_index) => ({
    document_id: doc.id,
    content,
    embedding: chunkEmbeddings[chunk_index],
    chunk_index,
  }))
  await service.from('document_chunks').insert(chunkInserts)
  const { data: legalChunks } = await service.rpc('match_legal_knowledge', {
    query_embedding: docEmbedding,
    match_count: 5,
  })

  const legalContext = legalChunks?.length
    ? legalChunks.map((c: { source: string; article: string; content: string }) =>
        `[${c.source} - ${c.article}]: ${c.content}`
      ).join('\n\n')
    : 'Base legal não disponível para este documento.'

  // Detect document type from first 500 words
  const preview = rawText.split(/\s+/).slice(0, 500).join(' ')
  const typeKeywords = ['contrato', 'notificação', 'multa', 'termo', 'rescisão', 'cobrança']
  const detectedType = typeKeywords.find(k => rawText.toLowerCase().includes(k)) ?? 'outro'

  let result: AnalysisResult
  try {
    const rawResult = await analyzeWithLLM(
      ANALYSIS_SYSTEM_PROMPT,
      ANALYSIS_USER_PROMPT(preview, legalContext, detectedType)
    )
    result = JSON.parse(rawResult)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Erro ao processar análise: ${msg}` }, { status: 500 })
  }

  // Save analysis
  const { data: analysis, error: analysisError } = await supabase
    .from('analyses')
    .insert({
      document_id: doc.id,
      user_id: user.id,
      summary: result.summary,
      rights: result.rights,
      draft_response: result.draftResponse,
      risk_score: result.riskScore,
      risk_explanation: result.riskExplanation,
    })
    .select()
    .single()

  if (analysisError || !analysis) {
    return NextResponse.json({ error: 'Erro ao salvar análise' }, { status: 500 })
  }

  // Update document type and usage counter
  await supabase.from('documents').update({ type: result.documentType }).eq('id', doc.id)
  await service
    .from('profiles')
    .update({ analyses_used: (profile?.analyses_used ?? 0) + 1 })
    .eq('id', user.id)

  return NextResponse.json({ analysisId: analysis.id })
}
