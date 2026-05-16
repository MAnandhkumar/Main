import { render, screen, fireEvent } from '@testing-library/react'
import { SafeImage } from './SafeImage'

describe('SafeImage', () => {
  it('renders an image with the given src', () => {
    render(<SafeImage src="https://example.com/test.jpg" alt="Test Image" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/test.jpg')
    expect(img).toHaveAttribute('alt', 'Test Image')
  })

  it('renders the fallback UI when src is missing', () => {
    render(<SafeImage src="" alt="Missing Image" />)
    expect(screen.getByText('NK')).toBeInTheDocument()
    expect(screen.getByText('Victory Selection')).toBeInTheDocument()
  })

  it('renders the fallback UI when an image fails to load', () => {
    render(
      <SafeImage src="https://example.com/invalid.jpg" alt="Error Image" />
    )
    const img = screen.getByRole('img')

    // Simulate image error
    fireEvent.error(img)

    expect(screen.getByText('NK')).toBeInTheDocument()
  })

  it('updates imgSrc when src prop changes', () => {
    const { rerender } = render(
      <SafeImage src="https://example.com/first.jpg" alt="test" />
    )
    expect(screen.getByAltText('test')).toHaveAttribute(
      'src',
      'https://example.com/first.jpg'
    )

    rerender(<SafeImage src="https://example.com/second.jpg" alt="test" />)
    expect(screen.getByAltText('test')).toHaveAttribute(
      'src',
      'https://example.com/second.jpg'
    )
  })
})
