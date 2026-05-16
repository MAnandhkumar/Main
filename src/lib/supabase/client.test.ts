import { createClient } from './client'
import { createBrowserClient } from '@supabase/ssr'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}))

describe('Supabase Client', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
    vi.clearAllMocks()
  })

  it('returns null if env vars are missing', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ''
    expect(createClient()).toBeNull()
  })

  it('returns null if default placeholder is used', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'your-supabase-project-url'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'
    expect(createClient()).toBeNull()
  })

  it('creates client if env vars are present', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'some-key'

    createClient()
    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'some-key'
    )
  })
})
