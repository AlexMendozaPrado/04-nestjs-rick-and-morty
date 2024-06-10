// app/ClientLayout.tsx
'use client'

import { ReactNode, useState } from 'react'
import SessionProvider from './components/SessionProvider'
import { ContextoFavoritosProvider } from './context-personajes/page'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, lightTheme } from './styles/themes/default'
import Footer from './components/Footer'
import Header from './components/Header'
import { GlobalStyle } from './styles/globals'
import './styles/globals.css'

interface ClientLayoutProps {
  children: ReactNode
  session: any
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  return (
    <SessionProvider session={session}>
      <ContextoFavoritosProvider>
        <ThemeProvider theme={isDarkTheme ? defaultTheme : lightTheme}>
          <>
            <Header
              esOscuroTemas={isDarkTheme}
              setIsOscuroTemas={setIsDarkTheme}
            />
            {children}
            <Footer />
          </>
          <ToastContainer />
          <GlobalStyle />
        </ThemeProvider>
      </ContextoFavoritosProvider>
    </SessionProvider>
  )
}
