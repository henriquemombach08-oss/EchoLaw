import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/analise/nova')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf6f0', color: '#2e3230' }}>
      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-t-4 border-b"
        style={{
          backgroundColor: '#faf6f0',
          borderTopColor: '#705c30',
          borderBottomColor: '#e4e0d8',
          boxShadow: '0 4px 20px rgba(46,50,48,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <span
            className="text-2xl font-black tracking-tighter"
            style={{ color: '#4a7c59', fontFamily: 'Literata, serif' }}
          >
            EchoLaw
          </span>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/analise/nova"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#4a4e4a' }}
            >
              Nova Análise
            </a>
            <a
              href="/historico"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#4a4e4a' }}
            >
              Histórico
            </a>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#4a4e4a' }}
            >
              Suporte
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-6 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4a7c59', color: '#ffffff' }}
            >
              Entrar
            </a>
            <a
              href="/register"
              className="px-6 py-2 rounded-lg font-bold text-sm border transition-opacity hover:opacity-80"
              style={{ borderColor: '#4a7c59', color: '#4a7c59' }}
            >
              Cadastrar
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: copy */}
              <div className="flex flex-col gap-6">
                <h1
                  className="text-5xl font-black leading-tight tracking-tight"
                  style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
                >
                  O futuro da{' '}
                  <span style={{ color: '#4a7c59' }}>análise jurídica</span>{' '}
                  é humano e inteligente.
                </h1>

                <p className="text-lg leading-relaxed" style={{ color: '#4a4e4a' }}>
                  Envie contratos, notificações ou multas e receba uma análise clara dos seus
                  direitos — sem juridiquês, sem espera, sem complicação.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/register"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#4a7c59', color: '#ffffff' }}
                  >
                    Começar Agora Grátis
                  </a>
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base border transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: '#f0ece4',
                      color: '#4a7c59',
                      borderColor: '#c8e8d0',
                    }}
                  >
                    Fazer Login
                  </a>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex -space-x-2">
                    {['#4a7c59', '#705c30', '#6b6358'].map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#4a4e4a' }}>
                    <strong style={{ color: '#4a7c59' }}>+2.000 usuários</strong> confiam na
                    EchoLaw
                  </p>
                </div>
              </div>

              {/* Right: decorative card */}
              <div className="flex justify-center md:justify-end">
                <div
                  className="w-full max-w-sm rounded-xl p-4 shadow-2xl"
                  style={{ backgroundColor: '#f5f1ea' }}
                >
                  {/* Mock document card */}
                  <div
                    className="rounded-lg p-6 mb-4"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#c8e8d0' }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ color: '#4a7c59', fontSize: '20px' }}
                        >
                          description
                        </span>
                      </div>
                      <div>
                        <div
                          className="h-3 w-32 rounded-full"
                          style={{ backgroundColor: '#e4e0d8' }}
                        />
                        <div
                          className="h-2 w-20 rounded-full mt-1"
                          style={{ backgroundColor: '#f0ece4' }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[70, 90, 60, 80].map((w, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full"
                          style={{ backgroundColor: '#f0ece4', width: `${w}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mock analysis badge */}
                  <div
                    className="rounded-lg p-4 flex items-center gap-3"
                    style={{ backgroundColor: '#c8e8d0' }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#4a7c59' }}
                    >
                      check_circle
                    </span>
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: '#2a6038' }}
                      >
                        Análise concluída
                      </p>
                      <p className="text-xs" style={{ color: '#4a7c59' }}>
                        3 cláusulas identificadas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Como Funciona ── */}
        <section className="py-24" style={{ backgroundColor: '#f5f1ea' }}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Label */}
            <p
              className="text-sm font-bold tracking-widest uppercase text-center mb-4"
              style={{ color: '#705c30' }}
            >
              Processo Simples
            </p>
            <h2
              className="text-4xl font-black text-center mb-16"
              style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
            >
              Como a EchoLaw funciona?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'upload_file',
                  title: 'Envie o Documento',
                  description:
                    'Faça upload de qualquer documento jurídico — contrato, multa ou notificação. PDF ou imagem até 10 MB.',
                },
                {
                  icon: 'psychology',
                  title: 'IA Analisa',
                  description:
                    'Nossa inteligência artificial especializada identifica riscos, direitos e pontos críticos em segundos.',
                },
                {
                  icon: 'assignment_turned_in',
                  title: 'Entenda e Aja',
                  description:
                    'Receba uma explicação clara em linguagem acessível e um rascunho de resposta pronto para usar.',
                },
              ].map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="p-8 rounded-xl"
                  style={{
                    backgroundColor: '#faf6f0',
                    boxShadow: '0 4px 20px rgba(46,50,48,0.06)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: '#c8e8d0' }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#4a7c59', fontSize: '28px' }}
                    >
                      {icon}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-black mb-3"
                    style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
                  >
                    {title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#4a4e4a' }}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Por que EchoLaw? (Bento grid) ── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p
              className="text-sm font-bold tracking-widest uppercase text-center mb-4"
              style={{ color: '#705c30' }}
            >
              Diferenciais
            </p>
            <h2
              className="text-4xl font-black text-center mb-16"
              style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
            >
              Por que EchoLaw?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Big card 1 — md:col-span-8 */}
              <div
                className="md:col-span-8 rounded-xl p-10 flex flex-col justify-between min-h-[240px]"
                style={{ backgroundColor: '#4a7c59', color: '#ffffff' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#ffffff', fontSize: '28px' }}>
                    bolt
                  </span>
                </div>
                <div>
                  <h3
                    className="text-2xl font-black mb-3"
                    style={{ fontFamily: 'Literata, serif' }}
                  >
                    Agilidade sem precedentes
                  </h3>
                  <p className="text-lg opacity-90">
                    Reduza em <strong>85%</strong> o tempo gasto na leitura e interpretação de
                    documentos jurídicos complexos. O que levaria horas, agora leva segundos.
                  </p>
                </div>
              </div>

              {/* Small card 1 — md:col-span-4 */}
              <div
                className="md:col-span-4 rounded-xl p-8 flex flex-col justify-between min-h-[240px]"
                style={{ backgroundColor: '#c4a66a' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#554020', fontSize: '28px' }}>
                    security
                  </span>
                </div>
                <div>
                  <h3
                    className="text-xl font-black mb-2"
                    style={{ fontFamily: 'Literata, serif', color: '#554020' }}
                  >
                    Segurança Total
                  </h3>
                  <p className="text-sm" style={{ color: '#705c30' }}>
                    Seus documentos são criptografados e nunca compartilhados.
                  </p>
                </div>
              </div>

              {/* Small card 2 — md:col-span-4 */}
              <div
                className="md:col-span-4 rounded-xl p-8 flex flex-col justify-between min-h-[240px]"
                style={{ backgroundColor: '#f0e8db' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#d4ccbf' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#4a4538', fontSize: '28px' }}>
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3
                    className="text-xl font-black mb-2"
                    style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
                  >
                    IA Especializada
                  </h3>
                  <p className="text-sm" style={{ color: '#4a4e4a' }}>
                    Treinada especificamente para o direito brasileiro, com linguagem acessível.
                  </p>
                </div>
              </div>

              {/* Big card 2 — md:col-span-8 */}
              <div
                className="md:col-span-8 rounded-xl p-10 flex flex-col justify-between min-h-[240px]"
                style={{ backgroundColor: '#eae6de' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#c4c8bc' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#4a4e4a', fontSize: '28px' }}>
                    manage_search
                  </span>
                </div>
                <div>
                  <h3
                    className="text-2xl font-black mb-3"
                    style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
                  >
                    Análise Completa
                  </h3>
                  <p className="text-lg" style={{ color: '#4a4e4a' }}>
                    Identificamos cláusulas abusivas, prazos críticos, obrigações ocultas e seus
                    direitos — tudo em um único relatório organizado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24" style={{ backgroundColor: '#f5f1ea' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="p-12 md:p-20 rounded-xl text-center border"
              style={{
                backgroundColor: '#f0ece4',
                borderColor: 'rgba(196,200,188,0.3)',
              }}
            >
              <span
                className="material-symbols-outlined mb-6 block"
                style={{ color: '#4a7c59', fontSize: '48px' }}
              >
                gavel
              </span>
              <h2
                className="text-4xl font-black mb-6"
                style={{ fontFamily: 'Literata, serif', color: '#2e3230' }}
              >
                Pronto para entender seus documentos?
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#4a4e4a' }}>
                Junte-se a mais de 2.000 brasileiros que já usam a EchoLaw para tomar decisões
                mais seguras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#4a7c59', color: '#ffffff' }}
                >
                  Criar Conta Gratuita
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base border-2 transition-opacity hover:opacity-80"
                  style={{ borderColor: '#4a7c59', color: '#4a7c59' }}
                >
                  Fazer Login
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t py-12 mt-auto"
        style={{ backgroundColor: '#f5f1ea', borderColor: '#e4e0d8' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span
                className="text-xl font-black tracking-tighter block mb-2"
                style={{ color: '#4a7c59', fontFamily: 'Literata, serif' }}
              >
                EchoLaw
              </span>
              <p className="text-sm max-w-sm" style={{ color: '#74796e' }}>
                Esta análise é informativa e não substitui consultoria jurídica profissional.
              </p>
            </div>
            <nav className="flex items-center gap-6">
              {['Termos', 'Privacidade', 'Contato', 'Sobre'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#74796e' }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div
            className="mt-8 pt-8 text-center text-sm border-t"
            style={{ borderColor: '#e4e0d8', color: '#74796e' }}
          >
            &copy; 2026 EchoLaw. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
