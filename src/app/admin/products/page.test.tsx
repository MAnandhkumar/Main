import { render, screen } from '@testing-library/react'
import AdminProductsPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/SafeImage', () => ({
  SafeImage: () => <div>SafeImage</div>,
}))

describe('AdminProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders products from mock data when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await AdminProductsPage()
    render(page)

    expect(
      screen.getByText('Premium Noise-Cancelling Headphones')
    ).toBeInTheDocument()
    expect(screen.getByText('Ergonomic Desk Chair')).toBeInTheDocument()
    expect(screen.getByText('Minimalist Smartwatch')).toBeInTheDocument()
  })

  it('renders products from supabase when configured', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({
      data: [
        { id: 's1', name: 'Supabase Product', slug: 's1', status: 'Active' },
      ],
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminProductsPage()
    render(page)
    expect(screen.getByText('Supabase Product')).toBeInTheDocument()
  })

  it('renders inactive product correctly', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({
      data: [
        { id: 's2', name: 'Inactive Product', slug: 's2', status: 'Inactive' },
      ],
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminProductsPage()
    render(page)

    expect(screen.getByText('Inactive Product')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('renders empty state when no products found', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({ data: null })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminProductsPage()
    render(page)

    expect(screen.getByText(/No products found/i)).toBeInTheDocument()
  })
})
