'use client'

import { usePathname } from 'next/navigation'

const links = [
  { href: '/analise/nova', label: 'Nova Análise' },
  { href: '/historico', label: 'Histórico' },
  { href: '/perfil', label: 'Perfil' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ href, label }) => {
        const active = pathname.startsWith(href)
        return (
          <a
            key={href}
            href={href}
            className={
              active
                ? 'px-3 py-1.5 text-sm font-semibold text-[#4a7c59] border-b-2 border-[#4a7c59]'
                : 'px-3 py-1.5 text-sm font-medium text-stone-500 hover:text-[#4a7c59] transition-colors'
            }
          >
            {label}
          </a>
        )
      })}
    </nav>
  )
}
