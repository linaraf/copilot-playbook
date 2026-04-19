import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { placeholderBlogPosts } from '@/data/placeholder'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = placeholderBlogPosts.find((p) => p.slug === slug)
  return { title: post?.title ?? 'Article Not Found' }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = placeholderBlogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <article className="max-w-2xl space-y-6">
      <div>
        <div className="flex gap-1 mb-3 flex-wrap">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-muted-foreground mt-2">{post.publishedAt} · {post.readingTimeMinutes} min read</p>
      </div>
      <Separator />
      <p className="text-muted-foreground">
        {post.content || 'Full article content will be loaded from Supabase.'}
      </p>
    </article>
  )
}
