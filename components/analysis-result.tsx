'use client'

import { RightsList } from '@/components/rights-list'
import { Analysis } from '@/types'
import { useState } from 'react'

type TabId = 'resumo' | 'direitos' | 'rascunho' | 'risco'

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'resumo', label: 'Resumo', icon: 'description' },
  { id: 'direitos', label: 'Seus Direitos', icon: 'verified_user' },
  { id: 'rascunho', label: 'Rascunho', icon: 'edit_note' },
  { id: 'risco', label: 'Risco', icon: 'shutter_speed' },
]

function RiskGauge({ score, explanation }: { score: number; explanation?: string }) {
  const color =
    score < 33 ? 'bg-primary' : score < 66 ? 'bg-[#c4a66a]' : 'bg-error'
  const label = score < 33 ? 'Baixo' : score < 66 ? 'Médio' : 'Alto'

  return (
    <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 text-center space-y-6">
      <h3 className="text-primary text-2xl font-black">Score de Risco</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-on-surface-variant">
          <span>Score de risco</span>
          <span className="font-bold text-lg text-on-surface">
            {score}/100 — {label}
          </span>
        </div>
        <div className="bg-surface-container-highest h-4 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${color}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      {explanation && (
        <p className="text-sm text-on-surface-variant leading-relaxed text-left">{explanation}</p>
      )}
    </div>
  )
}

export function AnalysisResult({ analysis }: { analysis: Analysis }) {
  const [activeTab, setActiveTab] = useState<TabId>('resumo')
  const [copied, setCopied] = useState(false)

  function copyDraft() {
    if (analysis.draft_response) {
      navigator.clipboard.writeText(analysis.draft_response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const docName = analysis.documents?.name ?? 'Documento sem nome'

  return (
    <div className="w-full">
      {/* Document header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-4 uppercase tracking-widest">
          Análise Concluída
        </div>
        <h1 className="text-4xl font-black text-on-surface mb-2">{docName}</h1>
      </div>

      {/* Tabs navigation */}
      <div className="bg-surface-container-low rounded-xl p-2 mb-8 flex flex-wrap gap-1 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? 'bg-primary text-on-primary font-bold rounded-lg py-3 px-4 flex items-center justify-center gap-2 flex-1 transition-all'
                : 'hover:bg-surface-container-high text-on-surface-variant font-semibold rounded-lg py-3 px-4 flex items-center justify-center gap-2 flex-1 transition-all'
            }
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'resumo' && (
        <div className="bg-surface rounded-xl p-8 border border-outline-variant/30 leading-relaxed text-on-surface">
          <h3 className="text-primary text-xl font-black mb-4">Visão Geral</h3>
          <p className="text-on-surface leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      {activeTab === 'direitos' && (
        <div>
          {analysis.rights && analysis.rights.length > 0 ? (
            <RightsList rights={analysis.rights} />
          ) : (
            <p className="text-sm text-on-surface-variant">Nenhum item identificado.</p>
          )}
        </div>
      )}

      {activeTab === 'rascunho' && (
        <div className="bg-surface-container rounded-xl p-8 space-y-4">
          {analysis.draft_response ? (
            <>
              <div className="flex justify-end">
                <button
                  onClick={copyDraft}
                  className="bg-primary-fixed px-4 py-2 rounded-lg text-primary flex items-center gap-2 hover:bg-primary-container transition-colors text-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-base">
                    {copied ? 'check_circle' : 'content_copy'}
                  </span>
                  {copied ? 'Copiado!' : 'Copiar rascunho'}
                </button>
              </div>
              <textarea
                value={analysis.draft_response}
                readOnly
                rows={10}
                className="w-full bg-surface-bright border border-outline-variant rounded-lg p-4 font-mono text-sm resize-none text-on-surface focus:outline-none"
              />
            </>
          ) : (
            <p className="text-sm text-on-surface-variant">
              Rascunho não aplicável para este tipo de documento.
            </p>
          )}
        </div>
      )}

      {activeTab === 'risco' && (
        <div>
          {analysis.risk_score !== null ? (
            <RiskGauge
              score={analysis.risk_score}
              explanation={analysis.risk_explanation ?? undefined}
            />
          ) : (
            <p className="text-sm text-on-surface-variant">Score não disponível.</p>
          )}
        </div>
      )}
    </div>
  )
}
