import type { Chain, Ingredient, BlogPost, IngredientDetail } from '@/types'

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
    aliases: ['HFCS', 'corn syrup', 'isoglucose', 'glucose-fructose syrup'],
    description: 'Highly processed sweetener linked to metabolic issues. Rarely used in EU/UK due to import quotas keeping corn cheaper in the US.',
    status: 'flagged',
    category: 'Sweeteners',
    usedInChains: ['mcdonalds', 'subway'],
    sources: [
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2991323/',
      'https://www.healthline.com/nutrition/high-fructose-corn-syrup-vs-sugar',
    ],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Extra Virgin Olive Oil',
    slug: 'extra-virgin-olive-oil',
    aliases: ['EVOO', 'olive oil'],
    description: 'Minimally processed oil high in monounsaturated fats and polyphenols. Universally approved and associated with cardiovascular health benefits.',
    status: 'clean',
    category: 'Oils & Fats',
    usedInChains: ['chipotle'],
    sources: ['https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4030221/'],
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Sodium Benzoate',
    slug: 'sodium-benzoate',
    aliases: ['E211', 'benzoate of soda'],
    description: 'Preservative that can form benzene — a known carcinogen — when combined with Vitamin C. Restricted in several countries.',
    status: 'flagged',
    category: 'Preservatives',
    usedInChains: ['mcdonalds', 'subway'],
    sources: ['https://www.fda.gov/food/food-additives-petitions/sodium-benzoate'],
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    name: 'Azodicarbonamide',
    slug: 'azodicarbonamide',
    aliases: ['ADA', 'E927a', 'flour bleaching agent'],
    description: 'Dough conditioner used to strengthen bread in the US. Banned in the EU, UK, and Australia. Also used to manufacture yoga mats.',
    status: 'flagged',
    category: 'Dough Conditioners',
    usedInChains: ['mcdonalds', 'subway'],
    sources: [
      'https://www.ewg.org/research/you-are-what-you-eat',
      'https://www.fda.gov/food/food-additives-petitions/azodicarbonamide-ada',
    ],
    createdAt: '2024-01-01',
  },
]

// ─── Rich detail records (keyed by slug) ────────────────────────────────────

