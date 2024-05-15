"use client"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useContext } from 'react'
import { ContextoFavorito } from '../context-personajes/page'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

export default function Favoritos() {
  const { personajesFavoritos, removerPersonajeFavorito } =
    useContext(ContextoFavorito)
  const cantidadFavoritos = personajesFavoritos.length

  return (
    <>
      <Head>
        <title>Rick y Morty - Favoritos</title>
      </Head>
      <div className='flex min-h-screen flex-col items-center justify-center py-8'>
        <div className='flex w-full max-w-2xl items-center justify-between p-6'>
          <Link href='/' passHref>
            <MdOutlineArrowBackIosNew /> Atrás
          </Link>
          <h2 className='text-lg text-gray-100'>Tus personajes favoritos</h2>
        </div>
        <section className='flex w-full max-w-2xl flex-col items-center bg-gray-900 p-6'>
          {cantidadFavoritos > 0 ? (
            personajesFavoritos.map((personaje) => (
              <Link
                href={`/character/${personaje.id}`}
                key={personaje.id}
                className='my-2 flex w-full items-center overflow-hidden rounded border-2 border-blue-500 bg-gray-800 transition hover:-translate-y-1'
              >
                <Image
                  loader={() => personaje.image}
                  src={personaje.image}
                  unoptimized
                  width={85}
                  height={85}
                  alt={personaje.name}
                  className='rounded'
                />
                <div className='flex flex-col justify-between p-4'>
                  <p className='text-white'>{personaje.name}</p>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      removerPersonajeFavorito(personaje.id)
                    }}
                    className='mt-2 cursor-pointer bg-transparent text-orange-400'
                  >
                    Remover de favoritos
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className='flex h-full w-full items-center justify-center p-6'>
              <p className='text-white'>Lista de favoritos vacía.</p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
