import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { UpgradeButton } from '@/components/upgrade-button'
import { CancelButton } from '@/components/cancel-button'

const PLAN_LABELS: Record<string, string> = {
  free: 'Gratuito',
  essencial: 'Essencial',
  pro: 'Pro',
  b2b: 'B2B',
}

const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  essencial: Infinity,
  pro: Infinity,
  b2b: Infinity,
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, analyses_used')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan ?? 'free'
  const used = profile?.analyses_used ?? 0
  const limit = PLAN_LIMITS[plan] ?? 3
  const isPaid = plan !== 'free'
  const progressPct = limit === Infinity ? 0 : Math.min((used / limit) * 100, 100)

  return (
    <div>
      {/* Banner */}
      <div
        className="w-full h-48 relative overflow-hidden bg-[#f8e0a8] flex items-center justify-center"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(112,92,48,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <h1 className="text-4xl font-black text-on-surface relative z-10">
          Configurações de Perfil
        </h1>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-8 py-12">
        {/* Left — Account card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-8 space-y-6">
            <h2 className="text-xl font-black text-on-surface">Minha Conta</h2>

            {/* Avatar + email */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">person</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-on-surface-variant font-semibold">E-mail</p>
                <p className="text-sm font-bold text-on-surface truncate">{user.email}</p>
              </div>
            </div>

            {/* Plan badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant font-semibold">Plano atual</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isPaid
                    ? 'bg-primary text-on-primary'
                    : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                }`}
              >
                {PLAN_LABELS[plan] ?? plan}
              </span>
            </div>

            {/* Analyses used */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant font-semibold">Análises usadas</span>
                <span className="font-bold text-on-surface">
                  {used}
                  {limit === Infinity ? (
                    <span className="text-on-surface-variant font-normal ml-1">(ilimitado)</span>
                  ) : (
                    ` / ${limit}`
                  )}
                </span>
              </div>
              {limit !== Infinity && (
                <div className="bg-surface-container-highest h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-primary transition-all`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              )}
            </div>

            {isPaid && (
              <div className="pt-2">
                <CancelButton />
              </div>
            )}
          </div>
        </div>

        {/* Right — Upgrade section */}
        <div className="lg:col-span-7 space-y-6">
          {!isPaid && (
            <>
              <div>
                <h2 className="text-2xl font-black text-on-surface mb-1">Faça o Upgrade</h2>
                <p className="text-on-surface-variant text-sm">
                  Desbloqueie análises ilimitadas e recursos avançados.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Essencial */}
                <div className="bg-surface p-8 rounded-xl border border-outline-variant/50 space-y-6 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <p className="font-black text-xl text-on-surface">Essencial</p>
                    <p className="text-3xl font-black text-on-surface">
                      R$29
                      <span className="text-base font-normal text-on-surface-variant">/mês</span>
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Análises ilimitadas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Chat com documento
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Rascunho de resposta
                      </li>
                    </ul>
                  </div>
                  <UpgradeButton plan="essencial" label="Assinar Essencial" />
                </div>

                {/* Pro */}
                <div className="bg-surface p-8 rounded-xl border-2 border-primary shadow-xl space-y-6 flex flex-col relative">
                  <span className="absolute -top-3 left-6 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                  <div className="flex-1 space-y-4">
                    <p className="font-black text-xl text-on-surface">Pro</p>
                    <p className="text-3xl font-black text-on-surface">
                      R$49
                      <span className="text-base font-normal text-on-surface-variant">/mês</span>
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Tudo do Essencial
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Prioridade no processamento
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">
                          check_circle
                        </span>
                        Suporte prioritário
                      </li>
                    </ul>
                  </div>
                  <UpgradeButton plan="pro" label="Assinar Pro" />
                </div>
              </div>
            </>
          )}

          {isPaid && (
            <div className="bg-surface rounded-xl border border-outline-variant/50 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg text-on-primary">
                  <span className="material-symbols-outlined text-lg">workspace_premium</span>
                </div>
                <div>
                  <p className="font-black text-lg text-on-surface">Plano {PLAN_LABELS[plan] ?? plan}</p>
                  <p className="text-sm text-on-surface-variant">Você tem acesso a todos os recursos.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
