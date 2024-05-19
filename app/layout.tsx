// app/layout.tsx
'use client'
import { ReactNode, useState } from 'react'
import { ContextoFavoritosProvider } from './context-personajes/page' // Asegúrate de que la ruta es correcta
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, lightTheme } from './styles/themes/default'
import Footer from './components/Footer'
import Header from './components/Header'
import { GlobalStyle } from './styles/globals'
import './styles/globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  return (
    <html lang='en'>
      <body>
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
      </body>
    </html>
  )
}
