import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt-ts'
import { getUser } from '../services/useractions'
import { authConfig } from '../auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        const user = await getUser(email)
        if (user.length === 0) return null
        const passwordsMatch = await compare(password, user[0].password!)
        if (passwordsMatch) return user[0] as any
      },
    }),
  ],
})