import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CountryStatus } from '@/types'

interface CountryStatusGridProps {
  statuses: {
    us: CountryStatus
    eu: CountryStatus
    uk: CountryStatus
    japan: CountryStatus
    canada: CountryStatus
    australia: CountryStatus
  }
}

const COUNTRIES = [
  { key: 'us' as const,        flag: '🇺🇸', name: 'United States' },
  { key: 'eu' as const,        flag: '🇪🇺', name: 'European Union' },
  { key: 'uk' as const,        flag: '🇬🇧', name: 'United Kingdom' },
  { key: 'japan' as const,     flag: '🇯🇵', name: 'Japan' },
  { key: 'canada' as const,    flag: '🇨🇦', name: 'Canada' },
  { key: 'australia' as const, flag: '🇦🇺', name: 'Australia' },
]

const STATUS_META: Record<
  CountryStatus,
  { label: string; badgeVariant: 'flagged' | 'caution' | 'clean' | 'secondary'; cardClass: string }
> = {
  banned:     { label: 'Banned',     badgeVariant: 'flagged',   cardClass: 'border-flagged bg-flagged/10' },
  restricted: { label: 'Restricted', badgeVariant: 'caution',   cardClass: 'border-caution bg-caution/10' },
  approved:   { label: 'Approved',   badgeVariant: 'clean',     cardClass: 'border-clean bg-clean/10' },
  unknown:    { label: 'Unknown',    badgeVariant: 'secondary', cardClass: 'border-border bg-card' },
}

export function CountryStatusGrid({ statuses }: CountryStatusGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {COUNTRIES.map(({ key, flag, name }) => {
        const status = statuses[key]
        const meta = STATUS_META[status]

        return (
          <div
            key={key}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg border p-4 text-center',
              meta.cardClass
            )}
          >
            <span className="text-3xl leading-none" role="img" aria-label={name}>
              {flag}
            </span>
            <span className="text-xs font-medium text-muted-foreground leading-tight">
              {name}
            </span>
            <Badge variant={meta.badgeVariant} className="text-xs uppercase tracking-wide">
              {meta.label}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}
