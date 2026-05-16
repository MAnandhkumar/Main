import { render, screen } from '@testing-library/react'
import HelpPage from './page'
import { describe, it, expect } from 'vitest'

describe('HelpPage', () => {
  it('renders correctly', () => {
    render(<HelpPage />)
    expect(screen.getByText('How can we help?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Victory today/i)).toBeInTheDocument()
    expect(screen.getByText('How NASKART Works')).toBeInTheDocument()
    expect(screen.getByText('Verified Partners')).toBeInTheDocument()
    expect(screen.getByText('Still need help?')).toBeInTheDocument()
  })
})
