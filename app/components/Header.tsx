/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image'
import { BotonFavorito } from './BotonFavorito'

interface Headerprops {
  esOscuroTemas: boolean
  setIsOscuroTemas: (valor: boolean) => void
}

export default function Header({
  esOscuroTemas,
  setIsOscuroTemas,
}: Headerprops) {
  const manejarCambioTema = () => {
    setIsOscuroTemas(!esOscuroTemas)
  }
  return (
    <div className='flex items-center justify-center bg-gray-800 px-6 py-1.5'>
      <div className='flex w-full max-w-4xl items-center justify-between gap-2 px-2'>
        <Image src='/logo.png' alt='Rick and Morty' width={180} height={90} />

        <div className='flex w-full max-w-[130px] items-center justify-between gap-2'>
          <BotonFavorito />
          <label className='relative inline-block h-8 w-16 cursor-pointer'>
            <input
              type='checkbox'
              className='h-0 w-0 opacity-0'
              onClick={manejarCambioTema}
            />
            <span
              className={`slider absolute inset-0 block rounded-full bg-blue-500 transition-all duration-300 ${esOscuroTemas ? 'bg-blue-600' : 'bg-blue-500'}`}
            >
              <span
                className={`absolute bottom-1 left-1 h-7 w-7 transform rounded-full bg-gray-100 transition-all duration-300 ${esOscuroTemas ? 'translate-x-7' : ''}`}
              ></span>
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
