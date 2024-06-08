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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize({ email, password }: any) {
        const user = await getUser(email)
        if (user.length === 0) return null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const passwordsMatch = await compare(password, user[0].password!)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (passwordsMatch) return user[0] as any
      },
    }),
  ],
})
