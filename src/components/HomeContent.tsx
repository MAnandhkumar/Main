'use client'

import { useLanguage } from '@/components/Providers'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  Star,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { SafeImage } from '@/components/SafeImage'
import { useState, useCallback, useEffect } from 'react'

const dummyCategories = [
  { name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Sport Equip', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop' },
  { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop' },
  { name: 'Robot Cleaner', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=200&auto=format&fit=crop' },
  { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop' },
  { name: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
  { name: 'Computers', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop' },
  { name: 'Televisions', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop' },
  { name: 'Audios', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop' },
]

const dummyDeals = [
  { id: '1', name: 'MacBook Pro M3', price: '₹1,59,900', originalPrice: '₹1,69,900', discount: '6%', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop', stock: 85, store: 'Amazon' },
  { id: '2', name: 'iPhone 15 Pro', price: '₹1,29,900', originalPrice: '₹1,34,900', discount: '4%', rating: 4.9, reviews: 256, image: 'https://images.unsplash.com/photo-1591337676887-a217a6970c8a?q=80&w=600&auto=format&fit=crop', stock: 42, store: 'Apple' },
  { id: '3', name: 'Sony WH-1000XM5', price: '₹24,990', originalPrice: '₹29,990', discount: '17%', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop', stock: 12, store: 'Sony' },
  { id: '4', name: 'iPad Air 5th Gen', price: '₹54,900', originalPrice: '₹59,900', discount: '8%', rating: 4.8, reviews: 112, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop', stock: 67, store: 'Amazon' },
  { id: '5', name: 'Logitech MX Master 3S', price: '₹9,495', originalPrice: '₹10,995', discount: '14%', rating: 4.9, reviews: 432, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', stock: 92, store: 'Logitech' },
  { id: '6', name: 'Samsung 32" Odyssey G7', price: '₹48,500', originalPrice: '₹55,000', discount: '12%', rating: 4.7, reviews: 76, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', stock: 34, store: 'Samsung' },
]

const brands = [
  { name: 'Apple', desc: 'Design that defines a generation', image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=800&auto=format&fit=crop', color: 'bg-white/5' },
  { name: 'Nike', desc: 'Performance meets lifestyle', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', color: 'bg-red-500/10' },
  { name: 'Sony', desc: 'Innovation for your senses', image: 'https://images.unsplash.com/photo-1526170375885-cfdc79feefe9?q=80&w=800&auto=format&fit=crop', color: 'bg-blue-500/10' },
]

interface Product {
  id: string
  name: string
  description: string
  image_url: string
  slug: string
  categories?: { name: string }
}

interface Banner {
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
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Explore Deals'
  },
  {
    id: 'd2',
    title: 'Streetwear Revivals',
    subtitle: 'Fresh Styles for the Modern Move',
    image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Shop Fashion'
  },
  {
    id: 'd3',
    title: 'Ultimate Gaming Setup',
    subtitle: 'Everything You Need for Victory',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    button_text: 'Level Up'
  },
  {
    id: 'd4',
    title: 'Modern Living Essentials',
    subtitle: 'Clean Designs for a Brighter Home',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    button_text: 'View Collection'
  }
]

export function HomeContent({ featuredProducts, banners = [] }: HomeContentProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('trending')
  const [currentBanner, setCurrentBanner] = useState(0)

  // Combine DB banners with dummy banners for density
  const allBanners = banners.length > 0 ? banners : dummyBanners

  // Carousel logic
  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % allBanners.length)
  }, [allBanners.length])

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + allBanners.length) % allBanners.length)
  }, [allBanners.length])

  useEffect(() => {
    const timer = setInterval(nextBanner, 5000)
    return () => clearInterval(timer)
  }, [nextBanner])

  // Extend local dummy data for visual density
  const displayProducts = featuredProducts.length > 3
    ? featuredProducts
    : [...featuredProducts, ...featuredProducts, ...featuredProducts].slice(0, 6)

  return (
    <div className="w-full bg-background min-h-screen">
      {/* 0. Carousel Banner Section */}
      <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          {allBanners.map((banner, idx) => idx === currentBanner && (
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
                className="w-full h-full object-cover opacity-60"
                alt={banner.title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-center px-4 md:px-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <span className="inline-block px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest mb-4">Summer Deals 2026</span>
                  <h1 className="text-4xl md:text-7xl font-heading font-black text-white leading-[1.1] mb-6 drop-shadow-2xl tracking-tighter">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-200 mb-8 font-medium max-w-lg drop-shadow-md">{banner.subtitle}</p>
                  <Link
                    href={banner.link_url || "#"}
                    className={cn(buttonVariants({ variant: 'brand', size: 'lg' }), "px-10 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20")}
                  >
                    {banner.button_text || 'Shop Now'} <ArrowRight className="ml-2 w-6 h-6" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all active:scale-90"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {allBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                idx === currentBanner ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </section>
      {/* 2. Popular Categories */}
      <motion.section
        className="max-w-7xl mx-auto px-4 py-12 border-t border-border/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">Popular Categories</h2>
            <Link href="#" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">View All</Link>
          </div>

          <div className="flex items-start justify-between gap-4 overflow-x-auto no-scrollbar pb-6 group/scroll">
            {dummyCategories.map((cat, i) => (
              <Link key={i} href="#" className="flex flex-col items-center gap-3 group shrink-0 min-w-[90px]">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center p-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl group-hover:bg-white dark:group-hover:bg-primary/20 border border-transparent group-hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain filter drop-shadow-md transition-all duration-500 group-hover:scale-110 relative z-10"
                  />
                </div>
                <span className="text-[10px] font-black tracking-widest text-center uppercase group-hover:text-primary transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 1. Hero Section (Animated) */}
      <motion.section
        className="max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 h-auto lg:h-[480px]">
          {/* Main Hero Slider Area */}
          <div className="md:col-span-4 lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-900 group">
            <SafeImage
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              alt="Hero"
            />
            {/* Slide Contents */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-4 shadow-sm shadow-accent/20">Victory Deals</div>
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-4 leading-none drop-shadow-md">Best Tech Deals Today</h1>
              <p className="text-lg text-white/90 max-w-md mb-8">We track victory-grade prices across major stores for you.</p>
              <div className="flex gap-4">
                <Button variant="brand" className="w-fit rounded-full px-8 h-12 font-black uppercase text-xs tracking-widest transition-all">
                  Explore All Deals
                </Button>
                <Button variant="outline" className="w-fit rounded-full px-8 h-12 border-white/20 text-white hover:bg-white/10 font-black uppercase text-xs tracking-widest backdrop-blur-sm">
                  Best Prices
                </Button>
              </div>
            </div>
            {/* Slider Navigation */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Side Banners */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col gap-4">
            <div className="flex-1 rounded-2xl bg-victory-maroon p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2">Editor's Choice</h3>
                <p className="text-sm text-white/80 mb-6">Top tech under ₹10,000</p>
                <Button variant="brand" className="h-9 px-6 rounded-full text-[10px] font-black uppercase shadow-lg shadow-accent/10">View List</Button>
              </div>
              <SafeImage src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=400&auto=format&fit=crop" className="absolute top-0 right-0 h-full object-cover opacity-30 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800 p-8 flex flex-col justify-center gap-4 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Weekly Price Drop</div>
                <h3 className="text-2xl font-black">Up to 60% OFF</h3>
                <p className="text-sm text-muted-foreground mb-4">On best-selling accessories</p>
                <Link href="#" className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest group">
                  View Deals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Best Value Deals (Modernized) */}
      <motion.section
        className="bg-slate-50 dark:bg-slate-900/50 py-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border border-accent/20">
                <Zap className="w-3 h-3 fill-accent" /> Flash Promotions
              </div>
              <h2 className="text-4xl font-heading font-black tracking-tighter text-primary">Best Value Deals</h2>
              <p className="text-muted-foreground text-sm max-w-md">Our algorithm hunts the web for the deep discounts so you don't have to.</p>
            </div>
            <Link href="#" className="group flex items-center gap-2 text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-sm border border-border/50 transition-all hover:translate-x-1">
              Explore All Deals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyDeals.map((deal) => (
              <div key={deal.id} className="group bg-card rounded-2xl overflow-hidden shadow-ecommerce hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border/50 flex flex-col relative">
                <div className="aspect-square relative overflow-hidden bg-muted group-hover:bg-primary/5 transition-colors">
                  <SafeImage src={deal.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={deal.name} />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">-{deal.discount}</div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-white hover:bg-primary transition-all shadow-md active:scale-90">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-1 bg-linear-to-b from-transparent to-primary/[0.02]">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-300 fill-slate-300")} />
                    ))}
                    <span className="text-[10px] font-black text-muted-foreground ml-2">({deal.reviews} Reviews)</span>
                  </div>
                  <h3 className="font-black text-base mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2 tracking-tight">{deal.name}</h3>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-black text-primary">{deal.price}</span>
                    <span className="text-xs text-muted-foreground line-through opacity-70">{deal.originalPrice}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Available at</span>
                      <span className="text-[11px] font-black text-foreground">{deal.store || 'Amazon'}</span>
                    </div>
                    <Link href="#" className="bg-victory-gold text-primary p-2.5 rounded-xl shadow-lg shadow-accent/20 hover:scale-110 hover:rotate-3 transition-all active:scale-95 group-hover:bg-victory-gold-hover">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Tabbed Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-primary">Hand-Picked Selections</h2>
            <p className="text-xs text-muted-foreground mt-1">Our editors manually check these links for accuracy.</p>
          </div>
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            {['trending', 'top-rated', 'new-arrival'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:bg-card/50"
                )}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-ecommerce">
          {displayProducts.map((product, i) => (
            <Link key={i} href={`/product/${product.slug}`} className="group flex flex-col gap-3">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden relative shadow-ecommerce group-hover:shadow-ecommerce-md transition-all">
                <SafeImage
                  src={product.image_url || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-xs line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-black text-primary">₹{(product.name.length * 1000 + 5999).toLocaleString()}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-victory-gold group-hover:text-primary transition-all shadow-sm">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Brand Showcase */}
      <section className="bg-primary/5 py-12 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-heading font-black mb-8 text-primary uppercase tracking-tighter">Official Victory Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brands.map((brand, i) => (
              <div key={i} className={cn("rounded-2xl p-8 flex flex-col justify-end min-h-[300px] relative overflow-hidden group border border-white/10", brand.color)}>
                <SafeImage src={brand.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop'} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-1">{brand.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{brand.desc}</p>
                  <Button variant="brand" className="rounded-full text-xs font-black uppercase tracking-widest h-10 px-8 shadow-lg shadow-accent/10">Check Brand Deals</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter / CTA (High Impact) */}
      <motion.section
        className="w-full bg-victory-maroon py-16 text-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4 tracking-tighter">Deal Hunter? You're in luck.</h2>
          <p className="text-white/70 mb-10 text-lg">We find the best affiliate deals so you don't waste time searching.</p>
          <div className="relative flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <input
              type="text"
              placeholder="Search deals..."
              className="flex-1 bg-transparent px-6 h-12 outline-none placeholder:text-white/50 text-base"
            />
            <Button variant="brand" className="w-full sm:w-fit h-12 px-10 rounded-xl font-black uppercase text-xs tracking-widest">
              Find Deals
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
