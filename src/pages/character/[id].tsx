// Next
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

// React
import { useContext } from 'react'

// Context
import { ContextoFavorito } from '../../context-personajes/contexto-personaje'

// Libs
import axios from 'axios'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

// Types
import { RickAndMortyCharactersInfo } from '../../types-ts/rick-and-morty-characters-info'

import { API_URL } from '@/pages/index'

interface PersonajeProps {
  personaje: RickAndMortyCharactersInfo
}

export default function Personaje({ personaje }: PersonajeProps) {
  const {
    agregarPersonajeFavorito,
    removerPersonajeFavorito,
    verificarexistenciaPersonaje,
  } = useContext(ContextoFavorito)

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
    <>
      <Head>
        <title>Rick y Morty - {personaje.name}</title>
      </Head>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <div className='flex w-full max-w-md items-center justify-between p-4'>
          <Link
            href='/'
            passHref
            className='flex items-center gap-2 rounded bg-blue-500 p-2 text-white hover:opacity-80'
          >
            <MdOutlineArrowBackIosNew /> Back
          </Link>
          <button
            className={`flex items-center rounded p-2 ${
              verificarexistenciaPersonaje(personaje.id) >= 0
                ? 'bg-yellow-400'
                : 'bg-gray-400'
            } hover:opacity-80`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              manejarAgregarRemoverPersonaje(personaje)
            }}
          >
            {verificarexistenciaPersonaje(personaje.id) >= 0 ? (
              <AiFillStar />
            ) : (
              <AiOutlineStar />
            )}
          </button>
        </div>
        <Image
          src={personaje.image}
          unoptimized
          width={300}
          height={300}
          alt={personaje.name}
          className='my-4'
        />
        <h1 className='my-2 text-center text-2xl font-bold'>
          {personaje.name}
        </h1>
        {personaje.type && (
          <div className='my-2 rounded-lg bg-gray-800 p-4 text-white'>
            <strong className='font-bold'>Tipo:</strong>{' '}
            <span>{personaje.type}</span>
          </div>
        )}
        {personaje.origin.name && (
          <div className='my-2 rounded-lg bg-gray-800 p-4 text-white'>
            <strong className='font-bold'>Nombre:</strong>{' '}
            <span>{personaje.origin.name}</span>
          </div>
        )}
        {personaje.gender && (
          <div className='my-2 rounded-lg bg-gray-800 p-4 text-white'>
            <strong className='font-bold'>Género:</strong>{' '}
            <span>{personaje.gender}</span>
          </div>
        )}
        {personaje.status && (
          <div className='my-2 rounded-lg bg-gray-800 p-4 text-white'>
            <strong className='font-bold'>Estado:</strong>{' '}
            <span>{personaje.status}</span>
          </div>
        )}
        {personaje.species && (
          <div className='my-2 rounded-lg bg-gray-800 p-4 text-white'>
            <strong className='font-bold'>Especie:</strong>{' '}
            <span>{personaje.species}</span>
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // You need to replace this part with your actual data-fetching logic
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const personajeId = params?.id
  const personaje = await axios
    .get<RickAndMortyCharactersInfo>(`${API_URL}/${personajeId}`)
    .then(({ data }) => data)
    .catch(() => null)

  if (!personaje) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      personaje,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
