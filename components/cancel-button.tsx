'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CancelButton() {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function handleCancel() {
    if (!confirmed) {
      setConfirmed(true)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/cancel', { method: 'POST' })
      const { error } = await res.json()
      if (error) throw new Error(error)
      window.location.reload()
    } catch (err) {
      alert('Erro ao cancelar. Tente novamente.')
      setLoading(false)
      setConfirmed(false)
    }
  }

  return (
    <div className="text-center space-y-2">
      {confirmed && (
        <p className="text-sm text-red-600 font-medium">
          Tem certeza? O cancelamento é imediato e sem reembolso.
        </p>
      )}
      <Button
        variant="outline"
        onClick={handleCancel}
        disabled={loading}
        className={confirmed ? 'border-red-300 text-red-600 hover:bg-red-50' : 'text-gray-500'}
      >
        {loading ? 'Cancelando…' : confirmed ? 'Confirmar cancelamento' : 'Cancelar plano'}
      </Button>
      {confirmed && (
        <button
          onClick={() => setConfirmed(false)}
          className="block mx-auto text-xs text-gray-400 hover:text-gray-600"
        >
          Voltar
        </button>
      )}
    </div>
  )
}
