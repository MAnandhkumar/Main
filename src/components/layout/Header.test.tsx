import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import { describe, it, expect, vi } from 'vitest'

// Mock subcomponents
vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}))
vi.mock('@/components/LanguageSwitcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">LanguageSwitcher</div>
  ),
}))
vi.mock('@/components/Providers', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}))

describe('Header', () => {
  it('renders branding and navigation links', () => {
    render(<Header />)
    expect(screen.getByText('NASKART')).toBeInTheDocument()
    expect(screen.getByText('Victory Deals')).toBeInTheDocument()
    expect(screen.getByText('Help Hub')).toBeInTheDocument()
  })

  it('renders search input on desktop', () => {
    render(<Header />)
    expect(
      screen.getByPlaceholderText('Search for victory-grade deals...')
    ).toBeInTheDocument()
    expect(screen.getByText('Hunt')).toBeInTheDocument()
  })

  it('renders language and theme switchers', () => {
    render(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })
})
