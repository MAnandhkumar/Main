import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BannerForm } from './BannerForm'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/SafeImage', () => ({
  SafeImage: () => <div>SafeImage</div>,
}))

describe('BannerForm', () => {
  const mockRouter = {
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }

  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ error: null }),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ error: null }),
  }

  const mockInitialData = { id: '1', title: 'Old Title', image_url: 'img.jpg' }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue(mockRouter as any)
    vi.mocked(createClient).mockReturnValue(mockSupabase as any)
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('renders correctly for new banner', () => {
    render(<BannerForm />)
    expect(screen.getByLabelText(/^Title$/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Create Banner/i })
    ).toBeInTheDocument()
  })

  it('renders correctly with initial data', () => {
    render(<BannerForm initialData={mockInitialData} />)
    expect(screen.getByLabelText(/^Title$/i)).toHaveValue('Old Title')
    expect(
      screen.getByRole('button', { name: /Update Banner/i })
    ).toBeInTheDocument()
  })

  it('submits new banner correctly', async () => {
    render(<BannerForm />)
    fireEvent.change(screen.getByLabelText(/^Title$/i), {
      target: { value: 'New Banner' },
    })
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: { value: 'img.jpg' },
    })

    fireEvent.submit(screen.getByLabelText(/Banner Form/i))

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('banners')
      expect(mockSupabase.insert).toHaveBeenCalled()
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/banners')
    })
  })

  it('updates all fields correctly', () => {
    render(<BannerForm />)

    fireEvent.change(screen.getByLabelText(/Subtitle/i), {
      target: { value: 'New Sub' },
    })
    fireEvent.change(screen.getByLabelText(/Link URL/i), {
      target: { value: '/test' },
    })
    fireEvent.change(screen.getByLabelText(/Button Text/i), {
      target: { value: 'Buy' },
    })
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: '10' },
    })
    fireEvent.click(screen.getByLabelText(/Active/i))

    expect(screen.getByLabelText(/Subtitle/i)).toHaveValue('New Sub')
    expect(screen.getByLabelText(/Link URL/i)).toHaveValue('/test')
    expect(screen.getByLabelText(/Button Text/i)).toHaveValue('Buy')
    expect(screen.getByLabelText(/Priority/i)).toHaveValue(10)
    expect(screen.getByLabelText(/Active/i)).not.toBeChecked()
  })

  it('updates existing banner correctly', async () => {
    render(<BannerForm initialData={mockInitialData} />)
    fireEvent.change(screen.getByLabelText(/^Title$/i), {
      target: { value: 'Updated Title' },
    })

    fireEvent.submit(screen.getByLabelText(/Banner Form/i))

    await waitFor(() => {
      expect(mockSupabase.update).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Updated Title' })
      )
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', '1')
    })
  })

  it('handles submission error message', async () => {
    mockSupabase.insert.mockResolvedValueOnce({
      error: { message: 'Database error' },
    })
    render(<BannerForm />)

    fireEvent.change(screen.getByLabelText(/^Title$/i), {
      target: { value: 'Test' },
    })
    fireEvent.submit(screen.getByRole('form', { name: /Banner Form/i }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Database error')
    })
  })
})
