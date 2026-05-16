import { render, screen } from '@testing-library/react'
import Template from './template'
import { describe, it, expect } from 'vitest'

describe('Template', () => {
  it('renders children correctly', () => {
    render(
      <Template>
        <div data-testid="child">Content</div>
      </Template>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
