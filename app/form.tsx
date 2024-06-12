'use client'

import React, { FormEvent, useState } from 'react'

interface FormProps {
  action: (formData: FormData) => Promise<any>
  children: React.ReactNode
}

export function Form({ action, children }: FormProps) {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log('Form submitted with', formData)
    try {
      await action(formData)
      setError(null) // Clear error on successful submission
    } catch (errorMessage) {
      setError(
        errorMessage instanceof Error
          ? errorMessage.message
          : String(errorMessage),
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'
    >
      {error && <p className='text-red-500'>{error}</p>}
      {children}
    </form>
  )
}
