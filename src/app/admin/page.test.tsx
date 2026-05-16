import { render, screen } from '@testing-library/react'
import AdminDashboard from './page'
import { describe, it, expect } from 'vitest'

describe('AdminDashboard', () => {
  it('renders dashboard overview correctly', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
    expect(screen.getByText('Total Clicks')).toBeInTheDocument()
    expect(screen.getByText('12,402')).toBeInTheDocument()
    expect(screen.getByText('Active Products')).toBeInTheDocument()
    expect(screen.getByText('145')).toBeInTheDocument()
  })

  it('renders top performing links list', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Top Performing Links')).toBeInTheDocument()
    expect(screen.getByText('Apple AirPods Pro')).toBeInTheDocument()
    expect(screen.getByText('Sony WH-1000XM5')).toBeInTheDocument()
  })
})
