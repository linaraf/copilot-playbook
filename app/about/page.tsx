import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About MenuTruth' }

export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">About MenuTruth</h1>
      <Separator />
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          MenuTruth was built because fast food chains make it nearly impossible to
          understand what&apos;s actually in your food. Hidden additives, misleading
          names, and ingredient lists that require a chemistry degree to parse.
        </p>
        <p>
          We aggregate and analyze the full ingredient lists of every major fast food
          chain, flag problematic additives, and surface clean alternatives — all in
          one place. We also compare US formulas against EU/UK versions, where
          regulations often require cleaner ingredients.
        </p>
        <p>
          Built with transparency and public health in mind. No sponsored content.
          No affiliate deals.
        </p>
      </div>
    </div>
  )
}
