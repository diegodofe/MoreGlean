import { Button } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import UserThumbnail from '../components/UserThumbnail'
import { RONALDO_DOC_ID } from '../constants/users'
import { getUserById } from '../services/users'
import User from '../types/user'

export async function getServerSideProps() {
  const welcomeUser = await getUserById(RONALDO_DOC_ID)

  return { props: { welcomeUser } }
}

export default function Home({ welcomeUser }: { welcomeUser: User }) {
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
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
          Welcome to MoreGlean!
        </h1>

        <Button type='primary'>hello</Button>
        <Link href='/signup'>Sign Up Here!</Link>
        <UserThumbnail user={welcomeUser} />
      </motion.div>
    </AnimatePresence>
  )
}
