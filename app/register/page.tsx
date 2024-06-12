import Link from 'next/link'
import { SubmitButton } from '../submit-button'
import { register } from '../../services/useractions'

export default function Register() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
        <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16'>
          <h3 className='text-xl font-semibold'>Sign Up</h3>
          <p className='text-sm text-gray-500'>
            Create an account with your email and password
          </p>
        </div>
        <form action={register}>
          <div>
            <label
              htmlFor='email'
              className='block text-xs uppercase text-gray-600'
            >
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='user@acme.com'
              autoComplete='email'
              required
              className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-xs uppercase text-gray-600'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
            />
          </div>
          <SubmitButton>Sign Up</SubmitButton>
          <p className='text-center text-sm text-gray-600'>
            {'Already have an account? '}
            <Link href='/login' className='font-semibold text-gray-800'>
              Sign in
            </Link>
            {' instead.'}
          </p>
        </form>
      </div>
    </div>
  )
}
