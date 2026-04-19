import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { placeholderIngredients } from '@/data/placeholder'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ingredient = placeholderIngredients.find((i) => i.slug === slug)
  return { title: ingredient?.name ?? 'Ingredient Not Found' }
}

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ingredient = placeholderIngredients.find((i) => i.slug === slug)
  if (!ingredient) notFound()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{ingredient.name}</h1>
          <Badge variant={ingredient.status === 'flagged' ? 'flagged' : 'clean'}>
            {ingredient.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{ingredient.category}</p>
      </div>
      <Separator />
      <p>{ingredient.description}</p>
      {ingredient.aliases.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Also known as</h2>
          <div className="flex gap-2 flex-wrap">
            {ingredient.aliases.map((alias) => (
              <Badge key={alias} variant="secondary">{alias}</Badge>
            ))}
          </div>
        </div>
      )}
      {ingredient.usedInChains.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Found in</h2>
          <div className="flex gap-2 flex-wrap">
            {ingredient.usedInChains.map((chain) => (
              <Badge key={chain} variant="outline">{chain}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
