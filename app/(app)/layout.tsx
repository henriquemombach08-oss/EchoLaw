import { DisclaimerBanner } from '@/components/disclaimer-banner'
import { NavLinks } from '@/components/nav-links'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/logout-button'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col">
      <DisclaimerBanner />
      <header className="bg-[#faf6f0] border-t-4 border-[#705c30] border-b border-stone-200 shadow-[0_4px_20px_rgba(46,50,48,0.06)] sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <div className="flex items-center gap-8">
            <a href="/analise/nova" className="text-2xl font-black text-[#4a7c59] tracking-tighter">
              EchoLaw
            </a>
            {user && <NavLinks />}
          </div>
          <div className="flex items-center">
            {user && <LogoutButton />}
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-stone-100 border-t border-stone-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3 text-sm text-stone-500">
          <p className="font-semibold text-[#4a7c59]">EchoLaw</p>
          <p>&copy; {new Date().getFullYear()} EchoLaw. Todos os direitos reservados.</p>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:text-[#4a7c59] transition-colors">Termos</a>
            <a href="#" className="hover:text-[#4a7c59] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#4a7c59] transition-colors">Contato</a>
            <a href="#" className="hover:text-[#4a7c59] transition-colors">Sobre</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
