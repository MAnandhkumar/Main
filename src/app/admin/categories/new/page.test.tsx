import { render, screen } from '@testing-library/react'
import NewCategoryPage from './page'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@/lib/supabase/server'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/components/admin/CategoryForm', () => ({
  CategoryForm: ({ categories }: any) => (
    <div>CategoryForm: {categories.length}</div>
  ),
}))

describe('NewCategoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly without supabase', async () => {
    vi.mocked(createClient).mockResolvedValue(null)
    const page = await NewCategoryPage()
    render(page)
    expect(screen.getByText('New Category')).toBeInTheDocument()
    expect(screen.getByText('CategoryForm: 0')).toBeInTheDocument()
  })

  it('renders with categories from supabase', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [{ id: '1', name: 'Root Cat' }],
      }),
    }
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any)

    const page = await NewCategoryPage()
    render(page)

    expect(screen.getByText('CategoryForm: 1')).toBeInTheDocument()
  })
})
