import { createClient } from '@/lib/supabase/server'
import {
  HomeContent,
  type Product,
  type Banner,
} from '@/components/HomeContent'

export default async function Home() {
  const supabase = await createClient()
  let featuredProducts: Product[] = []
  let banners: Banner[] = []

  if (
    supabase &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
  ) {
    const { data: products } = await supabase
      .from('products')
      .select('*, categories(name)')
      .limit(6)
      .order('created_at', { ascending: false })
    /* istanbul ignore next */
    if (products) {
      featuredProducts = products
    }

    const { data: bannersData } = await supabase
      .from('banners')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })

    /* istanbul ignore next */
    if (bannersData) {
      banners = bannersData
    }
  }

  // Fallback mock data if DB is empty or unconfigured
  if (featuredProducts.length === 0) {
    featuredProducts = [
      {
        id: '1',
        name: 'Premium Noise-Cancelling Headphones',
        description:
          'Experience pure sound with our top-rated noise-cancelling technology.',
        image_url:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
        slug: 'premium-headphones',
        categories: { name: 'Electronics' },
      },
      {
        id: '2',
        name: 'Ergonomic Desk Chair',
        description:
          'Support your back with this highly adjustable mesh office chair.',
        image_url:
          'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop',
        slug: 'ergonomic-chair',
        categories: { name: 'Furniture' },
      },
      {
        id: '3',
        name: 'Minimalist Smartwatch',
        description:
          'Track your fitness and stay connected with a sleek, minimalist design.',
        image_url:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
        slug: 'minimalist-smartwatch',
        categories: { name: 'Accessories' },
      },
    ]
  }

  return <HomeContent featuredProducts={featuredProducts} banners={banners} />
}
