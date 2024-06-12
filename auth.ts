import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUser } from './services/useractions'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('credentials', credentials)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(
            password,
            user.password as string,
          )
          console.log('passwordsMatch', passwordsMatch)
          console.log(['user', user])

          if (passwordsMatch) return user
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})
