// PersonajeClient.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import PersonajeClient from './PersonajeClient'
import { RickAndMortyCharactersInfo } from '../../types-ts/rick-and-morty-characters-info'
import { ContextoFavorito } from '../../context-personajes/page'
import { vi } from 'vitest'

// Datos simulados del personaje
const personaje: RickAndMortyCharactersInfo = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  type: '',
  origin: { name: 'Earth (C-137)' },
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
}

// Mock del contexto de favoritos
const mockAgregarPersonajeFavorito = vi.fn()
const mockRemoverPersonajeFavorito = vi.fn()
const mockVerificarexistenciaPersonaje = vi.fn(() => -1)

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ContextoFavorito.Provider
    value={{
      agregarPersonajeFavorito: mockAgregarPersonajeFavorito,
      removerPersonajeFavorito: mockRemoverPersonajeFavorito,
      verificarexistenciaPersonaje: mockVerificarexistenciaPersonaje,
    }}
  >
    {children}
  </ContextoFavorito.Provider>
)

test('renderiza correctamente los detalles del personaje', () => {
  render(<PersonajeClient personaje={personaje} />, { wrapper })
  expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
  expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument()
  expect(screen.getByText('Earth (C-137)')).toBeInTheDocument()
  expect(screen.getByText('Male')).toBeInTheDocument()
  expect(screen.getByText('Alive')).toBeInTheDocument()
  expect(screen.getByText('Human')).toBeInTheDocument()
})

test('maneja correctamente agregar y remover favoritos', () => {
  render(<PersonajeClient personaje={personaje} />, { wrapper })
  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(mockAgregarPersonajeFavorito).toHaveBeenCalledWith(personaje)
  mockVerificarexistenciaPersonaje.mockReturnValue(0)
  fireEvent.click(button)
  expect(mockRemoverPersonajeFavorito).toHaveBeenCalledWith(personaje.id)
})
