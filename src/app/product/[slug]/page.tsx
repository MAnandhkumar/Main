import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ChevronRight, ExternalLink, ShieldCheck, Truck } from 'lucide-react'
import { SafeImage } from '@/components/SafeImage'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    // First check if Supabase is configured; if not, use mock
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-project-url') {
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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    let product: any = null

    // Gracefully handle unconfigured Supabase for the demo
    if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url') {
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
            description: 'Experience pure sound with our top-rated noise-cancelling technology. These award-winning headphones deliver crisp, deep bass and crystal clear highs, ensuring an immersive auditory journey. Perfect for travel, home office, and daily commutes.',
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
            categories: { name: 'Electronics' },
            slug: slug,
        }
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link href="/categories" className="hover:text-foreground transition-colors">Products</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Image */}
                <div className="rounded-3xl overflow-hidden bg-card border border-white/5 aspect-square relative shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <SafeImage
                        src={product.image_url || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800&auto=format&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                            {product.categories?.name || 'Uncategorized'}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Verified Deal</p>
                                <p className="text-xs text-muted-foreground">Authentic product link</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Truck className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">External Shipping</p>
                                <p className="text-xs text-muted-foreground">Via affiliate partner</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href={`/go/${product.slug}`} className={buttonVariants({ size: "lg", className: "w-full text-lg h-14 rounded-2xl group relative overflow-hidden" })}>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Deal Now <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
                        </Link>
                        <p className="text-xs text-center text-muted-foreground">
                            You will be redirected to our trusted affiliate partner. Prices and availability may vary.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
