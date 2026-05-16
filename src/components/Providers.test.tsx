import { render, screen, act } from '@testing-library/react'
import { Providers, useLanguage } from './Providers'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next-themes
vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

const TestComponent = () => {
  const { language, t, setLanguage } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="trans">{t('home')}</span>
      <button onClick={() => setLanguage('ta')}>Change</button>
    </div>
  )
}

describe('Providers', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('provides default language', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
    expect(screen.getByTestId('trans')).toHaveTextContent('Home')
  })

  it('updates language and persists to localStorage', async () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    )

    const button = screen.getByRole('button')
    await act(async () => {
      button.click()
    })

    expect(screen.getByTestId('lang')).toHaveTextContent('ta')
    expect(screen.getByTestId('trans')).toHaveTextContent('முகப்பு')
    expect(localStorage.getItem('language')).toBe('ta')
  })

  it('loads language from localStorage on init', () => {
    localStorage.setItem('language', 'ta')
    render(
      <Providers>
        <TestComponent />
      </Providers>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('ta')
  })

  it('handles storage events from other tabs', async () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    )

    await act(async () => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'language',
          newValue: 'ta',
        })
      )
    })

    expect(screen.getByTestId('lang')).toHaveTextContent('ta')
  })
})
