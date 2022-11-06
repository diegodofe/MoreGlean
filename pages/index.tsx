import { Button, Heading, Pane } from 'evergreen-ui'
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
      <Pane display='flex' flexDirection='column' gap={16}>
        <Heading size={700}>Welcome to MoreGlean!</Heading>

        <Pane display='flex' gap={8}>
          <Button appearance='primary' onClick={handleLogin}>
            Sign in with Google
          </Button>

          <Link href='/create'>
            <Button appearance='link'>Create Data</Button>
          </Link>

          <Link href='/signup'>
            <Button appearance='link'>Sign up</Button>
          </Link>

          <Link href='/register'>
            <Button appearance='link'>Register as a Food Bank</Button>
          </Link>

          <Link href='/users'>
            <Button appearance='link'>View all users</Button>
          </Link>
        </Pane>
      </Pane>
    </>
  )
}
