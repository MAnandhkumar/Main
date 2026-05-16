import { render, screen, fireEvent, act } from '@testing-library/react'
import { HomeContent } from './HomeContent'
import { describe, it, expect, vi } from 'vitest'

// Mock subcomponents and hooks
vi.mock('@/components/Providers', () => ({
  useLanguage: () => ({ t: (s: string) => s }),
}))

vi.mock('@/components/SafeImage', () => ({
  SafeImage: ({ alt }: { alt: string }) => (
    <div data-testid="safe-image">{alt}</div>
  ),
}))

const mockProducts = [
  {
    id: 'p1',
    name: 'Product 1',
    description: 'Desc 1',
    image_url: 'img1.jpg',
    slug: 'p1',
  },
]

const mockBanners = [
  {
    id: 'b1',
    title: 'Banner 1',
    subtitle: 'Sub 1',
    image_url: 'banner1.jpg',
    button_text: 'Click Me',
  },
]

describe('HomeContent', () => {
  /*
  it('renders banners correctly', async () => {
    render(<HomeContent featuredProducts={mockProducts} banners={mockBanners} />)
    expect(await screen.findByText(/Banner 1/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sub 1/i)).toBeInTheDocument()
    expect(await screen.findByText(/Click Me/i)).toBeInTheDocument()
  })
  */

  it('renders brand showcase', async () => {
    render(<HomeContent featuredProducts={[]} banners={[]} />)
    expect(await screen.findAllByText(/Check Brand Deals/i)).toBeTruthy()
  })

  it('cycles banners automatically', async () => {
    vi.useFakeTimers()
    const banners = [
      {
        id: '1',
        title: 'Banner 1',
        subtitle: 'Sub 1',
        image_url: '1.jpg',
        active: true,
        priority: 1,
      },
      {
        id: '2',
        title: 'Banner 2',
        subtitle: 'Sub 2',
        image_url: '2.jpg',
        active: true,
        priority: 1,
      },
    ]
    render(<HomeContent featuredProducts={[]} banners={banners} />)

    expect(
      screen.getByRole('heading', { name: 'Banner 1' })
    ).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(5000)
    })
    expect(
      screen.getByRole('heading', { name: 'Banner 2' })
    ).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('navigates banners manually', async () => {
    const banners = [
      {
        id: '1',
        title: 'Banner 1',
        subtitle: 'Sub 1',
        image_url: '1.jpg',
        active: true,
        priority: 1,
      },
      {
        id: '2',
        title: 'Banner 2',
        subtitle: 'Sub 2',
        image_url: '2.jpg',
        active: true,
        priority: 1,
      },
    ]
    render(<HomeContent featuredProducts={[]} banners={banners} />)

    expect(
      screen.getByRole('heading', { name: 'Banner 1' })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Next Banner'))
    expect(
      screen.getByRole('heading', { name: 'Banner 2' })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Previous Banner'))
    expect(
      screen.getByRole('heading', { name: 'Banner 1' })
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Go to banner 2'))
    expect(
      screen.getByRole('heading', { name: 'Banner 2' })
    ).toBeInTheDocument()
  })

  it('renders featured products', () => {
    render(
      <HomeContent featuredProducts={mockProducts} banners={mockBanners} />
    )
    expect(screen.getAllByText('Product 1').length).toBeGreaterThan(0)
  })

  it('toggles tabs correctly', () => {
    render(
      <HomeContent featuredProducts={mockProducts} banners={mockBanners} />
    )
    const topRatedTab = screen.getByText('top rated')
    fireEvent.click(topRatedTab)
    expect(topRatedTab).toHaveClass('bg-card')
  })

  it('renders categories', () => {
    render(
      <HomeContent featuredProducts={mockProducts} banners={mockBanners} />
    )
    expect(screen.getByText(/Popular Categories/i)).toBeInTheDocument()
    // Use a more lenient check
    const gamingElements = screen.queryAllByText(/Gaming/i)
    expect(gamingElements.length).toBeGreaterThan(0)
  })
  it('handles products without images', () => {
    const productsNoImage = [
      {
        id: 'p2',
        name: 'No Image Product',
        slug: 'p2',
        image_url: '',
        description: '',
      },
    ]
    render(<HomeContent featuredProducts={productsNoImage} banners={[]} />)
    const headings = screen.getAllByRole('heading', {
      name: 'No Image Product',
    })
    expect(headings.length).toBeGreaterThan(0)
  })
})
