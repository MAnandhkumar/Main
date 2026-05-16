import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from 'next-themes'
import { vi, describe, it, expect } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
      systemTheme: 'light',
    })
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('toggles theme from light to dark', () => {
    const setTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
    })
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('toggles theme from dark to light', () => {
    const setTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
    })
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })
})
