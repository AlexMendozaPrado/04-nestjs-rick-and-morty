'use client'
import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { RickAndMortyCharactersInfo } from '../../types-ts/rick-and-morty-characters-info'
import PersonajeClient from './PersonajeClient'

const API_URL = 'https://rickandmortyapi.com/api/character'

interface PersonajeProps {
  params: {
    id: string
  }
}

export async function fetchCharacter(
  id: string,
): Promise<RickAndMortyCharactersInfo | null> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    return null
  }
  const character: RickAndMortyCharactersInfo = await res.json()
  return character
}

export default function PersonajePage({ params }: PersonajeProps) {
  const [personaje, setPersonaje] = useState<RickAndMortyCharactersInfo | null>(
    null,
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCharacter() {
      const character = await fetchCharacter(params.id)
      if (!character) {
        notFound()
      } else {
        setPersonaje(character)
      }
      setLoading(false)
    }

    getCharacter()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  return personaje ? <PersonajeClient personaje={personaje} /> : null
}
