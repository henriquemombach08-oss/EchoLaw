import { RightItem } from '@/types'

const config = {
  alert: {
    icon: 'report',
    className: 'bg-error-container text-on-error-container border-l-8 border-error',
  },
  right: {
    icon: 'gavel',
    className: 'bg-primary-fixed text-on-primary-fixed-variant border-l-8 border-primary',
  },
  info: {
    icon: 'info',
    className: 'bg-secondary-container text-on-secondary-container border-l-8 border-secondary',
  },
}

export function RightsList({ rights }: { rights: RightItem[] }) {
  return (
    <ul className="space-y-4">
      {rights.map((item, i) => (
        <li
          key={i}
          className={`p-6 rounded-xl flex gap-4 ${config[item.type].className}`}
        >
          <span className="material-symbols-outlined text-3xl flex-shrink-0">
            {config[item.type].icon}
          </span>
          <div>
            <h4 className="font-bold text-lg mb-1 capitalize">{item.type}</h4>
            <p className="text-sm opacity-90">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
