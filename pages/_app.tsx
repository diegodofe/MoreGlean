/* eslint-disable react/jsx-props-no-spreading */
import { GoogleCircleFilled } from '@ant-design/icons'
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
  signOut,
  User as FirebaseUser,
} from 'firebase/auth'
import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import FoodBankForm from '../components/FoodBankForm'
import GroupNav from '../components/GroupNav'
import SignUpForm from '../components/SignUpForm'
import UserContext from '../constants/context'
import { GROUPS, HOME } from '../constants/routes'
import { auth } from '../firebase'
import mainLogo from '../public/android-chrome-512x512.png'
import { getUserById } from '../services/users'
import '../styles/globals.css'
import User from '../types/users'

function LandingPage() {
  const [ShowFoodBankForm, setShowFoodBankForm] = useState(false)
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
    <Pane
      background='beige'
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      minWidth='100vw'
      padding={16}
    >
      <Pane
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={16}
        flexWrap='wrap'
      >
        <Image src={mainLogo} alt='MoreGlean-Logo' width={300} height={300} />
        <Pane
          display='flex'
          flexDirection='column'
          width={400}
          background='white'
          alignItems='center'
          padding={32}
          borderRadius={8}
          elevation={1}
          gap={24}
        >
          <Heading size={900}>MoreGlean</Heading>
          <Button
            appearance='primary'
            onClick={handleLogin}
            width='100%'
            iconBefore={<GoogleCircleFilled style={{ fontSize: 20 }} />}
          >
            Sign in with Google
          </Button>
          <Button
            appearance='minimal'
            width='100%'
            onClick={() => setShowFoodBankForm(!ShowFoodBankForm)}
          >
            Register a foodbank
          </Button>

          {ShowFoodBankForm ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FoodBankForm />
              </motion.div>
            </AnimatePresence>
          ) : null}
        </Pane>
      </Pane>
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
  ]

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
          <Button appearance='primary' onClick={handleLogout}>
            Sign out from Google
          </Button>
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
