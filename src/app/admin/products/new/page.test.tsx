import { render, screen } from '@testing-library/react'
import NewProductPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/admin/ProductForm', () => ({
  ProductForm: ({ categories }: any) => (
    <div>ProductForm: {categories.length}</div>
  ),
}))

describe('NewProductPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "No Categories Found" when categories list is empty', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await NewProductPage()
    render(page)
    expect(screen.getByText('No Categories Found')).toBeInTheDocument()
  })

  it('renders ProductForm when categories exist', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [{ id: 'c1', name: 'Electronics' }],
      }),
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await NewProductPage()
    render(page)

    expect(screen.getByText('ProductForm: 1')).toBeInTheDocument()
  })
})
