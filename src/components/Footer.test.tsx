import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders correctly', () => {
    render(<Footer />)
    const textElement = screen.getByText(/Alejandro Mendoza/i)
    expect(textElement).toBeInTheDocument()
    const imageElement = screen.getByAltText(/Rick and Morty/i)
    expect(imageElement).toBeInTheDocument()
  })
})
