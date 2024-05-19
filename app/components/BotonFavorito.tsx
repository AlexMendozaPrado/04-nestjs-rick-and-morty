// Archivo: BotonFavorito.tsx
'use client'
import { useContext } from 'react'
import { ContextoFavorito } from '../context-personajes/page'
import { AiFillStar } from 'react-icons/ai'
import Link from 'next/link'

export function BotonFavorito() {
  // Contexto de favoritos
  const { personajesFavoritos } = useContext(ContextoFavorito)
  // Cantidad de favoritos
  const cantidadFavoritos = personajesFavoritos.length

  return (
    <Link
      href='/favoritos'
      className='text-md relative flex cursor-pointer items-center rounded-full border-none bg-blue-500 p-3 text-gray-900 transition-opacity duration-200 hover:opacity-80'
    >
      <AiFillStar />
      {cantidadFavoritos > 0 && (
        <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 px-2 text-sm font-bold text-white'>
          {cantidadFavoritos}
        </span>
      )}
    </Link>
  )
}
