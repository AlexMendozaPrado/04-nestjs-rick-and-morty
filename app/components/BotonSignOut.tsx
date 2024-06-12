'use client'
import { signOut } from 'next-auth/react'

export function BotonSignOut() {
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button
      onClick={handleSignOut}
      className='text-md flex items-center justify-center rounded-full bg-red-500 p-3 text-white transition-opacity duration-200 hover:opacity-80'
    >
      Sign Out
    </button>
  )
}
