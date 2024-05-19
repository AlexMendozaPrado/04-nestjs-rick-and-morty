import { render, screen, fireEvent, waitFor } from '../test-utils'
import Home from './index'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { toast } from 'react-toastify'

// Mockear axios y toast
vi.mock('axios')
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

const mockPersonajes = [
  { id: 1, name: 'Rick Sanchez', image: '/rick.png' },
  { id: 2, name: 'Morty Smith', image: '/morty.png' },
]

const mockResponse = {
  info: {
    count: 2,
    pages: 1,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
    current: 'https://rickandmortyapi.com/api/character',
  },
  results: mockPersonajes,
}

const newPageResponse = {
  info: {
    count: 2,
    pages: 2,
    next: null,
    prev: 'https://rickandmortyapi.com/api/character?page=1',
    current: 'https://rickandmortyapi.com/api/character?page=2',
  },
  results: [
    { id: 3, name: 'Summer Smith', image: '/summer.png' },
    { id: 4, name: 'Jerry Smith', image: '/jerry.png' },
  ],
}

describe('Home', () => {
  it('renders character cards', () => {
    render(<Home response={mockResponse} />)

    const rickElement = screen.getByText(/Rick Sanchez/i)
    expect(rickElement).toBeInTheDocument()

    const mortyElement = screen.getByText(/Morty Smith/i)
    expect(mortyElement).toBeInTheDocument()
  })

  it('handles pagination correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: newPageResponse })

    render(<Home response={mockResponse} />)

    const nextPageButton = screen.getByText(/Siguiente/i)
    fireEvent.click(nextPageButton)

    // Esperar a que los nuevos personajes se carguen
    await screen.findByText(/Summer Smith/i)
    await screen.findByText(/Jerry Smith/i)
  })

  it('displays error message on API failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'))

    render(<Home response={mockResponse} />)

    const nextPageButton = screen.getByText(/Siguiente/i)
    fireEvent.click(nextPageButton)

    // Esperar a que el error se maneje
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Error al obtener los datos'),
    )
  })
})
