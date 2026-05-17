import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Noqlen Interface Studio shell', () => {
  it('starts on Anchor inside the simulator and exposes all apps', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Anchor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Anchor/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: /Flux/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Forge/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Aria/ })).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: /Anchor phone simulator/ }),
    ).toBeInTheDocument()
  })

  it('switches app previews without real integration', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Forge/ }))

    expect(screen.getByRole('heading', { name: 'Forge' })).toBeInTheDocument()
    expect(screen.getByText('Review now')).toBeInTheDocument()
    expect(
      screen.getByText('A few things are missing from your library.'),
    ).toBeInTheDocument()
  })
})
