import { render, screen } from '@testing-library/react'
import Home from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/HomeContent', () => ({
  HomeContent: ({ featuredProducts }: any) => (
    <div>
      {featuredProducts.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  ),
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders fallback products when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await Home()
    render(page)
    expect(
      screen.getByText('Premium Noise-Cancelling Headphones')
    ).toBeInTheDocument()
  })

  it('renders products from supabase when available', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.limit = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.eq = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockReturnValue(mockSupabase)

    // For the product fetch (order resolves to products)
    // For the banner fetch (second order resolves to banners)
    // For the product fetch (1 order call)
    // For the banner fetch (2 order calls)
    mockSupabase.order
      .mockResolvedValueOnce({ data: [{ id: 'p1', name: 'Supabase Product' }] }) // 1st call (end of products chain)
      .mockReturnValueOnce(mockSupabase) // 2nd call (first order of banners chain)
      .mockResolvedValueOnce({ data: [{ id: 'b1', title: 'Supabase Banner' }] }) // 3rd call (end of banners chain)

    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await Home()
    render(page)
    expect(screen.getByText('Supabase Product')).toBeInTheDocument()
  })

  it('renders fallback when supabase returns null data', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }

    // Simulate both products and banners returning null
    mockSupabase.order
      .mockResolvedValueOnce({ data: null }) // end of products chain
      .mockReturnValueOnce(mockSupabase) // first order of banners chain
      .mockResolvedValueOnce({ data: null }) // end of banners chain

    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://valid.url'

    const page = await Home()
    render(page)

    expect(
      screen.getByText('Premium Noise-Cancelling Headphones')
    ).toBeInTheDocument()
  })

  it('renders fallback when supabase url is placeholder', async () => {
    const mockSupabase: any = {}
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'your-supabase-project-url'

    const page = await Home()
    render(page)

    expect(
      screen.getByText('Premium Noise-Cancelling Headphones')
    ).toBeInTheDocument()
  })
})
