import { createClient } from './server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

describe('Supabase Server Client', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
    vi.clearAllMocks()
  })

  it('returns null if env vars are missing', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ''
    expect(await createClient()).toBeNull()
  })

  it('creates server client if env vars are present', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'

    const mockCookies = {
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    }
    vi.mocked(cookies).mockResolvedValue(mockCookies as any)

    await createClient()
    expect(createServerClient).toHaveBeenCalled()
  })

  it('handles cookies correctly', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://valid.url'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'valid-key'

    const mockCookieStore = {
      getAll: vi.fn().mockReturnValue([{ name: 'c1', value: 'v1' }]),
      set: vi.fn(),
    }
    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any)

    let cookieHandlers: any
    vi.mocked(createServerClient).mockImplementation(
      (_url, _key, options: any) => {
        cookieHandlers = options.cookies
        return { auth: {} } as any
      }
    )

    await createClient()

    expect(cookieHandlers.getAll()).toEqual([{ name: 'c1', value: 'v1' }])
    cookieHandlers.setAll([{ name: 'new', value: 'val', options: {} }])
    expect(mockCookieStore.set).toHaveBeenCalledWith('new', 'val', {})
  })
})
