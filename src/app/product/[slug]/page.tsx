import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ChevronRight, ExternalLink, ShieldCheck, Truck } from 'lucide-react'
import { SafeImage } from '@/components/SafeImage'
import { type Product } from '@/components/HomeContent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // First check if Supabase is configured; if not, use mock
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-project-url'
  ) {
    return { title: 'Product Detail - Naskart' }
  }

  if (!supabase) return { title: 'Not Found' }

  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!product) return { title: 'Not Found' }

  return {
    title: `${product.name} - Naskart Deals`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  let product: Product | null = null

  // Gracefully handle unconfigured Supabase for the demo
  if (
    supabase &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
  ) {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('slug', slug)
      .single()
    product = data
  }

  // Mock data fallback if Supabase is not ready or product not found
  if (!product) {
    product = {
      id: 'mock-1',
      name: 'Premium Noise-Cancelling Headphones',
      description:
        'Experience pure sound with our top-rated noise-cancelling technology. These award-winning headphones deliver crisp, deep bass and crystal clear highs, ensuring an immersive auditory journey. Perfect for travel, home office, and daily commutes.',
      image_url:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      categories: { name: 'Electronics' },
      slug: slug,
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      {/* Breadcrumbs */}
      <nav className="text-muted-foreground mb-8 flex items-center text-sm">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link
          href="/categories"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-foreground max-w-[200px] truncate font-medium">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Product Image */}
        <div className="bg-card relative aspect-square overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
          <SafeImage
            src={
              product.image_url ||
              'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800&auto=format&fit=crop'
            }
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              {product.categories?.name || 'Uncategorized'}
            </span>
            <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-3">
                <ShieldCheck className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Verified Deal</p>
                <p className="text-muted-foreground text-xs">
                  Authentic product link
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-3">
                <Truck className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">External Shipping</p>
                <p className="text-muted-foreground text-xs">
                  Via affiliate partner
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href={`/go/${product.slug}`}
              className={buttonVariants({
                size: 'lg',
                className:
                  'group relative h-14 w-full overflow-hidden rounded-2xl text-lg',
              })}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Deal Now{' '}
                <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 z-0 translate-y-[100%] bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-[0%]" />
            </Link>
            <p className="text-muted-foreground text-center text-xs">
              You will be redirected to our trusted affiliate partner. Prices
              and availability may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
