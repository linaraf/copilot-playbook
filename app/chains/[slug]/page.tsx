import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { placeholderChains } from '@/data/placeholder'
import { notFound } from 'next/navigation'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{chain.name}</h1>
        <p className="text-muted-foreground mt-1">{chain.description}</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">{chain.itemCount} menu items</Badge>
        <Badge variant="flagged">{chain.flaggedIngredientCount} flagged ingredients</Badge>
      </div>
      <Separator />
      <p className="text-muted-foreground">
        Menu items will be listed here. Connect Supabase to populate real data.
      </p>
    </div>
  )
}
