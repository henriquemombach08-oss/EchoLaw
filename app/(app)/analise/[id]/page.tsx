import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AnalysisResult } from '@/components/analysis-result'
import { ChatWindow } from '@/components/chat-window'

export default async function AnalisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: analysis } = await supabase
    .from('analyses')
    .select('*, documents(name, type)')
    .eq('id', id)
    .single()

  if (!analysis) notFound()

  const docName = (analysis.documents as { name: string } | null)?.name ?? 'Documento'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Análise concluída</p>
        <h1 className="text-xl font-bold text-gray-900 truncate">{docName}</h1>
      </div>

      <AnalysisResult analysis={analysis} />

      <div className="space-y-3">
        <h2 className="font-semibold text-gray-800">Tire suas dúvidas</h2>
        <ChatWindow analysisId={id} />
      </div>
    </div>
  )
}
