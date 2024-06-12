import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  session: {
    strategy: 'jwt', // Add this line to set the session strategy to JWT
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (!isLoggedIn) {
        // Redirect unauthenticated users to login page
        if (
          nextUrl.pathname.startsWith('/') || // Redirect unauthenticated users to login page
          nextUrl.pathname.startsWith('/register') //
        ) {
          return true
        }
        return false // Redirect unauthenticated users to login page
      }
      return true // Allow authenticated users to access all pages
    },

    async jwt({ token, user: jwtUser, trigger }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (trigger === 'signIn') {
        token.id = jwtUser.id
      }

      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.id as string
      return session
    },
  },
} satisfies NextAuthConfig
