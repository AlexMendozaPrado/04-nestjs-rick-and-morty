'use server'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'
import { users, favorites, FavoritesInsert } from '../app/db/schema'
import { redirect } from 'next/navigation'
import { db } from '../app/db'
import { signIn, signOut, auth } from '../auth'
import { AuthError } from 'next-auth'

export async function getUser(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email))
  return user[0]
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)

  return await db.insert(users).values({ email, password: hash })
}
export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const user = await getUser(email)
  if (user) {
    return 'User already exists' // TODO: Handle errors with useFormStatus
  } else {
    await createUser(email, password)
    redirect('/login')
  }
}
export const loginAction = async (formData: FormData) => {
  console.log('formData2', formData)
  try {
    console.log('before sign in')
    const session = await auth()
    const value = session
    console.log('value', value)
    await signIn('credentials', formData)
    console.log('sucess', value)
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
export async function agregarPersonajeFavoritoDB(characterId: number) {
  try {
    const nuevoFavorito: FavoritesInsert = {
      characterId,
      created: new Date(),
    }

    await db.insert(favorites).values(nuevoFavorito)
    console.log('Personaje favorito agregado a la base de datos')
  } catch (error) {
    console.error(
      'Error al agregar personaje favorito a la base de datos:',
      error,
    )
  }
}
export async function logout() {
  await signOut()
  console.log('logged out')
}
