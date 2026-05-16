import { render, screen } from '@testing-library/react'
import AdminLinksPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('AdminLinksPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders links from mock data when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await AdminLinksPage()
    render(page)

    expect(screen.getByText('Amazon')).toBeInTheDocument()
    expect(screen.getByText('Walmart')).toBeInTheDocument()
    expect(
      screen.getByText('Premium Noise-Cancelling Headphones')
    ).toBeInTheDocument()
  })

  it('renders links from supabase when configured', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'l1',
          platform: 'Supabase Platform',
          products: { name: 'Linked Product' },
          slug: 'l1',
          affiliate_url: 'http://link.com',
        },
      ],
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminLinksPage()
    render(page)

    expect(screen.getByText('Supabase Platform')).toBeInTheDocument()
    expect(screen.getByText('Linked Product')).toBeInTheDocument()
  })

  it('renders empty state when no links found', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({ data: null })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminLinksPage()
    render(page)

    expect(screen.getByText(/No affiliate links found/i)).toBeInTheDocument()
  })
})
