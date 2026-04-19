import { IngredientComparison } from '@/components/ingredient-comparison'
import { placeholderChains } from '@/data/placeholder'
import type { Metadata } from 'next'
import type { ComparisonMenuItem } from '@/types'

interface Props {
  params: Promise<{ slug: string; item: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params
  return { title: `${item.replace(/-/g, ' ')} — ${slug}` }
}

const SAMPLE_FLAGGED = [
  'High Fructose Corn Syrup',
  'Sodium Benzoate',
  'Sodium Nitrite',
  'Calcium Propionate',
  'TBHQ',
  'Dimethylpolysiloxane',
  'Azodicarbonamide',
  'Potassium Bromate',
  'Yellow 5',
  'Red 40',
]

const SAMPLE_ITEM: ComparisonMenuItem = {
  name: "McRib",
  slug: "mcrib",
  us_ingredients: [
    "Pork",
    "Water",
    "Salt",
    "Dextrose",
    "Sodium Phosphates",
    "High Fructose Corn Syrup",
    "Azodicarbonamide",
    "Calcium Propionate",
    "Dimethylpolysiloxane",
    "Sodium Benzoate",
    "Enriched Flour",
    "Soybean Oil",
    "TBHQ",
  ],
  uk_ingredients: [
    "Pork",
    "Water",
    "Salt",
    "Dextrose",
    "Sodium Phosphates",
    "Enriched Flour",
    "Sunflower Oil",
    "Rapeseed Oil",
    "Ascorbic Acid",
    "Yeast Extract",
  ],
}

export default async function MenuItemPage({ params }: Props) {
  const { slug, item } = await params
  const chain = placeholderChains.find((c) => c.slug === slug)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">
          {chain?.name ?? slug}
        </p>
        <h1 className="text-3xl font-bold capitalize">
          {item.replace(/-/g, ' ')}
        </h1>
      </div>

      <IngredientComparison item={SAMPLE_ITEM} flagged_ingredients={SAMPLE_FLAGGED} />
    </div>
  )
}
