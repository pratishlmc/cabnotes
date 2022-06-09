import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../constants/theme'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  TimeAgo.addDefaultLocale(en)
  return (
    <>
      <SessionProvider session={session}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Toaster />
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>

  )
}

export default MyApp
