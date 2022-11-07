/* eslint-disable react/jsx-props-no-spreading */
import { GoogleCircleFilled } from '@ant-design/icons'
import { Popover } from 'antd'
import 'antd/dist/antd.css'
import {
  Avatar,
  Badge,
  Button,
  Heading,
  HomeIcon,
  Pane,
  PeopleIcon,
  Spinner,
  Tab,
  Tablist,
  Text,
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
import React, { useContext, useEffect, useState } from 'react'
import CreateEventTab from '../components/CreateEventTab'
import CreateGroupTab from '../components/CreateGroupTab'
import FoodBankForm from '../components/FoodBankForm'
import GroupNav from '../components/GroupNav'
import SignUpForm from '../components/SignUpForm'
import { BACKGROUND_BEIGE } from '../constants/colors'
import UserContext from '../constants/context'
import { GROUPS, HOME } from '../constants/routes'
import { auth } from '../firebase'
import useUserPhoto from '../hooks/useUserPhoto'
import mainLogo from '../public/android-chrome-192x192.png'
import { getUserById } from '../services/users'
import '../styles/globals.css'
import User, { UserRole } from '../types/users'

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
      background={BACKGROUND_BEIGE}
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

  if (!user) {
    return (
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Pane
            display='flex'
            minHeight='100vh'
            alignItems='center'
            justifyContent='center'
            background={BACKGROUND_BEIGE}
          >
            <SignUpForm currentFirebaseUser={firebaseUser} setUser={setUser} />
          </Pane>
        </motion.div>
      </AnimatePresence>
    )
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function Layout({ children }: { children: React.ReactElement }) {
  const user = useContext(UserContext)
  const { userPhoto } = useUserPhoto({ userId: user.id })
  const router = useRouter()

  const isFarmer = user.role === UserRole.FARMER

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
        <Pane padding={16} position='sticky' top={0} alignSelf='flex-start'>
          <Pane marginBottom={32}>
            <Image
              src={mainLogo}
              alt='MoreGlean-Logo'
              width={100}
              height={100}
            />
          </Pane>

          <Tablist display='flex' flexDirection='column' gap={32}>
            <Tab
              id='Home'
              direction='vertical'
              onSelect={() => router.push(HOME)}
              aria-controls='panel-Home'
            >
              <Pane display='flex' alignItems='center' gap={8}>
                <HomeIcon size={24} /> <Text>Home</Text>
              </Pane>
            </Tab>

            <Tab
              id='Group'
              direction='vertical'
              onSelect={() => router.push(GROUPS)}
              aria-controls='panel-Group'
            >
              <Pane display='flex' alignItems='center' gap={8}>
                <PeopleIcon size={24} /> <Text>Group</Text>
              </Pane>
            </Tab>

            <CreateGroupTab />

            {isFarmer ? <CreateEventTab /> : null}

            <Popover
              placement='right'
              title='Account settings'
              content={<Button onClick={handleLogout}>Log out</Button>}
              trigger='click'
            >
              <Pane
                display='flex'
                alignItems='center'
                gap={8}
                hoverElevation={1}
                padding={8}
                borderRadius={8}
                cursor='pointer'
              >
                <Avatar src={userPhoto} name={user.name} size={48} />
                <Text>Profile</Text>
                <Badge color={isFarmer ? 'orange' : 'green'}>{user.role}</Badge>
              </Pane>
            </Popover>
          </Tablist>
        </Pane>
      </Pane>

      {/** PAGE CONTENT */}
      <Pane flex={1} display='flex' justifyContent='center'>
        {children}
      </Pane>

      {/** GROUP NAV BAR */}
      <Pane padding={16} position='sticky' top={0} alignSelf='flex-start'>
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
