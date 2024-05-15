import type { AppProps } from "next/app";
import { useState } from "react";
import { ContextoFavoritosProvider } from "../context-personajes/contexto-personaje";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { defaultTheme, lightTheme } from "../styles/themes/default";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GlobalStyle } from "../styles/globals";
import '../styles/globals.css';


export default function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <ContextoFavoritosProvider>
      <ThemeProvider theme={isDarkTheme ? defaultTheme : lightTheme}>
        <>
          <Header
            esOscuroTemas={isDarkTheme}
            setIsOscuroTemas={setIsDarkTheme}
          />
          <Component {...pageProps} />
          <Footer />
        </>
        <ToastContainer />
        <GlobalStyle />
      </ThemeProvider>
    </ContextoFavoritosProvider>
  );
}
