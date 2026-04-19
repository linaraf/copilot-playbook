import { createClient } from '@/lib/supabase/server'
import type { TrendingComparison, WorstOffenderChain, SiteStats } from '@/types'

// ─── Fallback data (used when Supabase is not yet configured) ────────────────

const FALLBACK_TRENDING: TrendingComparison[] = [
  { id: '1', itemName: 'McRib', itemSlug: 'mcrib', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 8, viewCount: 12400, usOnlyCount: 6, ukOnlyCount: 2 },
  { id: '2', itemName: 'Chicken McNuggets', itemSlug: 'chicken-mcnuggets', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 7, viewCount: 9800, usOnlyCount: 5, ukOnlyCount: 3 },
  { id: '3', itemName: 'Footlong Italian BMT', itemSlug: 'italian-bmt', chainName: 'Subway', chainSlug: 'subway', gapScore: 6, viewCount: 8100, usOnlyCount: 4, ukOnlyCount: 2 },
  { id: '4', itemName: 'Whopper', itemSlug: 'whopper', chainName: 'Burger King', chainSlug: 'burger-king', gapScore: 9, viewCount: 7600, usOnlyCount: 8, ukOnlyCount: 1 },
  { id: '5', itemName: 'Steak Burrito Bowl', itemSlug: 'steak-burrito-bowl', chainName: 'Chipotle', chainSlug: 'chipotle', gapScore: 2, viewCount: 6300, usOnlyCount: 1, ukOnlyCount: 0 },
  { id: '6', itemName: 'Original Crispy Sandwich', itemSlug: 'original-crispy-sandwich', chainName: 'KFC', chainSlug: 'kfc', gapScore: 7, viewCount: 5900, usOnlyCount: 6, ukOnlyCount: 3 },
]

const FALLBACK_WORST: WorstOffenderChain[] = [
  { id: '4', name: 'Burger King', slug: 'burger-king', avgGapScore: 8.4, flaggedIngredientCount: 31, itemCount: 89 },
  { id: '1', name: "McDonald's", slug: 'mcdonalds', avgGapScore: 7.6, flaggedIngredientCount: 28, itemCount: 120 },
  { id: '3', name: 'Subway', slug: 'subway', avgGapScore: 6.2, flaggedIngredientCount: 19, itemCount: 80 },
]

const FALLBACK_LATEST: TrendingComparison[] = [
  { id: '7', itemName: 'Spicy Deluxe Sandwich', itemSlug: 'spicy-deluxe-sandwich', chainName: "Chick-fil-A", chainSlug: 'chick-fil-a', gapScore: 5, viewCount: 210, usOnlyCount: 3, ukOnlyCount: 2 },
  { id: '8', itemName: 'Crispy Chicken BLT', itemSlug: 'crispy-chicken-blt', chainName: 'Wendy\'s', chainSlug: 'wendys', gapScore: 6, viewCount: 180, usOnlyCount: 4, ukOnlyCount: 2 },
  { id: '9', itemName: 'Sausage McMuffin', itemSlug: 'sausage-mcmuffin', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 7, viewCount: 155, usOnlyCount: 5, ukOnlyCount: 1 },
  { id: '10', itemName: 'Double Crunch Burger', itemSlug: 'double-crunch-burger', chainName: 'KFC', chainSlug: 'kfc', gapScore: 8, viewCount: 140, usOnlyCount: 6, ukOnlyCount: 2 },
  { id: '11', itemName: "Veggie Delite", itemSlug: 'veggie-delite', chainName: 'Subway', chainSlug: 'subway', gapScore: 3, viewCount: 120, usOnlyCount: 2, ukOnlyCount: 1 },
  { id: '12', itemName: 'Loaded Potato Skins', itemSlug: 'loaded-potato-skins', chainName: "TGI Friday's", chainSlug: 'tgi-fridays', gapScore: 9, viewCount: 98, usOnlyCount: 7, ukOnlyCount: 1 },
]

const FALLBACK_STATS: SiteStats = {
  itemCount: 1247,
  chainCount: 48,
  countryCount: 3,
}

// ─── Query functions ─────────────────────────────────────────────────────────

export async function getTrendingComparisons(): Promise<TrendingComparison[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, name, slug, gap_score, view_count, us_only_count, uk_only_count, chains!inner(name, slug)')
      .order('view_count', { ascending: false })
      .limit(6)

    if (error || !data?.length) return FALLBACK_TRENDING

    return data.map((row) => {
      const chain = row.chains as unknown as { name: string; slug: string }
      return {
        id: String(row.id),
        itemName: row.name as string,
        itemSlug: row.slug as string,
        chainName: chain.name,
        chainSlug: chain.slug,
        gapScore: row.gap_score as number,
        viewCount: row.view_count as number,
        usOnlyCount: (row.us_only_count as number | null) ?? undefined,
        ukOnlyCount: (row.uk_only_count as number | null) ?? undefined,
      }
    })
  } catch {
    return FALLBACK_TRENDING
  }
}

export async function getLatestComparisons(): Promise<TrendingComparison[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, name, slug, gap_score, view_count, us_only_count, uk_only_count, chains!inner(name, slug)')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error || !data?.length) return FALLBACK_LATEST

    return data.map((row) => {
      const chain = row.chains as unknown as { name: string; slug: string }
      return {
        id: String(row.id),
        itemName: row.name as string,
        itemSlug: row.slug as string,
        chainName: chain.name,
        chainSlug: chain.slug,
        gapScore: row.gap_score as number,
        viewCount: row.view_count as number,
        usOnlyCount: (row.us_only_count as number | null) ?? undefined,
        ukOnlyCount: (row.uk_only_count as number | null) ?? undefined,
      }
    })
  } catch {
    return FALLBACK_LATEST
  }
}

export async function getWorstOffenders(): Promise<WorstOffenderChain[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('chains')
      .select('id, name, slug, avg_gap_score, flagged_ingredient_count, item_count')
      .order('avg_gap_score', { ascending: false })
      .limit(3)

    if (error || !data?.length) return FALLBACK_WORST

    return data.map((row) => ({
      id: String(row.id),
      name: row.name as string,
      slug: row.slug as string,
      avgGapScore: row.avg_gap_score as number,
      flaggedIngredientCount: row.flagged_ingredient_count as number,
      itemCount: row.item_count as number,
    }))
  } catch {
    return FALLBACK_WORST
  }
}

export async function getSiteStats(): Promise<SiteStats> {
  try {
    const supabase = await createClient()
    const [items, chains] = await Promise.all([
      supabase.from('menu_items').select('*', { count: 'exact', head: true }),
      supabase.from('chains').select('*', { count: 'exact', head: true }),
    ])

    if (items.error || chains.error) return FALLBACK_STATS

    return {
      itemCount: items.count ?? FALLBACK_STATS.itemCount,
      chainCount: chains.count ?? FALLBACK_STATS.chainCount,
      countryCount: 3,
    }
  } catch {
    return FALLBACK_STATS
  }
}
