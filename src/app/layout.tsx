import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Naskart - Premium Deals & Products',
  description:
    'The best curated deals, products, and affiliate offers all in one place.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background selection:bg-primary/30 flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          {/* <GoogleAnalytics gaId="G-XYZ12345" /> */}
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
