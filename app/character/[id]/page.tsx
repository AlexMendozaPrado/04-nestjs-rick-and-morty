'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [personaje, setPersonaje] = useState<RickAndMortyCharactersInfo | null>(
    null,
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return // Wait for session to load
    if (!session) {
      router.push('/login') // Redirect if no session
      return
    }

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
  }, [params.id, session, status, router])

  if (status === 'loading' || loading) {
    return <div>Loading...</div>
  }

  return personaje ? <PersonajeClient personaje={personaje} /> : null
}
