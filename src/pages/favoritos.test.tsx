import { render, screen, fireEvent } from '../test-utils'
import Favoritos from './favoritos'
import { describe, it, expect } from 'vitest'
import { ContextoFavorito } from '../context-personajes/contexto-personaje'

const mockContextValue = {
  personajesFavoritos: [
    { id: 1, name: 'Rick Sanchez', image: '/rick.png' },
    { id: 2, name: 'Morty Smith', image: '/morty.png' },
  ],
  removerPersonajeFavorito: vi.fn(),
}

describe('Favoritos', () => {
  it('renders favorite characters', () => {
    render(
      <ContextoFavorito.Provider value={mockContextValue}>
        <Favoritos />
      </ContextoFavorito.Provider>,
    )

    const rickElement = screen.getByText(/Rick Sanchez/i)
    expect(rickElement).toBeInTheDocument()

    const mortyElement = screen.getByText(/Morty Smith/i)
    expect(mortyElement).toBeInTheDocument()
  })

  it('removes a character from favorites', () => {
    render(
      <ContextoFavorito.Provider value={mockContextValue}>
        <Favoritos />
      </ContextoFavorito.Provider>,
    )

    const removeButton = screen.getAllByText(/Remover de favoritos/i)[0]
    fireEvent.click(removeButton)

    expect(mockContextValue.removerPersonajeFavorito).toHaveBeenCalledWith(1)
  })
})
