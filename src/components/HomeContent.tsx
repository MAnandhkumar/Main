'use client'

import { useLanguage } from '@/components/Providers'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { SafeImage } from '@/components/SafeImage'
import { useState, useCallback, useEffect } from 'react'

const dummyCategories = [
  {
    name: 'Gaming',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Sport Equip',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Kitchen',
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Robot Cleaner',
    image:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Mobiles',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Office',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Cameras',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Computers',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Televisions',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Audios',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
  },
]

const dummyDeals = [
  {
    id: '1',
    name: 'MacBook Pro M3',
    price: '₹1,59,900',
    originalPrice: '₹1,69,900',
    discount: '6%',
    rating: 4.8,
    reviews: 124,
    image:
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop',
    stock: 85,
    store: 'Amazon',
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: '₹1,29,900',
    originalPrice: '₹1,34,900',
    discount: '4%',
    rating: 4.9,
    reviews: 256,
    image:
      'https://images.unsplash.com/photo-1591337676887-a217a6970c8a?q=80&w=600&auto=format&fit=crop',
    stock: 42,
    store: 'Apple',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: '₹24,990',
    originalPrice: '₹29,990',
    discount: '17%',
    rating: 4.7,
    reviews: 89,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    stock: 12,
    store: 'Sony',
  },
  {
    id: '4',
    name: 'iPad Air 5th Gen',
    price: '₹54,900',
    originalPrice: '₹59,900',
    discount: '8%',
    rating: 4.8,
    reviews: 112,
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    stock: 67,
    store: 'Amazon',
  },
  {
    id: '5',
    name: 'Logitech MX Master 3S',
    price: '₹9,495',
    originalPrice: '₹10,995',
    discount: '14%',
    rating: 4.9,
    reviews: 432,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop',
    stock: 92,
    store: 'Logitech',
  },
  {
    id: '6',
    name: 'Samsung 32" Odyssey G7',
    price: '₹48,500',
    originalPrice: '₹55,000',
    discount: '12%',
    rating: 4.7,
    reviews: 76,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop',
    stock: 34,
    store: 'Samsung',
  },
]

const brands = [
  {
    name: 'Apple',
    desc: 'Design that defines a generation',
    image:
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=800&auto=format&fit=crop',
    color: 'bg-white/5',
  },
  {
    name: 'Nike',
    desc: 'Performance meets lifestyle',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    color: 'bg-red-500/10',
  },
  {
    name: 'Sony',
    desc: 'Innovation for your senses',
    image:
      'https://images.unsplash.com/photo-1526170375885-cfdc79feefe9?q=80&w=800&auto=format&fit=crop',
    color: 'bg-blue-500/10',
  },
]

export interface Product {
  id: string
  name: string
  description: string
  image_url: string
  slug: string
  categories?: { name: string }
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  image_url: string
  link_url?: string
  button_text?: string
}

interface HomeContentProps {
  featuredProducts: Product[]
  banners?: Banner[]
}

const dummyBanners: Banner[] = [
  {
    id: 'd1',
    title: 'Electronics Summer Spectacular',
    subtitle: 'Up to 40% OFF on Top Tech',
    image_url:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Explore Deals',
  },
  {
    id: 'd2',
    title: 'Streetwear Revivals',
    subtitle: 'Fresh Styles for the Modern Move',
    image_url:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Shop Fashion',
  },
  {
    id: 'd3',
    title: 'Ultimate Gaming Setup',
    subtitle: 'Everything You Need for Victory',
    image_url:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Level Up',
  },
  {
    id: 'd4',
    title: 'Modern Living Essentials',
    subtitle: 'Clean Designs for a Brighter Home',
    image_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    button_text: 'View Collection',
  },
]

