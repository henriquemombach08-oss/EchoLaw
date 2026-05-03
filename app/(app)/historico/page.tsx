import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Analysis } from '@/types'

function getRiskBadge(score: number | null) {
  if (score === null) return null

  if (score <= 30) {
    return (
      <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider bg-green-100 text-green-700">
        Baixo · {score}
      </span>
    )
  }
  if (score <= 60) {
    return (
      <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider bg-amber-100 text-amber-700">
        Médio · {score}
      </span>
    )
  }
  return (
    <span className="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider bg-red-100 text-red-700">
      Alto · {score}
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
      <div>
        {/* Hero banner */}
        <div className="bg-[#f8e0a8] border-t-4 border-[#705c30] py-12 px-6 text-center">
          <h1 className="text-4xl font-black text-on-surface mb-2">Histórico de Análises</h1>
          <p className="text-on-surface-variant text-lg">Todas as suas análises em um só lugar.</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-on-surface-variant text-lg">Você ainda não fez nenhuma análise.</p>
          <Link
            href="/analise/nova"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-on-primary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Fazer primeira análise
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero banner */}
      <div className="bg-[#f8e0a8] border-t-4 border-[#705c30] py-12 px-6 text-center">
        <h1 className="text-4xl font-black text-on-surface mb-2">Histórico de Análises</h1>
        <p className="text-on-surface-variant text-lg">Todas as suas análises em um só lugar.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Search bar (visual only) */}
        <div className="bg-surface p-4 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] flex gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar análises…"
              readOnly
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-sm text-on-surface-variant outline-none"
            />
          </div>
          <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-base">filter_list</span>
            Filtrar
          </button>
        </div>

        {/* History cards */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-on-surface-variant font-semibold">
            {rows.length} {rows.length === 1 ? 'análise encontrada' : 'análises encontradas'}
          </span>
          <Link
            href="/analise/nova"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nova análise
          </Link>
        </div>

        <ul className="space-y-4">
          {rows.map((analysis) => {
            const docName = analysis.documents?.name ?? 'Documento sem nome'
            const docType = analysis.documents?.type ?? null
            const isHighRisk = analysis.risk_score !== null && analysis.risk_score > 60

            return (
              <li key={analysis.id}>
                <Link
                  href={`/analise/${analysis.id}`}
                  className={`bg-surface-container-low p-6 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] hover:bg-surface-container transition-all group flex items-center gap-6 ${
                    isHighRisk ? 'border-l-4 border-error' : ''
                  }`}
                >
                  {/* Icon circle */}
                  <div className="h-14 w-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {docName}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {formatDate(analysis.created_at)}
                      </span>
                      {docType && (
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">category</span>
                          {docType}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Risk badge + chevron */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {getRiskBadge(analysis.risk_score)}
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
