export interface Chain {
  id: string
  name: string
  slug: string
  description: string
  logoUrl?: string
  itemCount: number
  flaggedIngredientCount: number
  createdAt: string
}

export interface MenuItem {
  id: string
  chainId: string
  name: string
  slug: string
  description: string
  ingredients: string[]
  flaggedIngredients: string[]
  cleanIngredients: string[]
  calories?: number
  imageUrl?: string
  createdAt: string
}

export interface Ingredient {
  id: string
  name: string
  slug: string
  aliases: string[]
  description: string
  status: 'clean' | 'flagged' | 'caution' | 'unknown'
  category: string
  usedInChains: string[]
  sources?: string[]
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  tags: string[]
  readingTimeMinutes: number
}

export interface NewsletterSignup {
  email: string
  subscribedAt: string
}
