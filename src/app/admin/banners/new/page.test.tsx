import { render, screen } from '@testing-library/react'
import NewBannerPage from './page'
import { vi, describe, it, expect } from 'vitest'

vi.mock('@/components/admin/BannerForm', () => ({
  BannerForm: () => <div>BannerForm</div>,
}))

describe('NewBannerPage', () => {
  it('renders correctly', () => {
    render(<NewBannerPage />)
    expect(screen.getByText('Create New Banner')).toBeInTheDocument()
    expect(screen.getByText('BannerForm')).toBeInTheDocument()
  })
})
