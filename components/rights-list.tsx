import { Badge } from '@/components/ui/badge'
import { RightItem } from '@/types'

const config = {
  alert: { label: 'Alerta', className: 'bg-red-50 border border-red-200 text-red-800' },
  right: { label: 'Direito', className: 'bg-green-50 border border-green-200 text-green-800' },
  info: { label: 'Info', className: 'bg-blue-50 border border-blue-200 text-blue-800' },
}

export function RightsList({ rights }: { rights: RightItem[] }) {
  return (
    <ul className="space-y-3">
      {rights.map((item, i) => (
        <li key={i} className={`rounded-lg p-3 text-sm ${config[item.type].className}`}>
          <Badge variant="outline" className="mr-2 text-xs">
            {config[item.type].label}
          </Badge>
          {item.text}
        </li>
      ))}
    </ul>
  )
}
