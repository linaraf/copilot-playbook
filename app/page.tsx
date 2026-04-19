import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { placeholderChains } from '@/data/placeholder'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="py-16 text-center space-y-4">
        <Badge variant="flagged">Ingredient Transparency</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Know exactly what&apos;s in your food.
        </h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground">
          MenuTruth analyzes the full ingredient lists of every major fast food chain
          so you can make informed choices.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/chains">Browse Chains</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ingredients">Ingredient Encyclopedia</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Chains</h2>
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
      </section>
    </div>
  )
}
