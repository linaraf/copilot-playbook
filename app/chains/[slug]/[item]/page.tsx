import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string; item: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params
  return { title: `${item.replace(/-/g, ' ')} — ${slug}` }
}

export default async function MenuItemPage({ params }: Props) {
  const { slug, item } = await params

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">{slug}</p>
        <h1 className="text-3xl font-bold capitalize">{item.replace(/-/g, ' ')}</h1>
      </div>
      <div className="flex gap-2">
        <Badge variant="flagged">US Formula</Badge>
        <Badge variant="clean">EU/UK Formula</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>US</TableHead>
            <TableHead>EU / UK</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground" colSpan={4}>
              Ingredient data will appear here once connected to Supabase.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
