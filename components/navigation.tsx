import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const navLinks = [
  { href: '/chains', label: 'Chains' },
  { href: '/ingredients', label: 'Ingredients' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/newsletter', label: 'Newsletter' },
]

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Menu<span className="text-flagged">Truth</span>
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Separator />
    </header>
  )
}
