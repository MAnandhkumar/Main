import { updateSession } from './middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}))

vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(),
    redirect: vi.fn(),
  },
}))

describe('Supabase Middleware', () => {
  const originalEnv = process.env

  const mockRequest = {
    cookies: {
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    },
    nextUrl: {
      pathname: '/',
      clone: vi.fn().mockReturnThis(),
    },
  }

  const mockSupabase = {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  }

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
    vi.clearAllMocks()
    vi.mocked(createServerClient).mockReturnValue(mockSupabase as any)
    vi.mocked(NextResponse.next).mockReturnValue({
      cookies: { set: vi.fn() },
    } as any)
  })

  it('returns next response if env vars are missing', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    await updateSession(mockRequest as any)
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects to login if accessing admin without user', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'

    const adminRequest = {
      ...mockRequest,
      nextUrl: {
        pathname: '/admin/dashboard',
        clone: vi.fn().mockReturnValue({ pathname: '' }),
      },
    }

    await updateSession(adminRequest as any)
    expect(NextResponse.redirect).toHaveBeenCalled()
  })

  it('allows access to login route without user', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'

    const loginRequest = {
      ...mockRequest,
      nextUrl: {
        pathname: '/admin/login',
        clone: vi.fn(),
      },
    }

    await updateSession(loginRequest as any)
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('handles cookies correctly', async () => {
    const mockRequest = {
      cookies: {
        getAll: vi.fn().mockReturnValue([{ name: 'c1', value: 'v1' }]),
        set: vi.fn(),
      },
      nextUrl: { pathname: '/test' },
      url: 'http://localhost:3000/test',
    }
    const mockResponse = { cookies: { set: vi.fn() } }

    vi.mocked(NextResponse.next).mockReturnValue(mockResponse as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://valid.url'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'valid-key'

    let cookieHandlers: any
    vi.mocked(createServerClient).mockImplementation(
      (_url, _key, options: any) => {
        cookieHandlers = options.cookies
        return {
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
          },
        } as any
      }
    )

    await updateSession(mockRequest as any)

    // Trigger cookie handlers
    const cookies = cookieHandlers.getAll()
    expect(cookies).toEqual([{ name: 'c1', value: 'v1' }])

    cookieHandlers.setAll([{ name: 'new', value: 'val', options: {} }])
    expect(mockRequest.cookies.set).toHaveBeenCalledWith('new', 'val')
  })
})
