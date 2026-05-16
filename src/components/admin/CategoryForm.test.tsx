import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CategoryForm } from './CategoryForm'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange }: any) => (
    <div data-testid="select-mock" onClick={() => onValueChange('c1')}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: ({ placeholder }: any) => <div>{placeholder}</div>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => (
    <div data-testid="select-item" data-value={value}>
      {children}
    </div>
  ),
}))

describe('CategoryForm', () => {
  const mockRouter = {
    push: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }

  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ error: null }),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue(mockRouter as any)
    vi.mocked(createClient).mockReturnValue(mockSupabase as any)
  })

  it('renders correctly', () => {
    render(<CategoryForm categories={[]} />)
    expect(screen.getByLabelText(/Category Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Slug/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Create Category/i })
    ).toBeInTheDocument()
  })

  it('updates slug automatically when name changes', () => {
    render(<CategoryForm categories={[]} />)
    const nameInput = screen.getByLabelText(/Category Name/i)
    const slugInput = screen.getByLabelText(/Slug/i)

    fireEvent.change(nameInput, {
      target: { name: 'name', value: 'New Category' },
    })
    expect(slugInput).toHaveValue('new-category')
  })

  it('submits form correctly', async () => {
    render(<CategoryForm categories={[]} />)
    const nameInput = screen.getByLabelText(/Category Name/i)
    const slugInput = screen.getByLabelText(/Slug/i)

    fireEvent.change(nameInput, { target: { name: 'name', value: 'Laptops' } })
    fireEvent.change(slugInput, { target: { name: 'slug', value: 'laptops' } })
    fireEvent.submit(screen.getByLabelText(/Category Form/i))

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('categories')
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/categories')
    })
  })

  it('updates parent category correctly', () => {
    render(<CategoryForm categories={[{ id: 'p1', name: 'Parent' }]} />)
    const selectMock = screen.getByTestId('select-mock')
    fireEvent.click(selectMock)
    expect(
      screen.getByText(/Parent Category \(Optional\)/i)
    ).toBeInTheDocument()
  })

  it('calls router.back when cancel is clicked', () => {
    render(<CategoryForm categories={[]} />)
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(mockRouter.back).toHaveBeenCalled()
  })

  it('handles submission error message', async () => {
    mockSupabase.insert.mockResolvedValueOnce({
      error: { message: 'Category error' },
    })
    render(<CategoryForm categories={[]} />)

    fireEvent.change(screen.getByLabelText(/Category Name/i), {
      target: { name: 'name', value: 'Laptops' },
    })
    fireEvent.submit(screen.getByRole('form', { name: /Category Form/i }))

    await waitFor(() => {
      expect(screen.getByText('Category error')).toBeInTheDocument()
    })
  })

  it('handles missing supabase correctly', async () => {
    vi.mocked(createClient).mockReturnValue(null as any)
    render(<CategoryForm categories={[]} />)

    fireEvent.submit(screen.getByRole('form', { name: /Category Form/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Supabase is not configured.')
      ).toBeInTheDocument()
    })
  })

  it('handles unexpected throw errors with missing message', async () => {
    const mockInsert = vi.fn().mockRejectedValueOnce({})
    mockSupabase.from.mockReturnValueOnce({ insert: mockInsert } as any)

    render(<CategoryForm categories={[]} />)

    fireEvent.change(screen.getByLabelText(/Category Name/i), {
      target: { name: 'name', value: 'Laptops' },
    })
    fireEvent.submit(screen.getByRole('form', { name: /Category Form/i }))

    await waitFor(() => {
      expect(screen.getByText('Failed to create category')).toBeInTheDocument()
    })
  })
})
