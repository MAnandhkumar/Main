import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import { describe, it, expect } from 'vitest'

describe('Footer', () => {
  it('renders branding and company name', () => {
    render(<Footer />)
    expect(screen.getByText('NASKART')).toBeInTheDocument()
    expect(screen.getByText(/NASKART ENTERPRISE/)).toBeInTheDocument()
  })

  it('renders footer sections', () => {
    render(<Footer />)
    expect(screen.getByText('Shopping Guide')).toBeInTheDocument()
    expect(screen.getByText('Customer Care')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('renders social media and payment icons', () => {
    render(<Footer />)
    expect(screen.getByAltText('Visa')).toBeInTheDocument()
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument()
    expect(screen.getByAltText('Paypal')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument()
    expect(screen.getByText('support@naskart.com')).toBeInTheDocument()
  })
})
