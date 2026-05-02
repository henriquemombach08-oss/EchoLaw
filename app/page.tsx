import { redirect } from 'next/navigation'
import Link from 'next/link'
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 tracking-tight">EchoLaw</span>
          <Link
            href="/login"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Entenda qualquer documento jurídico{' '}
              <span className="text-blue-600">em segundos</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
              Envie contratos, notificações ou multas e receba uma análise clara dos seus direitos
              — sem precisar de advogado.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors shadow-sm"
              >
                Analisar grátis
              </Link>
              <Link
                href="/login"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Já tenho conta → Entrar
              </Link>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Como funciona</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Envie o documento',
                description: 'PDF ou imagem até 10 MB. Suporte a contratos, multas e notificações.',
              },
              {
                step: '2',
                title: 'IA analisa',
                description: 'Identificamos direitos, riscos e alertas em linguagem acessível.',
              },
              {
                step: '3',
                title: 'Entenda e aja',
                description: 'Receba um rascunho de resposta pronto para usar.',
              },
            ].map(({ step, title, description }) => (
              <li key={step} className="flex flex-col items-center text-center gap-3">
                <span className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {step}
                </span>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Benefícios */}
        <section className="bg-slate-50 border-t border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
              Tudo que você precisa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Linguagem simples',
                  description:
                    'Explicação clara, sem juridiquês. Qualquer pessoa entende o que está em jogo.',
                },
                {
                  title: 'Identificação de riscos',
                  description:
                    'Score de risco visual que aponta rapidamente o que merece sua atenção.',
                },
                {
                  title: 'Chat com o documento',
                  description:
                    'Tire dúvidas em tempo real diretamente sobre o conteúdo enviado.',
                },
              ].map(({ title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pronto para entender seus direitos?
          </h2>
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-10 py-3 rounded-lg transition-colors shadow-sm"
          >
            Comece agora — é grátis
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-6">
        <p className="text-center text-xs text-slate-400">
          EchoLaw &copy; 2026 &middot; Esta análise é informativa e não substitui consultoria
          jurídica profissional.
        </p>
      </footer>
    </div>
  )
}
