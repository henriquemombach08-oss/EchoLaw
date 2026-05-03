'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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

  /* ── Success state ── */
  if (success) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundColor: '#faf6f0' }}
      >
        <div
          className="max-w-md w-full rounded-xl p-10 text-center border"
          style={{
            backgroundColor: '#f5f1ea',
            borderColor: 'rgba(196,200,188,0.3)',
            boxShadow: '0 4px 20px rgba(46,50,48,0.06)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#c8e8d0' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: '#4a7c59', fontSize: '32px' }}
            >
              mark_email_read
            </span>
          </div>
          <h2
            className="text-2xl font-black mb-3"
            style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
          >
            Confirme seu email
          </h2>
          <p className="text-sm mb-6" style={{ color: '#4a4e4a' }}>
            Enviamos um link de confirmação para{' '}
            <strong style={{ color: '#2e3230' }}>{email}</strong>. Clique no link para ativar
            sua conta.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border-2 transition-opacity hover:opacity-80"
            style={{ borderColor: '#4a7c59', color: '#4a7c59' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_back
            </span>
            Voltar para o login
          </a>
        </div>
      </div>
    )
  }

  /* ── Register form ── */
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: '#faf6f0', color: '#2e3230' }}
    >
      {/* Abstract background blobs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: '#c8e8d0' }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: '#f8e0a8' }}
      />

      <main className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
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
              Crie sua conta gratuita e comece a analisar documentos
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
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Email field with icon */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold"
                  style={{ color: '#2e3230' }}
                >
                  Email
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#74796e', fontSize: '20px' }}
                  >
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
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
              </div>

              {/* Password field with icon */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                  style={{ color: '#2e3230' }}
                >
                  Senha
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#74796e', fontSize: '20px' }}
                  >
                    lock
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="mínimo 6 caracteres"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
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
                    Criando conta…
                  </>
                ) : (
                  <>
                    Criar conta grátis
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              {/* Login link */}
              <a
                href="/login"
                className="w-full flex items-center justify-center py-3 rounded-lg font-bold text-sm border transition-opacity hover:opacity-80"
                style={{ borderColor: '#4a7c59', color: '#4a7c59' }}
              >
                Já tenho conta — Fazer Login
              </a>
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
                verified_user
              </span>
              <span className="text-xs font-medium" style={{ color: '#4a4e4a' }}>
                100% gratuito para começar
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
                shield
              </span>
              <span className="text-xs font-medium" style={{ color: '#4a4e4a' }}>
                Dados protegidos LGPD
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t py-8 relative z-10"
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
