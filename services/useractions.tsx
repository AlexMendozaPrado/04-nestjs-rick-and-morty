'use server'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'
import { users } from '../app/db/schema'
import { redirect } from 'next/navigation'
import { db } from '../app/db'
import { signIn } from '../auth'
import { AuthError } from 'next-auth'
export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)

  return await db.insert(users).values({ email, password: hash })
}
export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  console.log('formData', formData)
  const user = await getUser(email)
  if (user.length > 0) {
    return 'User already exists' // TODO: Handle errors with useFormStatus
  } else {
    await createUser(email, password)
    redirect('/login')
  }
}
export const loginAction = async (formData: FormData) => {
  try {
    await signIn('credentials', formData)
    console.log('sucess', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