export function HomeContent({
  featuredProducts,
  banners = [],
}: HomeContentProps) {
  useLanguage()
  const [activeTab, setActiveTab] = useState('trending')
  const [currentBanner, setCurrentBanner] = useState(0)

  // Combine DB banners with dummy banners for density
  const allBanners = banners.length > 0 ? banners : dummyBanners

  // Carousel logic
  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % allBanners.length)
  }, [allBanners.length])

  const prevBanner = useCallback(() => {
    setCurrentBanner(
      (prev) => (prev - 1 + allBanners.length) % allBanners.length
    )
  }, [allBanners.length])

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000)
    return () => clearInterval(timer)
  }, [nextBanner])

  // Extend local dummy data for visual density
  const displayProducts =
    featuredProducts.length > 3
      ? featuredProducts
      : [...featuredProducts, ...featuredProducts, ...featuredProducts].slice(
          0,
          6
        )

  return (
    <div className="bg-background min-h-screen w-full">
      {/* 0. Carousel Banner Section */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900 md:h-[500px]">
        <AnimatePresence mode="wait">
          {allBanners.map(
            (banner, idx) =>
              idx === currentBanner && (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={banner.image_url}
                    className="h-full w-full object-cover opacity-60"
                    alt={banner.title}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent px-6 md:px-20">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="max-w-2xl"
                    >
                      <span className="bg-primary text-primary-foreground mb-4 inline-block rounded px-3 py-1 text-xs font-black tracking-widest uppercase">
                        Summer Deals 2026
                      </span>
                      <h1 className="font-heading mb-6 text-4xl leading-[1.1] font-black tracking-tighter text-white drop-shadow-2xl md:text-7xl">
                        {banner.title}
                      </h1>
                      <p className="mb-8 max-w-lg text-lg font-medium text-slate-200 drop-shadow-md md:text-xl">
                        {banner.subtitle}
                      </p>
                      <Link
                        href={banner.link_url || '#'}
                        className={cn(
                          buttonVariants({ variant: 'brand', size: 'lg' }),
                          'shadow-accent/20 shadow-premium transform rounded-full px-10 text-lg font-black transition-all hover:scale-105 active:scale-95'
                        )}
                      >
                        {banner.button_text || 'Shop Now'}{' '}
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={prevBanner}
          className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
          aria-label="Next Banner"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {allBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              aria-label={`Go to banner ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                idx === currentBanner
                  ? 'bg-primary w-8'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>
      </section>
      {/* 2. Popular Categories */}
      <motion.section
        className="border-border/50 mx-auto max-w-7xl border-t px-6 py-20 lg:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight">
              Popular Categories
            </h2>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm font-bold transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="no-scrollbar group/scroll flex items-start justify-between gap-4 overflow-x-auto pb-6">
            {dummyCategories.map((cat, i) => (
              <Link
                key={i}
                href="#"
                className="group flex min-w-[90px] shrink-0 flex-col items-center gap-3"
              >
                <div className="dark:group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-premium relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-slate-100 p-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white dark:bg-slate-800/80">
                  <div className="from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-accent/10 absolute inset-0 bg-linear-to-br transition-all duration-500" />
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    className="relative z-10 h-full w-full object-contain drop-shadow-md filter transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="group-hover:text-primary text-center text-[10px] font-black tracking-widest uppercase transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 1. Hero Section (Animated) */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-20 lg:px-12"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="grid h-auto grid-cols-1 gap-4 md:grid-cols-4 lg:h-[480px] lg:grid-cols-12">
          {/* Main Hero Slider Area */}
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900 md:col-span-4 lg:col-span-8">
            <SafeImage
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              alt="Hero"
            />
            {/* Slide Contents */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
              <div className="bg-accent text-accent-foreground shadow-accent/20 mb-4 w-fit rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase shadow-sm">
                Victory Deals
              </div>
              <h1 className="font-heading mb-4 text-4xl leading-none font-black tracking-tight drop-shadow-md md:text-6xl">
                Best Tech Deals Today
              </h1>
              <p className="mb-8 max-w-md text-lg text-white/90">
                We track victory-grade prices across major stores for you.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="brand"
                  className="h-12 w-fit rounded-full px-8 text-xs font-black tracking-widest uppercase transition-all"
                >
                  Explore All Deals
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-fit rounded-full border-white/20 px-8 text-xs font-black tracking-widest text-white uppercase backdrop-blur-sm hover:bg-white/10"
                >
                  Best Prices
                </Button>
              </div>
            </div>
            {/* Slider Navigation */}
            <div className="absolute right-6 bottom-6 flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-4">
            <div className="bg-victory-maroon group relative flex-1 overflow-hidden rounded-2xl p-8 text-white">
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-black">
                  Editor&apos;s Choice
                </h3>
                <p className="mb-6 text-sm text-white/80">
                  Top tech under ₹10,000
                </p>
                <Button
                  variant="brand"
                  className="shadow-accent/10 h-9 rounded-full px-6 text-[10px] font-black uppercase shadow-lg"
                >
                  View List
                </Button>
              </div>
              <SafeImage
                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=400&auto=format&fit=crop"
                className="absolute top-0 right-0 h-full object-cover opacity-30 transition-transform group-hover:scale-105"
                alt="Editor's Choice"
              />
            </div>
            <div className="group relative flex flex-1 flex-col justify-center gap-4 overflow-hidden rounded-2xl bg-slate-100 p-8 dark:bg-slate-800">
              <div className="relative z-10">
                <div className="text-primary mb-1 text-[10px] font-black tracking-widest uppercase">
                  Weekly Price Drop
                </div>
                <h3 className="text-2xl font-black">Up to 60% OFF</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  On best-selling accessories
                </p>
                <Link
                  href="#"
                  className="text-primary group flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
                >
                  View Deals{' '}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Best Value Deals (Modernized) */}
      <motion.section
        className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-900/50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Abstract Background Gradients */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-20">
          <div className="bg-primary/20 absolute -top-[20%] -left-[10%] h-[50%] w-[50%] animate-pulse rounded-full blur-[120px]" />
          <div className="bg-accent/20 absolute -right-[10%] -bottom-[20%] h-[50%] w-[50%] animate-pulse rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="flex flex-col gap-2">
              <div className="bg-accent/20 text-accent-foreground border-accent/20 flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                <Zap className="fill-accent h-3 w-3" /> Flash Promotions
              </div>
              <h2 className="font-heading text-primary text-4xl font-black tracking-tighter">
                Best Value Deals
              </h2>
              <p className="text-muted-foreground max-w-md text-sm">
                Our algorithm hunts the web for the deep discounts so you
                don&apos;t have to.
              </p>
            </div>
            <Link
              href="#"
              className="group text-primary hover:text-primary/80 border-border/50 flex items-center gap-2 rounded-xl border bg-white px-6 py-3 text-[10px] font-black tracking-widest uppercase shadow-sm transition-all hover:translate-x-1 dark:bg-slate-800"
            >
              Explore All Deals{' '}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dummyDeals.map((deal) => (
              <div
                key={deal.id}
                className="group bg-card border-border/50 hover:shadow-premium relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:-translate-y-2"
              >
                <div className="bg-muted group-hover:bg-primary/5 relative aspect-square overflow-hidden transition-colors">
                  <SafeImage
                    src={deal.image}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={deal.name}
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black text-white shadow-lg">
                    -{deal.discount}
                  </div>
                  <button className="hover:bg-primary absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:text-white active:scale-90">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                <div className="to-primary/[0.02] flex flex-1 flex-col bg-linear-to-b from-transparent p-6">
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3.5 w-3.5',
                          i < 4
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-300 text-slate-300'
                        )}
                      />
                    ))}
                    <span className="text-muted-foreground ml-2 text-[10px] font-black">
                      ({deal.reviews} Reviews)
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-tight font-black tracking-tight transition-colors">
                    {deal.name}
                  </h3>
                  <div className="mb-6 flex items-baseline gap-3">
                    <span className="text-primary text-2xl font-black">
                      {deal.price}
                    </span>
                    <span className="text-muted-foreground text-xs line-through opacity-70">
                      {deal.originalPrice}
                    </span>
                  </div>
                  <div className="border-border/50 mt-auto flex items-center justify-between border-t pt-4">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[9px] font-black tracking-widest uppercase">
                        Available at
                      </span>
                      <span className="text-foreground text-[11px] font-black">
                        {deal.store}
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="bg-victory-gold text-primary shadow-accent/20 group-hover:bg-victory-gold-hover rounded-xl p-2.5 shadow-lg transition-all hover:scale-110 hover:rotate-3 active:scale-95"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Tabbed Best Sellers Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="border-border mb-8 flex flex-col items-center justify-between gap-6 border-b pb-4 md:flex-row">
          <div>
            <h2 className="text-primary text-2xl font-black tracking-tight">
              Hand-Picked Selections
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Our editors manually check these links for accuracy.
            </p>
          </div>
          <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
            {['trending', 'top-rated', 'new-arrival'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-md px-6 py-2 text-[10px] font-black tracking-widest uppercase transition-all',
                  activeTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-card/50'
                )}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-ecommerce">
          {displayProducts.map((product, i) => (
            <Link
              key={i}
              href={`/product/${product.slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="bg-muted group-hover:shadow-premium relative aspect-square overflow-hidden rounded-2xl shadow-sm transition-all duration-500">
                <SafeImage
                  src={
                    product.image_url ||
                    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop'
                  }
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
              <div>
                <h4 className="group-hover:text-primary line-clamp-2 text-xs leading-tight font-bold transition-colors">
                  {product.name}
                </h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-primary text-sm font-black">
                    ₹{(product.name.length * 1000 + 5999).toLocaleString()}
                  </span>
                  <div className="group-hover:bg-victory-gold group-hover:text-primary flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 shadow-sm transition-all dark:bg-slate-800">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Brand Showcase */}
      <section className="bg-primary/5 border-border/50 border-y py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-primary mb-8 text-2xl font-black tracking-tighter uppercase">
            Official Victory Partners
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {brands.map((brand, i) => (
              <div
                key={i}
                className={cn(
                  'group hover:shadow-premium relative flex min-h-[350px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-10 transition-all duration-500 hover:-translate-y-2',
                  brand.color
                )}
              >
                <SafeImage
                  src={brand.image}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
                  alt={brand.name}
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="relative z-10">
                  <h3 className="mb-1 text-3xl font-black">{brand.name}</h3>
                  <p className="mb-6 text-sm text-white/60">{brand.desc}</p>
                  <Button
                    variant="brand"
                    className="shadow-accent/10 h-10 rounded-full px-8 text-xs font-black tracking-widest uppercase shadow-lg"
                  >
                    Check Brand Deals
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter / CTA (High Impact) */}
      <motion.section
        className="bg-victory-maroon relative w-full overflow-hidden py-16 text-center text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-heading mb-4 text-3xl font-black tracking-tight tracking-tighter md:text-5xl">
            Deal Hunter? You&apos;re in luck.
          </h2>
          <p className="mb-10 text-lg text-white/70">
            We find the best affiliate deals so you don&apos;t waste time
            searching.
          </p>
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-1.5 backdrop-blur-md sm:flex-row">
            <input
              type="text"
              placeholder="Search deals..."
              className="h-12 flex-1 bg-transparent px-6 text-base outline-none placeholder:text-white/50"
            />
            <Button
              variant="brand"
              className="h-12 w-full rounded-xl px-10 text-xs font-black tracking-widest uppercase sm:w-fit"
            >
              Find Deals
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
