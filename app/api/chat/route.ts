import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { generateEmbedding, streamChat } from '@/lib/ai'
import { CHAT_SYSTEM_PROMPT } from '@/lib/prompts'
import { ChatMessage } from '@/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const service = createServiceClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const { analysisId, message, history } = await request.json() as {
    analysisId: string
    message: string
    history: ChatMessage[]
  }

  if (!analysisId || !message) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  // Fetch analysis + document
  const { data: analysis } = await supabase
    .from('analyses')
    .select('*, documents(id, raw_text)')
    .eq('id', analysisId)
    .eq('user_id', user.id)
    .single()

  if (!analysis) return NextResponse.json({ error: 'Análise não encontrada' }, { status: 404 })

  // Fetch relevant document chunks
  const queryEmbedding = await generateEmbedding(message)
  const { data: chunks } = await service.rpc('match_document_chunks', {
    query_embedding: queryEmbedding,
    document_uuid: analysis.document_id,
    match_count: 5,
  })

  const context = chunks?.length
    ? chunks.map((c: { content: string }) => c.content).join('\n\n')
    : ''

  const systemWithContext = `${CHAT_SYSTEM_PROMPT}\n\nTRECHOS RELEVANTES DO DOCUMENTO:\n${context}`

  const messages: ChatMessage[] = [
    ...history.slice(-10),
    { role: 'user', content: message },
  ]

  // Save user message
  await supabase.from('chat_messages').insert({
    analysis_id: analysisId,
    user_id: user.id,
    role: 'user',
    content: message,
  })

  // Stream response
  const stream = await streamChat(systemWithContext, messages)

  const encoder = new TextEncoder()
  let fullResponse = ''

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) {
          fullResponse += text
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()

      // Save assistant message after stream completes
      await supabase.from('chat_messages').insert({
        analysis_id: analysisId,
        user_id: user.id,
        role: 'assistant',
        content: fullResponse,
      })
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
