import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from './Providers'
import { vi, describe, it, expect } from 'vitest'

vi.mock('./Providers', () => ({
  useLanguage: vi.fn(),
}))

describe('LanguageSwitcher', () => {
  it('renders correctly for EN', () => {
    vi.mocked(useLanguage).mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: (s: string) => s,
    })
    render(<LanguageSwitcher />)
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('TA')).toBeInTheDocument()
  })

  it('renders correctly for TA', () => {
    vi.mocked(useLanguage).mockReturnValue({
      language: 'ta',
      setLanguage: vi.fn(),
      t: (s: string) => s,
    })
    render(<LanguageSwitcher />)
    expect(screen.getByText('TA')).toBeInTheDocument()
  })

  it('calls setLanguage when clicked', () => {
    const setLanguage = vi.fn()
    vi.mocked(useLanguage).mockReturnValue({
      language: 'en',
      setLanguage,
      t: (s: string) => s,
    })
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button'))
    expect(setLanguage).toHaveBeenCalledWith('ta')
  })

  it('calls setLanguage with en when current is ta', () => {
    const setLanguage = vi.fn()
    vi.mocked(useLanguage).mockReturnValue({
      language: 'ta',
      setLanguage,
      t: (s: string) => s,
    })
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button'))
    expect(setLanguage).toHaveBeenCalledWith('en')
  })
})
