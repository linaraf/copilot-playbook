import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { placeholderIngredients } from '@/data/placeholder'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ingredient Encyclopedia' }

export default function IngredientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ingredient Encyclopedia</h1>
        <p className="text-muted-foreground mt-1">Every additive, preservative, and ingredient decoded.</p>
      </div>
      <Input placeholder="Search ingredients..." className="max-w-sm" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderIngredients.map((ing) => (
          <Link key={ing.id} href={`/ingredients/${ing.slug}`}>
            <Card className="hover:border-muted-foreground transition-colors h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{ing.name}</span>
                  <Badge variant={ing.status === 'flagged' ? 'flagged' : 'clean'}>
                    {ing.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{ing.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
