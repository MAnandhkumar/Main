import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}))

describe('LoginPage', () => {
  const mockRouter = {
    push: vi.fn(),
    refresh: vi.fn(),
  }

  const mockSupabase = {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue(mockRouter as any)
    vi.mocked(createClient).mockReturnValue(mockSupabase as any)
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
  })

  it('renders correctly', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
  })

  it('submits form correctly', async () => {
    render(<LoginPage />)
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'admin@test.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    })

    fireEvent.submit(screen.getByLabelText(/Login Form/i))

    await waitFor(() => {
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'admin@test.com',
        password: 'password123',
      })
      expect(mockRouter.push).toHaveBeenCalledWith('/admin')
    })
  })

  it('handles login error', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
      error: { message: 'Invalid credentials' },
    })
    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bad@test.com' },
    })
    fireEvent.submit(screen.getByLabelText(/Login Form/i))

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('bypasses login if supabase is not configured', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    render(<LoginPage />)

    fireEvent.submit(screen.getByLabelText(/Login Form/i))

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin')
    })
  })
})
