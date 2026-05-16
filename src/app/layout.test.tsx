import { render, screen } from '@testing-library/react'
import RootLayout from './layout'
import { vi, describe, it, expect } from 'vitest'

vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-font' }),
}))

vi.mock('@/components/Providers', () => ({
  Providers: ({ children }: any) => (
    <div data-testid="providers">{children}</div>
  ),
}))

vi.mock('@/components/layout/Header', () => ({
  Header: () => <header>Header</header>,
}))

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer>Footer</footer>,
}))

describe('RootLayout', () => {
  it('renders correctly with children', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('providers')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
