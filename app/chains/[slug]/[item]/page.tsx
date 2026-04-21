import { notFound } from 'next/navigation'
import { IngredientComparison } from '@/components/ingredient-comparison'
import { placeholderChains, getMenuItem, FLAGGED_INGREDIENTS } from '@/data/placeholder'
import type { Metadata } from 'next'
import type { ComparisonMenuItem } from '@/types'

interface Props {
  params: Promise<{ slug: string; item: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params
  const seed = getMenuItem(slug, item)
  const chain = placeholderChains.find((c) => c.slug === slug)
  const itemName = seed?.name ?? item.replace(/-/g, ' ')
  const chainName = chain?.name ?? seed?.chainName ?? slug

  const usCount     = seed?.us_ingredients.length ?? 13
  const ukCount     = seed?.uk_ingredients.length ?? 10
  const bannedCount = seed
    ? seed.us_ingredients.filter((i) =>
        FLAGGED_INGREDIENTS.some((f) => f.toLowerCase() === i.toLowerCase())
      ).length
    : 6
  const score = seed?.gap_score ?? 8

  const ogUrl = `/api/og/preview?name=${encodeURIComponent(itemName)}&chain=${encodeURIComponent(chainName)}&us=${usCount}&uk=${ukCount}&flagged=${bannedCount}&score=${score}`

  return {
    title: `${itemName} — ${chainName}`,
    openGraph: {
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${itemName} ingredient comparison` }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function MenuItemPage({ params }: Props) {
  const { slug, item } = await params
  const seed  = getMenuItem(slug, item)
  const chain = placeholderChains.find((c) => c.slug === slug)

  if (!seed && !chain) notFound()

  const comparisonItem: ComparisonMenuItem = seed
    ? {
        name: seed.name,
        slug: seed.slug,
        us_ingredients: seed.us_ingredients,
        uk_ingredients: seed.uk_ingredients,
        gap_score: seed.gap_score,
      }
    : {
        name: item.replace(/-/g, ' '),
        slug: item,
        us_ingredients: [],
        uk_ingredients: [],
      }

  const chainName = seed?.chainName ?? chain?.name ?? slug

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">
          {chainName}
        </p>
        <h1 className="text-3xl font-bold capitalize">
          {comparisonItem.name}
        </h1>
        {seed?.description && (
          <p className="text-muted-foreground mt-1 max-w-xl">{seed.description}</p>
        )}
        {seed?.calories_us && (
          <p className="text-xs text-muted-foreground mt-2">
            {seed.calories_us} kcal (US) · {seed.calories_uk ?? '—'} kcal (UK)
          </p>
        )}
      </div>

      <IngredientComparison
        item={comparisonItem}
        flagged_ingredients={FLAGGED_INGREDIENTS}
      />
    </div>
  )
}
