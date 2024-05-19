import { render, screen } from '../test-utils' // Usa la función de utilidad
import { BotonFavorito } from './BotonFavorito'
import { describe, it, expect } from 'vitest'
import { ContextoFavorito } from '../context-personajes/contexto-personaje'

const mockContextValue = {
  personajesFavoritos: [{ id: 1, name: 'Rick Sanchez', image: '/rick.png' }],
  agregarPersonajeFavorito: vi.fn(),
  verificarexistenciaPersonaje: vi.fn(),
  removerPersonajeFavorito: vi.fn(),
  cambiarTema: vi.fn(),
  tema: true,
}

describe('BotonFavorito', () => {
  it('renders with favorite count', () => {
    render(
      <ContextoFavorito.Provider value={mockContextValue}>
        <BotonFavorito />
      </ContextoFavorito.Provider>,
    )
    const countElement = screen.getByText('1')
    expect(countElement).toBeInTheDocument()
  })
})
