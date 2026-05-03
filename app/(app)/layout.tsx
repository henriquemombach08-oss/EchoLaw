import { DisclaimerBanner } from '@/components/disclaimer-banner'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/logout-button'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col">
      <DisclaimerBanner />
      <header className="border-b bg-white px-4 py-3 flex items-center justify-between">
        <a href="/analise/nova" className="font-bold text-gray-900">EchoLaw</a>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {user && (
            <>
              <a href="/historico" className="hover:text-gray-900">Histórico</a>
              <a href="/perfil" className="hover:text-gray-900">Perfil</a>
              <LogoutButton />
            </>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
