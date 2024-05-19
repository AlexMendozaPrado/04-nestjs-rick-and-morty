// src/test-utils.tsx
import React, { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ContextoFavorito } from './context-personajes/contexto-personaje'
import { vi } from 'vitest'

const mockContextValue = {
  personajesFavoritos: [],
  agregarPersonajeFavorito: vi.fn(),
  verificarexistenciaPersonaje: vi.fn(),
  removerPersonajeFavorito: vi.fn(),
  cambiarTema: vi.fn(),
  tema: true,
}

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ContextoFavorito.Provider value={mockContextValue}>
      {children}
    </ContextoFavorito.Provider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
