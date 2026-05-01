import { getAllProducts, getCategories } from '@/lib/data'
import { ShopClient } from './ShopClient'

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()])
  return <ShopClient products={products} categories={categories} />
}
