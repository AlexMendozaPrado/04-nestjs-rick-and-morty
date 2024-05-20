import { render, screen, fireEvent } from '../test-utils'
import { PersonajeCard } from './personajesChard'
import { describe, it, expect } from 'vitest'
import { ContextoFavorito } from '../context-personajes/page'

const mockContextValue = {
  personajesFavoritos: [],
  agregarPersonajeFavorito: vi.fn(),
  verificarexistenciaPersonaje: vi.fn(() => -1),
  removerPersonajeFavorito: vi.fn(),
}

const mockPersonaje = {
  id: 1,
  name: 'Rick Sanchez',
  image: '/rick.png',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
}

describe('PersonajeCard', () => {
  it('renders character card', () => {
    render(
      <ContextoFavorito.Provider value={mockContextValue}>
        <PersonajeCard personaje={mockPersonaje} />
      </ContextoFavorito.Provider>,
    )

    const nameElement = screen.getByText(/Rick Sanchez/i)
    expect(nameElement).toBeInTheDocument()
  })

  it('adds character to favorites on button click', () => {
    render(
      <ContextoFavorito.Provider value={mockContextValue}>
        <PersonajeCard personaje={mockPersonaje} />
      </ContextoFavorito.Provider>,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockContextValue.agregarPersonajeFavorito).toHaveBeenCalledWith(
      mockPersonaje,
    )
  })
})
