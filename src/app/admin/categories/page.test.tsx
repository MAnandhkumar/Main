import { render, screen } from '@testing-library/react'
import AdminCategoriesPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('AdminCategoriesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders categories from mock data when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await AdminCategoriesPage()
    render(page)

    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Mobile Phones')).toBeInTheDocument()
    expect(screen.getByText('Furniture')).toBeInTheDocument()
  })

  it('renders categories from supabase when configured', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({
      data: [
        { id: 'c1', name: 'Supabase Category', slug: 's1', parent_id: null },
      ],
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminCategoriesPage()
    render(page)

    expect(screen.getByText('Supabase Category')).toBeInTheDocument()
  })

  it('renders empty state when no categories found', async () => {
    const mockSupabase: any = {}
    mockSupabase.from = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.select = vi.fn().mockReturnValue(mockSupabase)
    mockSupabase.order = vi.fn().mockResolvedValue({ data: null })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const page = await AdminCategoriesPage()
    render(page)

    expect(screen.getByText(/No categories found/i)).toBeInTheDocument()
  })
})
