// app/layout.tsx
'use server'
import { ReactNode } from 'react'
import { auth } from '../auth'
import ClientLayout from './ClientLayout'
interface LayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  const session = await auth() // Obtén la sesión del lado del servidor
  console.log('session', session)
  return (
    <html lang='en'>
      <body>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  )
}
