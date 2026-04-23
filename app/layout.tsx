import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { CartSidebar } from '@/components/layout/CartSidebar'
import { Footer } from '@/components/layout/Footer'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Mal\u0101 \u2014 Luxury Pakistani Fashion',
  description:
    'Discover Mal\u0101\u2019s curated collections of luxury lawn, formals, and ready-to-wear Pakistani fashion. Celebrating heritage craftsmanship with a modern, editorial aesthetic.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-brown font-body">
        <Providers>
          <AnnouncementBar />
          <Header />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
