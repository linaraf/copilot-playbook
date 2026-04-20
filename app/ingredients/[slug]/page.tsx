import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CountryStatusGrid } from '@/components/country-status-grid'
import { ShareButtons } from '@/components/share-buttons'
import { getIngredientBySlug } from '@/lib/supabase/queries'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ingredient = await getIngredientBySlug(slug)
  if (!ingredient) return { title: 'Ingredient Not Found' }

  return {
    title: ingredient.name,
    description: ingredient.description,
    openGraph: { description: ingredient.healthConcerns.slice(0, 160) },
  }
}

const STATUS_BADGE: Record<string, 'flagged' | 'caution' | 'clean' | 'secondary'> = {
  flagged: 'flagged',
  caution: 'caution',
  clean:   'clean',
  unknown: 'secondary',
}

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ingredient = await getIngredientBySlug(slug)
  if (!ingredient) notFound()

  const badgeVariant = STATUS_BADGE[ingredient.status] ?? 'secondary'

  return (
    <div className="max-w-3xl space-y-10">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{ingredient.name}</h1>
          <Badge variant={badgeVariant} className="capitalize">
            {ingredient.status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{ingredient.category}</p>

        {ingredient.aliases.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-sm text-muted-foreground">Also known as:</span>
            {ingredient.aliases.map((alias) => (
              <Badge key={alias} variant="secondary" className="text-xs">
                {alias}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* ── What it does ───────────────────────────────────────────────── */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">What it does</h2>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {ingredient.function}
        </p>
        <p className="text-muted-foreground leading-relaxed">{ingredient.description}</p>
      </section>

      {/* ── Health concerns ────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Health Concerns</h2>
        <div className="rounded-lg border border-flagged/30 bg-flagged/5 p-4">
          <p className="leading-relaxed text-sm">{ingredient.healthConcerns}</p>
        </div>
      </section>

      {/* ── Global regulatory status ───────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Global Regulatory Status</h2>
        <CountryStatusGrid statuses={ingredient.countryStatus} />
      </section>

      {/* ── Menu items that contain this ingredient ────────────────────── */}
      {ingredient.menuAppearances.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">
            Found in {ingredient.menuAppearances.length} Menu{' '}
            {ingredient.menuAppearances.length === 1 ? 'Item' : 'Items'}
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ingredient.menuAppearances.map((item) => (
              <Link
                key={`${item.chainSlug}-${item.itemSlug}`}
                href={`/chains/${item.chainSlug}/${item.itemSlug}`}
                className="group"
              >
                <Card className="h-full transition-colors group-hover:border-muted-foreground">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.chainName}</p>
                        <CardTitle className="mt-0.5 text-sm">{item.itemName}</CardTitle>
                      </div>
                      {item.gapScore !== undefined && (
                        <Badge
                          variant={
                            item.gapScore >= 7 ? 'flagged' : item.gapScore >= 4 ? 'secondary' : 'clean'
                          }
                          className="shrink-0 tabular-nums"
                        >
                          {item.gapScore}/10
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-0">
                    <span className="text-xs text-muted-foreground">View comparison</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* ── Sources ────────────────────────────────────────────────────── */}
      {ingredient.sources && ingredient.sources.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Sources</h2>
          <ul className="space-y-2">
            {ingredient.sources.map((src) => (
              <li key={src}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  {src.replace(/^https?:\/\//, '')}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Share ──────────────────────────────────────────────────────── */}
      <section className="rounded-lg border border-border bg-card/50 p-5 space-y-3">
        <p className="font-semibold">Found this helpful? Share it.</p>
        <ShareButtons title={`${ingredient.name} — what it is, where it's banned, and which fast food chains use it`} />
      </section>
    </div>
  )
}
