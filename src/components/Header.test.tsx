import { render, screen, fireEvent } from '../test-utils' // Usa la función de utilidad
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders correctly', () => {
    const setIsOscuroTemas = vi.fn()
    render(<Header esOscuroTemas={true} setIsOscuroTemas={setIsOscuroTemas} />)

    const logoElement = screen.getByAltText(/Rick and Morty/i)
    expect(logoElement).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(setIsOscuroTemas).toHaveBeenCalledTimes(1)
  })
})
