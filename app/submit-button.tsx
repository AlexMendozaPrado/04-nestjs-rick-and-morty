'use client'

import React, { useState } from 'react'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(false)

  const handleClick = () => {
    setPending(true)
    // Simular una solicitud de formulario
    setTimeout(() => {
      setPending(false)
      // Aquí podrías manejar la lógica real del formulario, como enviar los datos
    }, 2000)
  }

  return (
    <button
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending}
      className='flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none'
      onClick={handleClick}
    >
      {children}
      {pending && (
        <svg
          className='ml-2 h-4 w-4 animate-spin text-black'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
          />
        </svg>
      )}
      <span aria-live='polite' className='sr-only' role='status'>
        {pending ? 'Loading' : 'Submit form'}
      </span>
    </button>
  )
}