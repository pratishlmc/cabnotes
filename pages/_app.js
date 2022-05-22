import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider, signIn, signOut } from "next-auth/react"
import Header from '../components/Header'
import { useState, useEffect } from 'react';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
      <Toaster />
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>

  )
}

export default MyApp
