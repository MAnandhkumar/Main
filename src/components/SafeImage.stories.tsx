import type { Meta, StoryObj } from '@storybook/nextjs'
import { SafeImage } from './SafeImage'

const meta: Meta<typeof SafeImage> = {
  title: 'Components/SafeImage',
  component: SafeImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    fallback: { control: 'text' },
    alt: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SafeImage>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    alt: 'Premium Headphones',
    className: 'w-[400px] h-[300px] object-cover rounded-xl',
  },
}

export const ErrorState: Story = {
  args: {
    src: 'https://example.com/invalid-image.jpg',
    alt: 'Invalid Image',
    className: 'w-[400px] h-[300px] rounded-xl',
  },
}

export const EmptySrc: Story = {
  args: {
    src: '',
    alt: 'Empty Source',
    className: 'w-[400px] h-[300px] rounded-xl',
  },
}
