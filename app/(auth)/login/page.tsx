'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push('/analise/nova')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#faf6f0', color: '#2e3230' }}
    >
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* ── Logo section ── */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
              style={{
                backgroundColor: '#4a7c59',
                boxShadow: '0 4px 20px rgba(46,50,48,0.06)',
              }}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: '#ffffff' }}
              >
                gavel
              </span>
            </div>
            <h1
              className="text-3xl font-black tracking-tighter mb-2"
              style={{ fontFamily: 'Literata, serif', color: '#4a7c59' }}
            >
              EchoLaw
            </h1>
            <p className="text-sm" style={{ color: '#4a4e4a' }}>
              Acesse sua plataforma de inteligência jurídica
            </p>
          </div>

          {/* ── Card ── */}
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: '#f5f1ea',
              borderColor: 'rgba(196,200,188,0.3)',
              boxShadow: '0 4px 20px rgba(46,50,48,0.06)',
            }}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold"
                  style={{ color: '#2e3230' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#faf6f0',
                    border: '1px solid #c4c8bc',
                    color: '#2e3230',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #4a7c59'
                    e.currentTarget.style.borderColor = '#4a7c59'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#c4c8bc'
                  }}
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                  style={{ color: '#2e3230' }}
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#faf6f0',
                    border: '1px solid #c4c8bc',
                    color: '#2e3230',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #4a7c59'
                    e.currentTarget.style.borderColor = '#4a7c59'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#c4c8bc'
                  }}
                />
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{ backgroundColor: '#ffdad8', color: '#690005' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    error
                  </span>
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm transition-opacity disabled:opacity-60 hover:opacity-90"
                style={{ backgroundColor: '#4a7c59', color: '#ffffff' }}
              >
                {loading ? (
                  <>
                    <span
                      className="material-symbols-outlined animate-spin"
                      style={{ fontSize: '18px' }}
                    >
                      progress_activity
                    </span>
                    Entrando…
                  </>
                ) : (
                  <>
                    Entrar
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              {/* Register link */}
              <p className="text-center text-sm" style={{ color: '#4a4e4a' }}>
                Não tem conta?{' '}
                <a
                  href="/register"
                  className="font-bold transition-opacity hover:opacity-70"
                  style={{ color: '#4a7c59' }}
                >
                  Cadastre-se gratuitamente
                </a>
              </p>
            </form>
          </div>

          {/* ── Trust badges ── */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: '#f0ece4' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: '#4a7c59', fontSize: '20px' }}
              >
                security
              </span>
              <span className="text-xs font-medium" style={{ color: '#4a4e4a' }}>
                Conexão segura SSL
              </span>
            </div>
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ backgroundColor: '#f0ece4' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: '#4a7c59', fontSize: '20px' }}
              >
                bolt
              </span>
              <span className="text-xs font-medium" style={{ color: '#4a4e4a' }}>
                Acesso instantâneo
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t py-8"
        style={{ backgroundColor: '#f5f1ea', borderColor: '#e4e0d8' }}
      >
        <div className="max-w-md mx-auto px-6 text-center">
          <span
            className="font-black tracking-tighter"
            style={{ color: '#4a7c59', fontFamily: 'Literata, serif' }}
          >
            EchoLaw
          </span>
          <div className="flex items-center justify-center gap-4 mt-3">
            {['Termos', 'Privacidade', 'Contato'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: '#74796e' }}
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: '#74796e' }}>
            &copy; 2026 EchoLaw. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
