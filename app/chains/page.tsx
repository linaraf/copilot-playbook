import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { placeholderChains } from '@/data/placeholder'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Browse Chains' }

export default function ChainsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Chains</h1>
        <p className="text-muted-foreground mt-1">Browse ingredient transparency scores for every major fast food chain.</p>
      </div>
      <Input placeholder="Search chains..." className="max-w-sm" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderChains.map((chain) => (
          <Link key={chain.id} href={`/chains/${chain.slug}`}>
            <Card className="hover:border-muted-foreground transition-colors h-full">
              <CardHeader>
                <CardTitle>{chain.name}</CardTitle>
                <CardDescription>{chain.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Badge variant="secondary">{chain.itemCount} items</Badge>
                <Badge variant="flagged">{chain.flaggedIngredientCount} flagged</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
