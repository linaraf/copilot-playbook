import Link from 'next/link'
import { Flame, TrendingDown, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SearchBar } from '@/components/search-bar'
import { ComparisonCard } from '@/components/comparison-card'
import { NewsletterForm } from '@/components/newsletter-form'
import {
  getTrendingComparisons,
  getWorstOffenders,
  getLatestComparisons,
  getSiteStats,
} from '@/lib/supabase/queries'

export default async function HomePage() {
  const [trending, worstOffenders, latest, stats] = await Promise.all([
    getTrendingComparisons(),
    getWorstOffenders(),
    getLatestComparisons(),
    getSiteStats(),
  ])

  return (
    <div className="space-y-16">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-16 text-center space-y-6">
        <Badge variant="flagged" className="text-xs uppercase tracking-widest">
          US vs EU Ingredient Analysis
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          What&apos;s{' '}
          <span className="text-flagged">REALLY</span>{' '}
          in your<br className="hidden sm:block" /> drive-through order?
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          We compare fast food ingredients in the US vs what the same chains
          serve in Europe. The differences will shock you.
        </p>

        <SearchBar />

        <p className="text-xs text-muted-foreground">
          Try &ldquo;McDonald&apos;s McRib&rdquo; or &ldquo;Subway Italian BMT&rdquo;
        </p>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div className="-mx-4 border-y border-border bg-card/40 px-4 py-5">
        <dl className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          <div>
            <dt className="text-3xl font-bold tabular-nums">
              {stats.itemCount.toLocaleString()}
            </dt>
            <dd className="mt-0.5 text-sm text-muted-foreground">items compared</dd>
          </div>
          <div className="hidden self-center text-border sm:block" aria-hidden>·</div>
          <div>
            <dt className="text-3xl font-bold tabular-nums">{stats.chainCount}</dt>
            <dd className="mt-0.5 text-sm text-muted-foreground">chains analyzed</dd>
          </div>
          <div className="hidden self-center text-border sm:block" aria-hidden>·</div>
          <div>
            <dt className="text-3xl font-bold tabular-nums">{stats.countryCount}</dt>
            <dd className="mt-0.5 text-sm text-muted-foreground">countries</dd>
          </div>
        </dl>
      </div>

      {/* ── Trending Comparisons ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-flagged" />
          <h2 className="text-xl font-bold">Trending Comparisons</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            Most viewed
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((item) => (
            <ComparisonCard
              key={item.id}
              chainName={item.chainName}
              chainSlug={item.chainSlug}
              itemName={item.itemName}
              itemSlug={item.itemSlug}
              gapScore={item.gapScore}
              usOnlyCount={item.usOnlyCount}
              ukOnlyCount={item.ukOnlyCount}
            />
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Worst Offenders + Latest ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Worst Offenders */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-flagged" />
            <h2 className="text-xl font-bold">Worst Offenders</h2>
          </div>

          <ol className="space-y-3">
            {worstOffenders.map((chain, i) => (
              <li key={chain.id}>
                <Link href={`/chains/${chain.slug}`} className="group block">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors group-hover:border-muted-foreground">
                    <span className="text-2xl font-extrabold tabular-nums text-muted-foreground/40 w-7 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{chain.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {chain.flaggedIngredientCount} flagged ingredients ·{' '}
                        {chain.itemCount} items
                      </p>
                    </div>
                    <Badge variant="flagged" className="shrink-0 tabular-nums">
                      {chain.avgGapScore.toFixed(1)}/10
                    </Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/chains">View all chains →</Link>
          </Button>
        </section>

        {/* Latest Comparisons */}
        <section className="space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">Latest Comparisons</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {latest.map((item) => (
              <ComparisonCard
                key={item.id}
                chainName={item.chainName}
                chainSlug={item.chainSlug}
                itemName={item.itemName}
                itemSlug={item.itemSlug}
                gapScore={item.gapScore}
                usOnlyCount={item.usOnlyCount}
                ukOnlyCount={item.ukOnlyCount}
              />
            ))}
          </div>
        </section>
      </div>

      <Separator />

      {/* ── Email CTA ────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border bg-card/50 px-6 py-12 text-center space-y-4">
        <Badge variant="secondary" className="text-xs uppercase tracking-widest">
          Free newsletter
        </Badge>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Get weekly ingredient exposés — free.
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We surface the most egregious US vs EU formula differences every week.
          No spam, unsubscribe any time.
        </p>
        <div className="flex justify-center">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
