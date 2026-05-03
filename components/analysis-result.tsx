'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RightsList } from '@/components/rights-list'
import { Analysis } from '@/types'
import { useState } from 'react'

function RiskGauge({ score, explanation }: { score: number; explanation?: string }) {
  const color = score < 33 ? 'bg-green-500' : score < 66 ? 'bg-yellow-500' : 'bg-red-500'
  const label = score < 33 ? 'Baixo' : score < 66 ? 'Médio' : 'Alto'

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Score de risco</span>
        <span className="font-bold text-lg">{score}/100 — {label}</span>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      {explanation && <p className="text-sm text-gray-600">{explanation}</p>}
    </div>
  )
}

export function AnalysisResult({ analysis }: { analysis: Analysis }) {
  const [copied, setCopied] = useState(false)

  function copyDraft() {
    if (analysis.draft_response) {
      navigator.clipboard.writeText(analysis.draft_response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Tabs defaultValue="resumo" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="resumo">Resumo</TabsTrigger>
        <TabsTrigger value="direitos">Seus Direitos</TabsTrigger>
        <TabsTrigger value="rascunho">Rascunho</TabsTrigger>
        <TabsTrigger value="risco">Risco</TabsTrigger>
      </TabsList>

      <TabsContent value="resumo" className="mt-4 prose prose-sm max-w-none text-gray-700 leading-relaxed">
        <p>{analysis.summary}</p>
      </TabsContent>

      <TabsContent value="direitos" className="mt-4">
        {analysis.rights && analysis.rights.length > 0 ? (
          <RightsList rights={analysis.rights} />
        ) : (
          <p className="text-sm text-gray-500">Nenhum item identificado.</p>
        )}
      </TabsContent>

      <TabsContent value="rascunho" className="mt-4 space-y-3">
        {analysis.draft_response ? (
          <>
            <Textarea
              value={analysis.draft_response}
              readOnly
              rows={10}
              className="font-mono text-sm resize-none"
            />
            <Button onClick={copyDraft} variant="outline" size="sm">
              {copied ? '✓ Copiado!' : 'Copiar rascunho'}
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-500">Rascunho não aplicável para este tipo de documento.</p>
        )}
      </TabsContent>

      <TabsContent value="risco" className="mt-4">
        {analysis.risk_score !== null ? (
          <RiskGauge score={analysis.risk_score} explanation={analysis.risk_explanation} />
        ) : (
          <p className="text-sm text-gray-500">Score não disponível.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
