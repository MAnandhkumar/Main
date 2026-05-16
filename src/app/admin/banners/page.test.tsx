import { render, screen } from '@testing-library/react'
import BannersPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/SafeImage', () => ({
  SafeImage: () => <div>SafeImage</div>,
}))

describe('BannersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "Database not configured" when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await BannersPage()
    render(page)
    expect(screen.getByText('Database not configured')).toBeInTheDocument()
  })

  it('renders banners from supabase', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }
    mockSupabase.order.mockReturnValueOnce(mockSupabase).mockResolvedValueOnce({
      data: [
        {
          id: 'b1',
          title: 'Test Banner',
          image_url: 'img.jpg',
          active: true,
          priority: 1,
        },
      ],
    })

    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await BannersPage()
    render(page)

    expect(screen.getByText('Test Banner')).toBeInTheDocument()
  })

  it('renders empty state when no banners found', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }
    mockSupabase.order
      .mockReturnValueOnce(mockSupabase)
      .mockResolvedValueOnce({ data: [] })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await BannersPage()
    render(page)

    expect(screen.getByText(/No custom banners yet/i)).toBeInTheDocument()
  })

  it('renders inactive banner label', async () => {
    const mockSupabase: any = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }
    mockSupabase.order.mockReturnValueOnce(mockSupabase).mockResolvedValueOnce({
      data: [
        {
          id: 'b2',
          title: 'Inactive Banner',
          image_url: 'img.jpg',
          active: false,
          priority: 1,
        },
      ],
    })
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await BannersPage()
    render(page)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })
})