export const placeholderIngredientDetails: Record<string, IngredientDetail> = {
  'high-fructose-corn-syrup': {
    id: '1',
    name: 'High Fructose Corn Syrup',
    slug: 'high-fructose-corn-syrup',
    aliases: ['HFCS', 'corn syrup', 'isoglucose', 'glucose-fructose syrup'],
    description: 'Highly processed sweetener derived from corn starch. Widely used in US fast food due to low cost; rarely used in EU/UK.',
    status: 'flagged',
    category: 'Sweeteners',
    usedInChains: ['mcdonalds', 'subway'],
    function: 'Sweetener & Preservative',
    healthConcerns:
      'Unlike regular sugar, HFCS is metabolized almost entirely by the liver, which can convert the excess fructose to fat. Studies link regular HFCS consumption to insulin resistance, non-alcoholic fatty liver disease, obesity, and increased LDL cholesterol. It also appears to bypass normal satiety signals, making it easier to overconsume.',
    countryStatus: {
      us: 'approved',
      eu: 'restricted',
      uk: 'restricted',
      japan: 'approved',
      canada: 'approved',
      australia: 'approved',
    },
    menuAppearances: [
      { itemName: 'McRib', itemSlug: 'mcrib', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 8 },
      { itemName: 'Chicken McNuggets', itemSlug: 'chicken-mcnuggets', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 7 },
      { itemName: 'Footlong Italian BMT', itemSlug: 'italian-bmt', chainName: 'Subway', chainSlug: 'subway', gapScore: 6 },
    ],
    sources: [
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2991323/',
      'https://www.healthline.com/nutrition/high-fructose-corn-syrup-vs-sugar',
      'https://www.bmj.com/content/346/bmj.e8077',
    ],
    createdAt: '2024-01-01',
  },

  'azodicarbonamide': {
    id: '4',
    name: 'Azodicarbonamide',
    slug: 'azodicarbonamide',
    aliases: ['ADA', 'E927a', 'flour bleaching agent', 'dough conditioner'],
    description: 'A synthetic chemical used in the US to condition bread dough, reduce mixing time, and improve texture. Banned across the EU, UK, and Australia.',
    status: 'flagged',
    category: 'Dough Conditioners',
    usedInChains: ['mcdonalds', 'subway'],
    function: 'Dough Conditioner & Flour Bleaching Agent',
    healthConcerns:
      'When baked, azodicarbonamide breaks down into semicarbazide and urethane, both of which are potential carcinogens. The WHO flagged it as a respiratory sensitizer that can cause asthma with occupational exposure. The EU banned it in 1997 citing concerns about its breakdown products. It gained public attention when it was found in Subway bread, leading to widespread reformulations — but the US FDA still considers it "generally recognized as safe" at low levels.',
    countryStatus: {
      us: 'approved',
      eu: 'banned',
      uk: 'banned',
      japan: 'banned',
      canada: 'restricted',
      australia: 'banned',
    },
    menuAppearances: [
      { itemName: 'McRib', itemSlug: 'mcrib', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 8 },
      { itemName: 'Footlong Italian BMT', itemSlug: 'italian-bmt', chainName: 'Subway', chainSlug: 'subway', gapScore: 6 },
      { itemName: 'Sausage McMuffin', itemSlug: 'sausage-mcmuffin', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 7 },
    ],
    sources: [
      'https://www.ewg.org/research/you-are-what-you-eat',
      'https://www.fda.gov/food/food-additives-petitions/azodicarbonamide-ada',
      'https://ec.europa.eu/food/food/chemicalsafety/additives_en',
    ],
    createdAt: '2024-01-01',
  },

  'sodium-benzoate': {
    id: '3',
    name: 'Sodium Benzoate',
    slug: 'sodium-benzoate',
    aliases: ['E211', 'benzoate of soda', 'benzoic acid sodium salt'],
    description: 'Common preservative used to prevent mold and bacteria growth in acidic foods. Concerns arise when it combines with Vitamin C in the same product.',
    status: 'flagged',
    category: 'Preservatives',
    usedInChains: ['mcdonalds', 'subway'],
    function: 'Antimicrobial Preservative',
    healthConcerns:
      'Sodium benzoate is generally safe on its own, but when combined with ascorbic acid (Vitamin C) in the same product, it can form benzene — a Group 1 carcinogen. Studies have also linked it to hyperactivity in children. The EU requires a warning label ("may have an adverse effect on activity and attention in children") on any product containing it alongside certain artificial dyes.',
    countryStatus: {
      us: 'approved',
      eu: 'restricted',
      uk: 'restricted',
      japan: 'approved',
      canada: 'approved',
      australia: 'approved',
    },
    menuAppearances: [
      { itemName: 'McRib', itemSlug: 'mcrib', chainName: "McDonald's", chainSlug: 'mcdonalds', gapScore: 8 },
      { itemName: 'Footlong Italian BMT', itemSlug: 'italian-bmt', chainName: 'Subway', chainSlug: 'subway', gapScore: 6 },
    ],
    sources: [
      'https://www.fda.gov/food/food-additives-petitions/sodium-benzoate',
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2507891/',
      'https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2016.4433',
    ],
    createdAt: '2024-01-01',
  },

  'extra-virgin-olive-oil': {
    id: '2',
    name: 'Extra Virgin Olive Oil',
    slug: 'extra-virgin-olive-oil',
    aliases: ['EVOO', 'olive oil'],
    description: 'Cold-pressed oil from whole olives, retaining natural antioxidants and polyphenols. The least processed of all olive oil grades.',
    status: 'clean',
    category: 'Oils & Fats',
    usedInChains: ['chipotle'],
    function: 'Cooking Medium & Flavor Enhancer',
    healthConcerns:
      'Extra virgin olive oil has no known health concerns at typical dietary amounts. It is rich in oleocanthal (a natural anti-inflammatory), oleic acid (heart-healthy monounsaturated fat), and antioxidant polyphenols. The Mediterranean diet, which is heavy in olive oil, is consistently associated with reduced cardiovascular disease, lower rates of type 2 diabetes, and longer lifespan in large population studies.',
    countryStatus: {
      us: 'approved',
      eu: 'approved',
      uk: 'approved',
      japan: 'approved',
      canada: 'approved',
      australia: 'approved',
    },
    menuAppearances: [
      { itemName: 'Steak Burrito Bowl', itemSlug: 'steak-burrito-bowl', chainName: 'Chipotle', chainSlug: 'chipotle', gapScore: 2 },
    ],
    sources: [
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4030221/',
      'https://www.nejm.org/doi/full/10.1056/NEJMoa1200303',
    ],
    createdAt: '2024-01-01',
  },
}

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
    title: "US vs EU: Why Your McDonald's Tastes Different Abroad",
    slug: 'us-vs-eu-mcdonalds-ingredients',
    excerpt: "The same menu item can have a completely different ingredient list depending on which country you're in.",
    content: '',
    publishedAt: '2024-04-01',
    tags: ['comparison', 'regulations', "McDonald's"],
    readingTimeMinutes: 8,
  },
]
