import { render, screen } from '@testing-library/react'
import EditBannerPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))

vi.mock('@/components/admin/BannerForm', () => ({
  BannerForm: ({ initialData }: any) => (
    <div>BannerForm: {initialData.title}</div>
  ),
}))

describe('EditBannerPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "Database not configured" when supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await EditBannerPage({ params: Promise.resolve({ id: '1' }) })
    render(page)
    expect(screen.getByText('Database not configured')).toBeInTheDocument()
  })

  it('renders BannerForm with data from supabase', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '1', title: 'Test Banner' },
        error: null,
      }),
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await EditBannerPage({ params: Promise.resolve({ id: '1' }) })
    render(page)

    expect(screen.getByText('BannerForm: Test Banner')).toBeInTheDocument()
  })

  it('calls notFound when banner not found', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi
        .fn()
        .mockResolvedValue({ data: null, error: new Error('Not found') }),
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    await EditBannerPage({ params: Promise.resolve({ id: 'non-existent' }) })
    expect(notFound).toHaveBeenCalled()
  })
})
