/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css'
import { Button, Heading, Pane } from 'evergreen-ui'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { auth } from '../firebase'
import { getUserById } from '../services/users'
import '../styles/globals.css'

function LandingPage() {
  const router = useRouter()
  const googleAuth = new GoogleAuthProvider()

  const handleLogin = async () => {
    await signInWithPopup(auth, googleAuth)
      .then(async (result) => {
        const uid = result?.user?.uid

        if (!uid) return

        const userInFirestore = await getUserById(uid)

        if (!userInFirestore) router.push('/signup')
        else router.push('/events')
      })
      .catch((error) => {
        console.log('Error message', error)
      })
  }

  return (
    <Pane>
      <Heading>Welcome</Heading>
      <Button appearance='primary' onClick={handleLogin}>
        Sign in with Google
      </Button>
    </Pane>
  )
}

function AuthenticateUser({ children }: { children: React.ReactElement }) {
  const [authState, setAuthState] = useState<any>()

  useEffect(() => auth.onAuthStateChanged(setAuthState), [])

  if (!authState) return <LandingPage />

  return <Pane>{children}</Pane>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticateUser>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthenticateUser>
  )
}

export default MyApp
