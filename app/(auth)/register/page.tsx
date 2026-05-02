'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/analise/nova` },
    })

    if (error) {
      setError('Erro ao criar conta. Tente outro email.')
      setLoading(false)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-8 pb-8 space-y-3">
            <div className="text-4xl">📧</div>
            <h2 className="font-semibold text-gray-800">Confirme seu email</h2>
            <p className="text-sm text-gray-500">
              Enviamos um link de confirmação para <strong>{email}</strong>.
              Clique no link para ativar sua conta.
            </p>
            <a href="/login" className="block text-sm text-blue-600 hover:underline mt-2">
              Voltar para o login
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">EchoLaw</CardTitle>
          <p className="text-sm text-gray-500">Crie sua conta gratuita</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mínimo 6 caracteres"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta…' : 'Criar conta grátis'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Já tem conta?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Entrar
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
