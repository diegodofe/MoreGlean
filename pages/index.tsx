import { Button } from 'antd'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleAuth)

    console.log('Sign in response', result)

    router.push('/events')
  }
  useEffect(() => {
    console.log('Current user', user)
  }, [user])

  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
          Welcome to MoreGlean!
        </h1>

        <Button type='primary' onClick={handleLogin}>
          Sign in with Google
        </Button>

        <Link href='/create'>
          <Button type='link'>Create Data</Button>
        </Link>
      </div>
    </>
  )
}
