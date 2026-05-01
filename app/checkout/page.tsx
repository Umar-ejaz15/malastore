import { getSiteSettings } from '@/lib/data'
import { CheckoutClient } from './CheckoutClient'

export default async function CheckoutPage() {
  const settings = await getSiteSettings()
  return <CheckoutClient settings={settings} />
}
