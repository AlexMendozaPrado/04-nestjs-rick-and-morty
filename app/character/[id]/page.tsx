// app/character/[id]/page.tsx
import { notFound } from 'next/navigation'
import { RickAndMortyCharactersInfo } from '../../types-ts/rick-and-morty-characters-info'
import PersonajeClient from './PersonajeClient'

// Define API_URL aquí para asegurarte de que no se accede directamente desde el lado del cliente
const API_URL = 'https://rickandmortyapi.com/api/character'

interface PersonajeProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const response = await fetch(API_URL)
  const data = await response.json()
  const paths = data.results.map((character: RickAndMortyCharactersInfo) => ({
    id: character.id.toString(),
  }))
  return paths
}

async function fetchCharacter(id: string) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    return null
  }
  const character: RickAndMortyCharactersInfo = await res.json()
  return character
}

export default async function PersonajePage({ params }: PersonajeProps) {
  const personaje = await fetchCharacter(params.id)
  if (!personaje) {
    notFound()
  }

  return <PersonajeClient personaje={personaje} />
}
