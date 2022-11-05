import { Button } from 'antd'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import UserThumbnail from '../components/UserThumbnail'
import { RONALDO_DOC_ID } from '../constants/users'
import { auth } from '../firebase'
import { getUserById } from '../services/users'
import User from '../types/user'

export async function getServerSideProps() {
  const welcomeUser = await getUserById(RONALDO_DOC_ID)

  return { props: { welcomeUser } }
}

export default function Home(
  this: any,
  { welcomeUser }: { welcomeUser: User }
) {
  const [user, setuser] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth)
    console.log(result)
  }
  useEffect(() => {
    console.log(user)
    console.log(setuser)
  }, [user])
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 1000 }}
      >
        <Head>
          <title>MoreGlean</title>
        </Head>

        <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
          Welcome to MoreGlean!
        </h1>

        <Button type='primary'>hello</Button>
        <Button type='ghost' onClick={login}>
          Sign up with Google
        </Button>
        <div>
          {user
            ? `Welcome to the green glean machine, ${user.displayName}`
            : ''}
        </div>
        <UserThumbnail user={welcomeUser} />
      </motion.div>
    </AnimatePresence>
  )
}
