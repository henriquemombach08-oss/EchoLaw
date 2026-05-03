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
  const { data: { user } } = await supabase.auth.getUser()
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

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">E-mail</span>
          <span className="text-sm font-medium text-gray-900">{user.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Plano</span>
          <span className={`text-sm font-semibold ${isPaid ? 'text-blue-600' : 'text-gray-700'}`}>
            {PLAN_LABELS[plan] ?? plan}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Análises usadas</span>
            <span className="font-medium text-gray-900">
              {used}{limit === Infinity ? '' : ` / ${limit}`}
              {limit === Infinity && <span className="text-gray-400 ml-1">(ilimitado)</span>}
            </span>
          </div>
          {limit !== Infinity && (
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${used >= limit ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min((used / limit) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {!isPaid && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-800">Fazer upgrade</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
              <div>
                <p className="font-semibold text-gray-900">Essencial</p>
                <p className="text-2xl font-bold mt-1">R$29<span className="text-sm font-normal text-gray-500">/mês</span></p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>✓ Análises ilimitadas</li>
                  <li>✓ Chat com documento</li>
                  <li>✓ Rascunho de resposta</li>
                </ul>
              </div>
              <UpgradeButton plan="essencial" label="Assinar Essencial" />
            </div>
            <div className="rounded-xl border-2 border-blue-500 bg-white p-5 space-y-4 relative">
              <span className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Popular</span>
              <div>
                <p className="font-semibold text-gray-900">Pro</p>
                <p className="text-2xl font-bold mt-1">R$49<span className="text-sm font-normal text-gray-500">/mês</span></p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>✓ Tudo do Essencial</li>
                  <li>✓ Prioridade no processamento</li>
                  <li>✓ Suporte prioritário</li>
                </ul>
              </div>
              <UpgradeButton plan="pro" label="Assinar Pro" />
            </div>
          </div>
        </div>
      )}

      {isPaid && <CancelButton />}
    </div>
  )
}
