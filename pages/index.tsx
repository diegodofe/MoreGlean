import { Pane } from 'evergreen-ui'
import Head from 'next/head'
import { useContext } from 'react'
import CreateEventButton from '../components/CreateEventButton'
import UserContext from '../constants/context'
import { UserRole } from '../types/users'

export default function Home() {
  const user = useContext(UserContext)

  const isFarmer = user.role === UserRole.FARMER

  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>
      <Pane display='flex' flexDirection='column' gap={16} alignItems='center'>
        {isFarmer && <CreateEventButton />}
        hello
      </Pane>
    </>
  )
}
