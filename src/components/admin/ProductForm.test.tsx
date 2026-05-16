import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductForm } from './ProductForm'
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

describe('ProductForm', () => {
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
    render(<ProductForm categories={[]} />)
    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Redirect Slug/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Create Product/i })
    ).toBeInTheDocument()
  })

  it('updates slug automatically when name changes', () => {
    render(<ProductForm categories={[]} />)
    const nameInput = screen.getByLabelText(/Product Name/i)
    const slugInput = screen.getByLabelText(/Redirect Slug/i)

    fireEvent.change(nameInput, {
      target: { name: 'name', value: 'New Product' },
    })
    expect(slugInput).toHaveValue('new-product')
  })

  it('submits form correctly', async () => {
    render(<ProductForm categories={[]} />)
    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { name: 'name', value: 'Test Product' },
    })
    fireEvent.change(screen.getByLabelText(/Redirect Slug/i), {
      target: { name: 'slug', value: 'test-product' },
    })
    fireEvent.change(screen.getByLabelText(/Affiliate Link/i), {
      target: { name: 'affiliate_url', value: 'https://test.com' },
    })

    fireEvent.submit(screen.getByLabelText(/Product Form/i))

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('products')
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/products')
    })
  })

  it('updates all fields correctly', () => {
    render(<ProductForm categories={[{ id: 'c1', name: 'Electronics' }]} />)

    fireEvent.change(screen.getByLabelText(/Description \(optional\)/i), {
      target: { name: 'description', value: 'New Desc' },
    })
    fireEvent.change(screen.getByLabelText(/Affiliate Link \(Mandatory\)/i), {
      target: { name: 'affiliate_url', value: 'https://test.com' },
    })

    expect(screen.getByLabelText(/Description \(optional\)/i)).toHaveValue(
      'New Desc'
    )
    expect(screen.getByLabelText(/Affiliate Link \(Mandatory\)/i)).toHaveValue(
      'https://test.com'
    )
  })

  it('handles submission error message', async () => {
    mockSupabase.insert.mockResolvedValueOnce({
      error: { message: 'Product error' },
    })
    render(<ProductForm categories={[{ id: '1', name: 'Electronics' }]} />)

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { name: 'name', value: 'Test' },
    })
    fireEvent.submit(screen.getByRole('form', { name: /Product Form/i }))

    await waitFor(() => {
      expect(screen.getByText('Product error')).toBeInTheDocument()
    })
  })

  it('calls router.back when cancel is clicked', () => {
    render(<ProductForm categories={[]} />)
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(mockRouter.back).toHaveBeenCalled()
  })

  it('renders nested categories correctly', () => {
    const categoriesWithChildren = [
      { id: 'p1', name: 'Parent', parent_id: null },
      { id: 'c1', name: 'Child', parent_id: 'p1' },
    ]
    render(<ProductForm categories={categoriesWithChildren} />)
    const selectMock = screen.getByTestId('select-mock')
    fireEvent.click(selectMock)
    expect(screen.getByText('— Child')).toBeInTheDocument()
  })

  it('handles missing supabase correctly', async () => {
    vi.mocked(createClient).mockReturnValue(null as any)
    render(<ProductForm categories={[]} />)

    fireEvent.submit(screen.getByRole('form', { name: /Product Form/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Supabase is not configured.')
      ).toBeInTheDocument()
    })
  })

  it('renders image preview when image_url is provided', () => {
    render(<ProductForm categories={[]} />)
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: { name: 'image_url', value: 'http://test.com/image.jpg' },
    })
    expect(screen.getByText('SafeImage')).toBeInTheDocument()
  })

  it('handles unexpected throw errors with missing message', async () => {
    const mockInsert = vi.fn().mockRejectedValueOnce({})
    mockSupabase.from.mockReturnValueOnce({ insert: mockInsert } as any)

    render(<ProductForm categories={[]} />)

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { name: 'name', value: 'Test' },
    })
    fireEvent.submit(screen.getByRole('form', { name: /Product Form/i }))

    await waitFor(() => {
      expect(screen.getByText('Failed to create product')).toBeInTheDocument()
    })
  })
})
