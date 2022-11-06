import { Button } from 'antd'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { getUserById } from '../services/users'

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()

  const handleLogin = async () => {
    await signInWithPopup(auth, googleAuth)
      .then(async (result) => {
        console.log('Sign in response', result)

        console.log('Current user', user)

        const authUser = auth.currentUser
        const uid = authUser?.uid
        if ((await getUserById(uid!)) !== undefined) {
          router.push('/events')
        } else {
          router.push('/signup')
        }
      })
      .catch((error) => {
        console.log('Error message', error)
      })
  }

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

        <Link href='/signup'>
          <Button type='link'>Sign up</Button>
        </Link>

        <Link href='/register'>
          <Button type='link'>Register as a Food Bank</Button>
        </Link>

        <Link href='/users'>
          <Button type='link'>View all users</Button>
        </Link>
      </div>
    </>
  )
}
