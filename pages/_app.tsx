/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css'
import {
  Button,
  Heading,
  Pane,
  Spinner,
  Tab,
  Tablist,
  toaster,
} from 'evergreen-ui'
import {
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import GroupNav from '../components/GroupNav'
import SignUpForm from '../components/SignUpForm'
import UserContext from '../constants/context'
import { GROUPS, HOME } from '../constants/routes'
import { auth } from '../firebase'
import { getUserById } from '../services/users'
import '../styles/globals.css'
import User from '../types/users'

function LandingPage() {
  const router = useRouter()
  const googleAuth = new GoogleAuthProvider()

  const handleLogin = async () => {
    await signInWithPopup(auth, googleAuth)
      .then(async (result) => {
        const uid = result?.user?.uid
        if (!uid) return
        const userInFirestore = await getUserById(uid)
        if (userInFirestore) router.push('/')
      })
      .catch((error) => {
        console.error('Error message', error)
        toaster.warning('Sign in aborted')
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User>()
  const [isUserLoading, setIsUserLoading] = useState(false)

  useEffect(() => {
    if (!firebaseUser) return
    setIsUserLoading(true)
    getUserById(firebaseUser.uid)
      .then(setUser)
      .finally(() => setIsUserLoading(false))
  }, [firebaseUser])

  useEffect(() => auth.onAuthStateChanged(setFirebaseUser), [])

  if (!firebaseUser) return <LandingPage />

  if (isUserLoading) return <Spinner marginX='auto' />

  if (!user)
    return <SignUpForm currentFirebaseUser={firebaseUser} setUser={setUser} />

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function Layout({ children }: { children: React.ReactElement }) {
  const router = useRouter()

  interface NavItem {
    name: string
    location: string
  }

  const navItems: NavItem[] = [
    {
      name: 'Home',
      location: HOME,
    },
    {
      name: 'Groups',
      location: GROUPS,
    },
    {
      name: 'Test',
      location: '/test',
    },
  ]

  return (
    <Pane display='flex' minHeight='100vh'>
      {/** NAV BAR */}
      <Pane borderRight>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {navItems.map((item) => (
            <Tab
              key={item.name}
              id={item.name}
              direction='vertical'
              onSelect={() => router.push(item.location)}
              aria-controls={`panel-${item.name}`}
            >
              {item.name}
            </Tab>
          ))}
        </Tablist>
        {/* <Avatar src = getPhotoFromFirebase={} */}
      </Pane>

      {/** PAGE CONTENT */}
      <Pane flex={1}>{children}</Pane>

      {/** NAV BAR */}
      <Pane borderLeft>
        <GroupNav />
      </Pane>
    </Pane>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticateUser>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthenticateUser>
  )
}

export default MyApp
