'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { ContextoFavorito } from '../context-personajes/page'
import { RickAndMortyCharactersInfo } from '../types-ts/rick-and-morty-characters-info'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface personajesChardProps {
  personaje: RickAndMortyCharactersInfo
}

// personajesChard.tsx
export function PersonajeCard({ personaje }: personajesChardProps) {
  const {
    agregarPersonajeFavorito,
    removerPersonajeFavorito,
    verificarexistenciaPersonaje,
  } = useContext(ContextoFavorito)

  console.log('Contexto:', {
    agregarPersonajeFavorito,
    removerPersonajeFavorito,
    verificarexistenciaPersonaje,
  })

  if (
    !agregarPersonajeFavorito ||
    !removerPersonajeFavorito ||
    !verificarexistenciaPersonaje
  ) {
    throw new Error('ContextoFavorito no está definido correctamente.')
  }

  const manejarAgregarRemoverPersonaje = (
    personaje: RickAndMortyCharactersInfo,
  ) => {
    if (verificarexistenciaPersonaje(personaje.id) >= 0) {
      removerPersonajeFavorito(personaje.id)
    } else {
      agregarPersonajeFavorito(personaje)
    }
  }

  return (
    <Link href={`/character/${personaje.id}`}>
      <div className='transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl'>
        <div className='relative h-full w-full '>
          <Image
            loader={() => personaje.image}
            src={personaje.image}
            unoptimized
            layout='responsive'
            width={300}
            height={300}
            alt={personaje.name}
            className='w-full rounded-t-lg object-cover object-center'
          />
        </div>
        <div className='rounded-b-lg bg-gray-800 px-6 py-4'>
          <div className='mb-2 text-xl font-bold text-white'>
            {personaje.name}
          </div>
        </div>
        <div className='rounded-b-lg bg-gray-900 px-6 pb-2 pt-4'>
          <button
            className='rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              manejarAgregarRemoverPersonaje(personaje)
            }}
          >
            {verificarexistenciaPersonaje(personaje.id) >= 0 ? (
              <AiFillStar className='text-yellow-400' />
            ) : (
              <AiOutlineStar className='text-gray-400' />
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
