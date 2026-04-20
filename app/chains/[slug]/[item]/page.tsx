import { IngredientComparison } from '@/components/ingredient-comparison'
import { placeholderChains } from '@/data/placeholder'
import type { Metadata } from 'next'
import type { ComparisonMenuItem } from '@/types'

interface Props {
  params: Promise<{ slug: string; item: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params
  const itemName  = item.replace(/-/g, ' ')
  const chainName = SAMPLE_ITEM.name === itemName ? SAMPLE_ITEM.name : itemName

  const usCount     = SAMPLE_ITEM.us_ingredients.length
  const ukCount     = SAMPLE_ITEM.uk_ingredients.length
  const bannedCount = SAMPLE_ITEM.us_ingredients.filter((i) =>
    SAMPLE_FLAGGED.some((f) => f.toLowerCase() === i.toLowerCase())
  ).length

  const ogUrl = `/api/og/preview?name=${encodeURIComponent(itemName)}&chain=${encodeURIComponent(slug)}&us=${usCount}&uk=${ukCount}&flagged=${bannedCount}&score=8`

  return {
    title: `${itemName} — ${slug}`,
    openGraph: {
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${itemName} ingredient comparison` }],
    },
    twitter: { card: 'summary_large_image' },
  }
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
