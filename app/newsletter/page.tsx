import { Separator } from '@/components/ui/separator'
import { NewsletterForm } from '@/components/newsletter-form'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Newsletter' }

export default function NewsletterPage() {
  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Newsletter</h1>
        <p className="text-muted-foreground mt-1">
          Weekly ingredient alerts and food transparency reports.
        </p>
      </div>
      <Separator />
      <NewsletterForm />
    </div>
  )
}
