import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Noqlen Interface Studio shell', () => {
  it('starts on Anchor and exposes all studio tabs', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Anchor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Anchor/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: /Flux/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Forge/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Aria/ })).toBeInTheDocument()
  })

  it('switches to a placeholder tab without real integration', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Flux/ }))

    expect(screen.getByRole('heading', { name: 'Flux' })).toBeInTheDocument()
    expect(screen.getByText('Flux placeholder contract')).toBeInTheDocument()
    expect(screen.getByText('No real backend')).toBeInTheDocument()
  })
})
