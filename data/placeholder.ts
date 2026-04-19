import type { Chain, Ingredient, BlogPost } from '@/types'

export const placeholderChains: Chain[] = [
  {
    id: '1',
    name: "McDonald's",
    slug: 'mcdonalds',
    description: 'Global fast food chain known for burgers and fries.',
    itemCount: 120,
    flaggedIngredientCount: 14,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Chipotle',
    slug: 'chipotle',
    description: 'Fast casual Mexican chain with a "Food With Integrity" ethos.',
    itemCount: 45,
    flaggedIngredientCount: 2,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Subway',
    slug: 'subway',
    description: 'Sandwich chain with extensive customizable menu options.',
    itemCount: 80,
    flaggedIngredientCount: 9,
    createdAt: '2024-01-01',
  },
]

export const placeholderIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'High Fructose Corn Syrup',
    slug: 'high-fructose-corn-syrup',
    aliases: ['HFCS', 'corn syrup'],
    description: 'Highly processed sweetener linked to metabolic issues. Banned or restricted in several EU countries.',
    status: 'flagged',
    category: 'Sweeteners',
    usedInChains: ['mcdonalds', 'subway'],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Extra Virgin Olive Oil',
    slug: 'extra-virgin-olive-oil',
    aliases: ['EVOO', 'olive oil'],
    description: 'Minimally processed, high in beneficial monounsaturated fats. Widely approved.',
    status: 'clean',
    category: 'Oils & Fats',
    usedInChains: ['chipotle'],
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Sodium Benzoate',
    slug: 'sodium-benzoate',
    aliases: ['E211', 'benzoate of soda'],
    description: 'Preservative that may form benzene (a carcinogen) when combined with ascorbic acid.',
    status: 'flagged',
    category: 'Preservatives',
    usedInChains: ['mcdonalds', 'subway'],
    createdAt: '2024-01-01',
  },
]

export const placeholderBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Hidden Ingredients in Fast Food Buns',
    slug: 'hidden-ingredients-fast-food-buns',
    excerpt: 'What are the 20+ additives lurking in a standard fast food bun?',
    content: '',
    publishedAt: '2024-03-15',
    tags: ['fast food', 'bread', 'additives'],
    readingTimeMinutes: 5,
  },
  {
    id: '2',
    title: 'US vs EU: Why Your McDonald\'s Tastes Different Abroad',
    slug: 'us-vs-eu-mcdonalds-ingredients',
    excerpt: 'The same menu item can have a completely different ingredient list depending on which country you\'re in.',
    content: '',
    publishedAt: '2024-04-01',
    tags: ['comparison', 'regulations', 'McDonald\'s'],
    readingTimeMinutes: 8,
  },
]
