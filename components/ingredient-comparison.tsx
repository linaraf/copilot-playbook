'use client'

import { useState } from 'react'
import { AlertTriangle, Minus, Share2, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface ComparisonMenuItem {
  name: string
  slug?: string
  us_ingredients: string[]
  uk_ingredients: string[]
  gap_score?: number
}

interface Props {
  item: ComparisonMenuItem
  flagged_ingredients: string[]
}

function computeGapScore(us: string[], uk: string[]): number {
  const usSet = new Set(us.map((i) => i.toLowerCase()))
  const ukSet = new Set(uk.map((i) => i.toLowerCase()))
  const total = Math.max(usSet.size, ukSet.size, 1)
  const diff =
    [...usSet].filter((i) => !ukSet.has(i)).length +
    [...ukSet].filter((i) => !usSet.has(i)).length
  return Math.min(10, Math.max(1, Math.round((diff / total) * 10)))
}

function IngredientRow({
  name,
  flagged,
  badge,
}: {
  name: string
  flagged: boolean
  badge?: 'us-only' | 'uk-only'
}) {
  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        flagged
          ? 'bg-flagged/10 text-flagged'
          : badge
            ? 'text-foreground'
            : 'text-muted-foreground'
      )}
    >
      {flagged ? (
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-flagged" />
      ) : (
        <Minus className="h-3.5 w-3.5 shrink-0 opacity-30" />
      )}
      <span className="flex-1 leading-snug">{name}</span>
      {badge === 'us-only' && (
        <Badge variant="flagged" className="text-xs shrink-0">
          US Only
        </Badge>
      )}
      {badge === 'uk-only' && (
        <Badge variant="clean" className="text-xs shrink-0">
          UK Only
        </Badge>
      )}
    </li>
  )
}

export function IngredientComparison({ item, flagged_ingredients }: Props) {
  const [copied, setCopied] = useState(false)

  const usSet = new Set(item.us_ingredients.map((i) => i.toLowerCase()))
  const ukSet = new Set(item.uk_ingredients.map((i) => i.toLowerCase()))

  const gapScore = item.gap_score ?? computeGapScore(item.us_ingredients, item.uk_ingredients)

  const gapVariant =
    gapScore >= 7 ? 'flagged' : gapScore >= 4 ? 'secondary' : 'clean'

  const usOnlyCount = item.us_ingredients.filter(
    (i) => !ukSet.has(i.toLowerCase())
  ).length
  const ukOnlyCount = item.uk_ingredients.filter(
    (i) => !usSet.has(i.toLowerCase())
  ).length
  const sharedCount = item.us_ingredients.filter((i) =>
    ukSet.has(i.toLowerCase())
  ).length

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-semibold">Ingredient Comparison</h2>
          <Badge variant={gapVariant}>Gap Score: {gapScore}/10</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={handleShare}>
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share This Comparison
            </>
          )}
        </Button>
      </div>

      <Separator />

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* US column */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Badge variant="flagged">US</Badge>
              <span className="text-muted-foreground font-normal text-sm">
                {item.us_ingredients.length} ingredients
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-0.5">
              {item.us_ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient}
                  name={ingredient}
                  flagged={flagged_ingredients.some(
                    (f) => f.toLowerCase() === ingredient.toLowerCase()
                  )}
                  badge={
                    !ukSet.has(ingredient.toLowerCase()) ? 'us-only' : undefined
                  }
                />
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* UK column */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Badge variant="clean">UK</Badge>
              <span className="text-muted-foreground font-normal text-sm">
                {item.uk_ingredients.length} ingredients
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-0.5">
              {item.uk_ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient}
                  name={ingredient}
                  flagged={flagged_ingredients.some(
                    (f) => f.toLowerCase() === ingredient.toLowerCase()
                  )}
                  badge={
                    !usSet.has(ingredient.toLowerCase()) ? 'uk-only' : undefined
                  }
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Summary stats */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span>
          <span className="font-medium text-flagged">{usOnlyCount}</span> US-only
        </span>
        <span>·</span>
        <span>
          <span className="font-medium text-clean">{ukOnlyCount}</span> UK-only
        </span>
        <span>·</span>
        <span>
          <span className="font-medium text-foreground">{sharedCount}</span> shared
        </span>
      </div>
    </div>
  )
}
