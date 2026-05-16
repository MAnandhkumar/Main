import { render, screen } from '@testing-library/react'
import AdminLayout from './layout'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('AdminLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders navigation links', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const layout = await AdminLayout({ children: <div>Content</div> })
    render(layout)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Banners')).toBeInTheDocument()
    expect(screen.getByText('Affiliate Links')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('checks auth when supabase is configured', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: {} } }),
      },
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'

    const layout = await AdminLayout({ children: <div>Content</div> })
    render(layout)

    expect(mockSupabase.auth.getUser).toHaveBeenCalled()
  })
})
