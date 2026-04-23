import type { Category, Product } from '@/types'

// Sanity integration: replace these with GROQ queries
// *[_type == "category"] and *[_type == "product"]

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'luxury-lawn',
    name: 'Luxury Lawn',
    description: 'Exquisitely crafted lawn suits for the discerning woman',
    imgVariant: 'warm-1',
  },
  {
    id: 'cat-2',
    slug: 'unstitched-summer',
    name: 'Unstitched Summer',
    description: 'Premium unstitched fabric collections for bespoke tailoring',
    imgVariant: 'warm-3',
  },
  {
    id: 'cat-3',
    slug: 'formals',
    name: 'Formals',
    description: 'Elegant formal wear for every special occasion',
    imgVariant: 'dark-1',
  },
  {
    id: 'cat-4',
    slug: 'ready-to-wear',
    name: 'Ready To Wear',
    description: 'Curated ready-to-wear ensembles for the modern woman',
    imgVariant: 'warm-5',
  },
]

export const products: Product[] = [
  // Luxury Lawn — 5 products
  {
    id: 'p-001',
    slug: 'embroidered-lawn-ell-9133',
    name: 'Embroidered Lawn ELL-9133',
    sku: 'ELL-9133',
    price: 7800,
    originalPrice: 9500,
    category: 'Luxury Lawn',
    categorySlug: 'luxury-lawn',
    description:
      'A masterpiece of Pakistani craftsmanship, this three-piece lawn suit features intricate machine embroidery on the shirt front, paired with a printed dupatta and plain trouser. Perfect for daytime gatherings and festive occasions.',
    fabric: 'Premium Lawn',
    pieces: 3,
    isNew: true,
    isFeatured: true,
    imgVariant: 'warm-1',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-002',
    slug: 'floral-printed-lawn-ell-9240',
    name: 'Floral Printed Lawn ELL-9240',
    sku: 'ELL-9240',
    price: 6200,
    category: 'Luxury Lawn',
    categorySlug: 'luxury-lawn',
    description:
      'Delicate floral motifs rendered in soft pastels on ultra-fine lawn fabric. This three-piece ensemble includes a digitally printed shirt, coordinated dupatta, and dyed trouser cloth.',
    fabric: 'Fine Lawn',
    pieces: 3,
    isFeatured: true,
    imgVariant: 'warm-2',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p-003',
    slug: 'hand-block-lawn-ell-9358',
    name: 'Hand Block Lawn ELL-9358',
    sku: 'ELL-9358',
    price: 8500,
    category: 'Luxury Lawn',
    categorySlug: 'luxury-lawn',
    description:
      'Traditional hand-block printing meets contemporary silhouettes in this stunning collection piece. Each print is unique, celebrating the heritage of Pakistani textile artisans.',
    fabric: 'Swiss Lawn',
    pieces: 3,
    isNew: true,
    imgVariant: 'warm-3',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-004',
    slug: 'gul-e-bahar-lawn-ell-9401',
    name: 'Gul-e-Bahar Lawn ELL-9401',
    sku: 'ELL-9401',
    price: 9200,
    originalPrice: 11000,
    category: 'Luxury Lawn',
    categorySlug: 'luxury-lawn',
    description:
      'Named after the spring bloom, this luxurious piece features a digitally printed shirt adorned with delicate floral embroidery on the neckline and sleeves, finished with a matching chiffon dupatta.',
    fabric: 'Lawn + Chiffon Dupatta',
    pieces: 3,
    isRestocked: true,
    isFeatured: true,
    imgVariant: 'warm-4',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-005',
    slug: 'summer-bloom-lawn-ell-9512',
    name: 'Summer Bloom Lawn ELL-9512',
    sku: 'ELL-9512',
    price: 7100,
    category: 'Luxury Lawn',
    categorySlug: 'luxury-lawn',
    description:
      'A fresh interpretation of classic lawn prints, this vibrant three-piece suit brings together bold geometric patterns and floral accents in a palette inspired by Lahore\'s Shalimar Gardens.',
    fabric: 'Premium Lawn',
    pieces: 3,
    imgVariant: 'warm-5',
    sizes: ['S', 'M', 'L', 'XL'],
  },

  // Unstitched Summer — 5 products
  {
    id: 'p-006',
    slug: 'zari-embroidered-unstitched-use-9133',
    name: 'Zari Embroidered Unstitched USE-9133',
    sku: 'USE-9133',
    price: 12500,
    category: 'Unstitched Summer',
    categorySlug: 'unstitched-summer',
    description:
      'Resplendent with zari thread embroidery on pure cotton voile, this unstitched collection piece offers unmatched versatility. The three-piece set includes shirt fabric, coordinating trouser, and a net dupatta with sequin border.',
    fabric: 'Cotton Voile + Net',
    pieces: 3,
    isNew: true,
    isFeatured: true,
    imgVariant: 'warm-6',
    sizes: ['Unstitched'],
  },
  {
    id: 'p-007',
    slug: 'khadi-print-unstitched-use-9267',
    name: 'Khadi Print Unstitched USE-9267',
    sku: 'USE-9267',
    price: 10800,
    category: 'Unstitched Summer',
    categorySlug: 'unstitched-summer',
    description:
      'A tribute to Pakistan\'s indigenous textile heritage, this khadi-inspired print on premium cotton fabric is both eco-conscious and elegant. Comes with printed trouser and plain dupatta fabric.',
    fabric: 'Khadi Cotton',
    pieces: 3,
    imgVariant: 'warm-7',
    sizes: ['Unstitched'],
  },
  {
    id: 'p-008',
    slug: 'chikankari-unstitched-use-9345',
    name: 'Chikankari Unstitched USE-9345',
    sku: 'USE-9345',
    price: 14200,
    originalPrice: 16500,
    category: 'Unstitched Summer',
    categorySlug: 'unstitched-summer',
    description:
      'The timeless art of Chikankari embroidery graces this exquisite unstitched suit. White-on-white embroidery on the finest cotton lawn creates a garment of understated sophistication.',
    fabric: 'Fine Cotton Lawn',
    pieces: 3,
    isRestocked: true,
    isFeatured: true,
    imgVariant: 'warm-8',
    sizes: ['Unstitched'],
  },
  {
    id: 'p-009',
    slug: 'chanderi-silk-unstitched-use-9489',
    name: 'Chanderi Silk Unstitched USE-9489',
    sku: 'USE-9489',
    price: 16800,
    category: 'Unstitched Summer',
    categorySlug: 'unstitched-summer',
    description:
      'Woven with silk-cotton blend threads in the tradition of South Asian textile arts, this Chanderi-inspired unstitched set offers a rare combination of breathability and luxury sheen.',
    fabric: 'Chanderi Silk Blend',
    pieces: 3,
    isNew: true,
    imgVariant: 'cool-1',
    sizes: ['Unstitched'],
  },
  {
    id: 'p-010',
    slug: 'sheer-organza-unstitched-use-9601',
    name: 'Sheer Organza Unstitched USE-9601',
    sku: 'USE-9601',
    price: 13600,
    category: 'Unstitched Summer',
    categorySlug: 'unstitched-summer',
    description:
      'Flowing organza fabric with delicate schiffli embroidery creates an ethereal summer ensemble. The included dupatta in matching organza adds a graceful finishing touch.',
    fabric: 'Organza + Schiffli',
    pieces: 3,
    imgVariant: 'cool-2',
    sizes: ['Unstitched'],
  },

  // Formals — 5 products
  {
    id: 'p-011',
    slug: 'kamdani-bridal-formal-fml-1122',
    name: 'Kamdani Bridal Formal FML-1122',
    sku: 'FML-1122',
    price: 18000,
    category: 'Formals',
    categorySlug: 'formals',
    description:
      'A statement piece for the most cherished occasions, this kamdani-embellished formal features dense threadwork and intricate mirror work on rich velvet. Comes with a matching dupatta and trouser.',
    fabric: 'Velvet + Net Dupatta',
    pieces: 3,
    isNew: true,
    isFeatured: true,
    imgVariant: 'dark-1',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-012',
    slug: 'resham-formal-gharara-fml-1258',
    name: 'Resham Formal Gharara FML-1258',
    sku: 'FML-1258',
    price: 15500,
    originalPrice: 18000,
    category: 'Formals',
    categorySlug: 'formals',
    description:
      'Reviving the grandeur of Mughal court fashion, this resham-embroidered gharara set is a masterwork of traditional craftsmanship. The flared trouser and fitted kameez create an iconic silhouette.',
    fabric: 'Raw Silk',
    pieces: 2,
    isFeatured: true,
    imgVariant: 'dark-2',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p-013',
    slug: 'gulkari-chiffon-formal-fml-1374',
    name: 'Gulkari Chiffon Formal FML-1374',
    sku: 'FML-1374',
    price: 13200,
    category: 'Formals',
    categorySlug: 'formals',
    description:
      'Gulkari — the art of flower embroidery — adorns this elegant chiffon formal in a cascade of blooms across the front panel and sleeves. Flowing and sophisticated.',
    fabric: 'Chiffon + Silk Lining',
    pieces: 3,
    isRestocked: true,
    imgVariant: 'dark-3',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-014',
    slug: 'angrakha-formal-silk-fml-1490',
    name: 'Angrakha Formal Silk FML-1490',
    sku: 'FML-1490',
    price: 16200,
    category: 'Formals',
    categorySlug: 'formals',
    description:
      'The Angrakha silhouette reimagined for the contemporary woman in the finest handloom silk. Intricate gota patti borders frame the crossover front, creating a regal, timeless look.',
    fabric: 'Pure Handloom Silk',
    pieces: 2,
    isNew: true,
    imgVariant: 'cool-3',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p-015',
    slug: 'noor-e-shab-formal-fml-1605',
    name: 'Noor-e-Shab Formal FML-1605',
    sku: 'FML-1605',
    price: 17500,
    originalPrice: 20000,
    category: 'Formals',
    categorySlug: 'formals',
    description:
      'Named for the light of night, this luminous formal ensemble features sequin and crystal embellishments on midnight-toned fabric. A celebration of Pakistani eveningwear at its finest.',
    fabric: 'Organza + Silk Base',
    pieces: 3,
    isFeatured: true,
    imgVariant: 'cool-4',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },

  // Ready To Wear — 5 products
  {
    id: 'p-016',
    slug: 'linen-co-ord-rtw-4411',
    name: 'Linen Co-Ord RTW-4411',
    sku: 'RTW-4411',
    price: 8900,
    category: 'Ready To Wear',
    categorySlug: 'ready-to-wear',
    description:
      'Effortlessly chic, this linen co-ordinate set pairs a relaxed kurta with wide-leg trousers. Minimal embroidery at the neckline adds a touch of refinement to the casual silhouette.',
    fabric: 'Premium Linen',
    pieces: 2,
    isNew: true,
    isFeatured: true,
    imgVariant: 'warm-5',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-017',
    slug: 'printed-pret-kurta-rtw-4523',
    name: 'Printed Pret Kurta RTW-4523',
    sku: 'RTW-4523',
    price: 5400,
    category: 'Ready To Wear',
    categorySlug: 'ready-to-wear',
    description:
      'A versatile everyday kurta in digital floral print on soft cotton. The A-line silhouette flatters all figures, while the subtle lurex threading catches the light beautifully.',
    fabric: 'Cotton Lawn',
    pieces: 1,
    imgVariant: 'warm-6',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'p-018',
    slug: 'fusion-pret-set-rtw-4678',
    name: 'Fusion Pret Set RTW-4678',
    sku: 'RTW-4678',
    price: 11200,
    originalPrice: 13500,
    category: 'Ready To Wear',
    categorySlug: 'ready-to-wear',
    description:
      'Where East meets West in perfect harmony, this fusion pret set offers a cropped kameez with wide-palazzo trousers. The block-print pattern in earth tones is a statement in itself.',
    fabric: 'Cotton Satin',
    pieces: 2,
    isRestocked: true,
    isFeatured: true,
    imgVariant: 'warm-7',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'p-019',
    slug: 'embellished-pret-top-rtw-4801',
    name: 'Embellished Pret Top RTW-4801',
    sku: 'RTW-4801',
    price: 6800,
    category: 'Ready To Wear',
    categorySlug: 'ready-to-wear',
    description:
      'A semi-formal pret top adorned with delicate pearl and crystal embellishments at the collar and cuffs. Perfect for transitioning from day to evening occasions.',
    fabric: 'Tissue + Silk Blend',
    pieces: 1,
    isNew: true,
    imgVariant: 'warm-8',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p-020',
    slug: 'classic-pret-suit-rtw-4934',
    name: 'Classic Pret Suit RTW-4934',
    sku: 'RTW-4934',
    price: 9600,
    category: 'Ready To Wear',
    categorySlug: 'ready-to-wear',
    description:
      'The quintessential ready-to-wear suit for the modern Pakistani woman. Tailored from fine cotton with contrast piping and hand-attached buttons — refined simplicity at its best.',
    fabric: 'Fine Cotton',
    pieces: 3,
    isFeatured: true,
    imgVariant: 'blush',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
]

// Helper functions
// Sanity integration: replace with GROQ query *[_type == "product" && slug.current == $slug][0]
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Sanity integration: replace with GROQ query *[_type == "product" && category->slug.current == $categorySlug]
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

// Sanity integration: replace with GROQ query *[_type == "product" && isFeatured == true][0...$limit]
export function getFeaturedProducts(limit = 5): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit)
}

// Sanity integration: replace with GROQ query *[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug][0...$limit]
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit)
}

// Sanity integration: replace with GROQ query *[_type == "product" && isNew == true][0...$limit]
export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit)
}
