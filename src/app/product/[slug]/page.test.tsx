import { render, screen } from '@testing-library/react'
import ProductPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/SafeImage', () => ({
  SafeImage: () => <div>SafeImage</div>,
}))

describe('ProductPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  })

  it('renders mock product when supabase is missing', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await ProductPage({
      params: Promise.resolve({ slug: 'test-slug' }),
    })
    render(page)
    expect(
      screen.getByRole('heading', {
        name: 'Premium Noise-Cancelling Headphones',
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Get Deal Now')).toBeInTheDocument()
  })

  it('renders product from supabase when available', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.eq = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.single = vi.fn().mockResolvedValue({
      data: {
        id: '1',
        name: 'Supabase Product',
        description: 'Desc',
        slug: 's1',
        categories: { name: 'Cat' },
      },
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await ProductPage({ params: Promise.resolve({ slug: 's1' }) })
    render(page)
    expect(
      screen.getByRole('heading', { name: 'Supabase Product' })
    ).toBeInTheDocument()
    expect(screen.getAllByText('Cat').length).toBeGreaterThan(0)
  })

  it('generates metadata correctly', async () => {
    const { generateMetadata } = await import('./page')
    const mockSupabase: any = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { name: 'Meta Product', description: 'Meta Desc' },
      }),
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'meta-slug' }),
    })
    expect(metadata.title).toBe('Meta Product - Naskart Deals')
    expect(metadata.description).toBe('Meta Desc')
  })
})
