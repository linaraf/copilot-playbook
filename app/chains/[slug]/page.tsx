import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComparisonCard } from '@/components/comparison-card'
import {
  placeholderChains,
  getMenuItemsByChain,
  computeUsOnlyCount,
  computeUkOnlyCount,
} from '@/data/placeholder'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chain = placeholderChains.find((c) => c.slug === slug)
  return { title: chain?.name ?? 'Chain Not Found' }
}

export default async function ChainPage({ params }: Props) {
  const { slug } = await params
  const chain = placeholderChains.find((c) => c.slug === slug)
  if (!chain) notFound()

  const items = getMenuItemsByChain(slug)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{chain.name}</h1>
        <p className="text-muted-foreground">{chain.description}</p>
        <div className="flex gap-2">
          <Badge variant="secondary">{chain.itemCount} menu items</Badge>
          <Badge variant="flagged">{chain.flaggedIngredientCount} flagged ingredients</Badge>
        </div>
      </div>

      <Separator />

      {/* Menu items grid */}
      {items.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Comparisons{' '}
            <span className="text-muted-foreground font-normal text-base">
              ({items.length} items)
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ComparisonCard
                key={item.id}
                chainName={chain.name}
                chainSlug={slug}
                itemName={item.name}
                itemSlug={item.slug}
                gapScore={item.gap_score}
                usOnlyCount={computeUsOnlyCount(item)}
                ukOnlyCount={computeUkOnlyCount(item)}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-muted-foreground">
          No items yet — connect Supabase to load real menu data.
        </p>
      )}
    </div>
  )
}
