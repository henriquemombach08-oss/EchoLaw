'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function UpgradeButton({ plan, label }: { plan: string; label: string }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      alert('Erro ao iniciar pagamento. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleUpgrade} disabled={loading} className="w-full">
      {loading ? 'Redirecionando…' : label}
    </Button>
  )
}
