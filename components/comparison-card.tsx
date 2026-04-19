import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ComparisonCardProps {
  chainName: string
  chainSlug: string
  itemName: string
  itemSlug: string
  gapScore: number
  usOnlyCount?: number
  ukOnlyCount?: number
  className?: string
}

function gapVariant(score: number): 'flagged' | 'secondary' | 'clean' {
  if (score >= 7) return 'flagged'
  if (score >= 4) return 'secondary'
  return 'clean'
}

export function ComparisonCard({
  chainName,
  chainSlug,
  itemName,
  itemSlug,
  gapScore,
  usOnlyCount,
  ukOnlyCount,
  className,
}: ComparisonCardProps) {
  return (
    <Link href={`/chains/${chainSlug}/${itemSlug}`} className="group block h-full">
      <Card
        className={cn(
          'h-full transition-colors group-hover:border-muted-foreground',
          className
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{chainName}</p>
              <CardTitle className="mt-0.5 text-base leading-tight">{itemName}</CardTitle>
            </div>
            <Badge variant={gapVariant(gapScore)} className="shrink-0 tabular-nums">
              {gapScore}/10
            </Badge>
          </div>
        </CardHeader>

        {(usOnlyCount !== undefined || ukOnlyCount !== undefined) && (
          <CardContent className="flex items-center justify-between pt-0">
            <div className="flex gap-3 text-xs">
              {usOnlyCount !== undefined && (
                <span>
                  <span className="font-medium text-flagged">{usOnlyCount}</span>
                  <span className="text-muted-foreground"> US-only</span>
                </span>
              )}
              {ukOnlyCount !== undefined && (
                <span>
                  <span className="font-medium text-clean">{ukOnlyCount}</span>
                  <span className="text-muted-foreground"> UK-only</span>
                </span>
              )}
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
