import { GET } from './route'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn().mockImplementation((url) => ({ url })),
  },
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

describe('Affiliate Redirect Route', () => {
  const mockRequest = {
    url: 'https://naskart.com/go/test-slug',
  }

  const mockContext = {
    params: Promise.resolve({ slug: 'test-slug' }),
  }

  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    insert: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(headers).mockResolvedValue(new Map() as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'
  })

  it('redirects to fallback if supabase is missing', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const response = await GET(mockRequest as any, mockContext)
    expect(NextResponse.redirect).toHaveBeenCalled()
    expect((response as any).url.toString()).toContain(
      'example-affiliate-link.com'
    )
  })

  it('redirects to affiliate URL if link is found', async () => {
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    mockSupabase.single.mockResolvedValue({
      data: { id: '1', affiliate_url: 'https://external.com' },
      error: null,
    })
    mockSupabase.insert.mockResolvedValue({ error: null })

    await GET(mockRequest as any, mockContext)
    expect(mockSupabase.from).toHaveBeenCalledWith('affiliate_links')
    expect(NextResponse.redirect).toHaveBeenCalledWith('https://external.com')
  })

  it('redirects to 404 if link is not found', async () => {
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)
    mockSupabase.single.mockResolvedValue({
      data: null,
      error: new Error('Not found'),
    })

    await GET(mockRequest as any, mockContext)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: expect.stringContaining('/404') })
    )
  })
})
