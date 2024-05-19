import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='mt-6 flex flex-col items-center justify-center bg-gray-800 p-1.5 px-6'>
      <Image src='/logo.png' alt='Rick and Morty' width={230} height={94} />
      <p className='mb-6 text-center'>Alejandro Mendoza</p>
    </footer>
  )
}
