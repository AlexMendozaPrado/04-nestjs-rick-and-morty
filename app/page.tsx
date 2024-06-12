// app/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IoSearch, IoCloseSharp } from 'react-icons/io5'
import {
  RickAndMortyCharactersInfo,
  restApiResponseData,
} from './types-ts/rick-and-morty-characters-info'

import { PersonajeCard } from './components/personajesChard'
import Head from 'next/head'

interface InfoActual {
  count: number
  pages: number
  next: string | null
  prev: string | null
  current: string
}

interface infoBusqueda {
  consulta: string
}

export const API_URL = 'https://rickandmortyapi.com/api/character'

export default function Home() {
  const [filtrado, setFiltrado] = useState<string>('')
  const [personajes, setPersonajes] = useState<RickAndMortyCharactersInfo[]>([])
  const [infoActual, setInfoActual] = useState<InfoActual>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    current: API_URL,
  })

  const { current } = infoActual
  const deshabilitarAnterior = infoActual.prev === null
  const deshabilitarSiguiente = infoActual.next === null
  const numeroPaginaActual = current.includes('page=')
    ? Number(new URL(current).searchParams.get('page'))
    : 1

  const fetchData = async (url: string) => {
    const response = await axios
      .get<restApiResponseData>(url)
      .then(({ data }) => data)
      .catch(() => {
        toast.error('Error al obtener los datos')
        return null
      })
    if (response) {
      setInfoActual({
        ...response.info,
        current: url,
      })
      setPersonajes([...response.results])
    }
  }

  useEffect(() => {
    fetchData(API_URL)
  }, [])

  useEffect(() => {
    if (current === API_URL) return
    fetchData(current)
  }, [current])

  const {
    register,
    formState: { errors },
  } = useForm<infoBusqueda>()

  return (
    <>
      <Head>
        <title>Rick y Morty</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container mx-auto px-8 py-36'>
        <form className='mb-4 mt-6 flex w-full items-center justify-between'>
          <div className='flex-1'>
            <input
              type='text'
              {...register('consulta', { required: true })}
              placeholder='Buscar personaje por nombre'
              className='w-full rounded-lg border border-green-100 p-2'
            />
            {errors.consulta && (
              <span className='mt-2 block text-sm text-orange-500'>
                Este campo es requerido
              </span>
            )}
          </div>
          <button
            type='submit'
            className='ml-2 rounded-lg bg-blue-500 p-2 text-white hover:opacity-80'
          >
            <IoSearch />
          </button>
        </form>
        {filtrado && (
          <div className='my-4 text-center'>
            <span>Filtrado por: </span>
            <span className='inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-white'>
              {filtrado}
              <button
                className='ml-2 text-red-500'
                onClick={() => setFiltrado('')}
              >
                <IoCloseSharp />
              </button>
            </span>
          </div>
        )}
        <div className='grid gap-8  p-8 lg:grid-cols-3'>
          {personajes.map((personaje) => (
            <PersonajeCard key={personaje.id} personaje={personaje} />
          ))}
        </div>
        <div className='my-8 flex items-center justify-center gap-4'>
          <button
            className='cursor-pointer rounded-lg bg-black px-6 py-2 text-base font-medium text-yellow-400 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500'
            onClick={() =>
              setInfoActual((prev) => ({
                ...prev,
                current: prev.prev ?? prev.current,
              }))
            }
            disabled={deshabilitarAnterior}
          >
            Previo
          </button>
          <div className='flex items-center justify-center rounded-lg bg-black'>
            <input
              type='text'
              disabled
              value={`${numeroPaginaActual} / ${infoActual.pages}`}
              className='w-20 bg-transparent py-2 text-center text-yellow-400'
            />
          </div>
          <button
            className='cursor-pointer rounded bg-yellow-500 px-4 py-2 text-sm text-gray-900 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={() =>
              setInfoActual((prev) => ({
                ...prev,
                current: prev.next ?? prev.current,
              }))
            }
            disabled={deshabilitarSiguiente}
          >
            Siguiente
          </button>
        </div>
      </main>
    </>
  )
}
