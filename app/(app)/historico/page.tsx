import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Analysis } from '@/types'

function getRiskBadge(score: number | null) {
  if (score === null) return null

  if (score <= 30) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        Risco baixo · {score}
      </span>
    )
  }
  if (score <= 60) {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
        Risco médio · {score}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
      Risco alto · {score}
    </span>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

type AnalysisRow = {
  id: string
  summary: string | null
  risk_score: number | null
  created_at: string
  documents: { name: string; type: string | null } | null
}

export default async function HistoricoPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: analyses } = await supabase
    .from('analyses')
    .select('id, summary, risk_score, created_at, documents(name, type)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const rows = (analyses ?? []) as unknown as AnalysisRow[]

  if (rows.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Histórico de análises</h1>
        <p className="text-gray-500">Você ainda não fez nenhuma análise.</p>
        <Link
          href="/analise/nova"
          className="inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          Fazer primeira análise
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Histórico de análises</h1>
        <Link
          href="/analise/nova"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
        >
          Nova análise
        </Link>
      </div>

      <ul className="space-y-3">
        {rows.map((analysis) => {
          const docName = analysis.documents?.name ?? 'Documento sem nome'
          const docType = analysis.documents?.type ?? null
          const summary = analysis.summary
            ? analysis.summary.length > 120
              ? analysis.summary.slice(0, 120).trimEnd() + '…'
              : analysis.summary
            : null

          return (
            <li key={analysis.id}>
              <Link
                href={`/analise/${analysis.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate font-medium text-gray-900">{docName}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {formatDate(analysis.created_at)}
                      </span>
                      {docType && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                          {docType}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getRiskBadge(analysis.risk_score)}
                  </div>
                </div>

                {summary && (
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{summary}</p>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
