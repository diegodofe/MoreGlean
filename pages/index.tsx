import { Pane } from 'evergreen-ui'
import Head from 'next/head'
import { useContext } from 'react'
import CreateEventTab from '../components/CreateEventTab'
import EventThumbnail from '../components/EventThumbnail'
import UserContext from '../constants/context'
import useEvents from '../hooks/useEvents'
import { UserRole } from '../types/users'

export default function Home() {
  const user = useContext(UserContext)
  const { events } = useEvents()
  const isFarmer = user.role === UserRole.FARMER

  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>

      <Pane>
        {isFarmer && <CreateEventTab />}
        <Pane display='flex' flexDirection='column' gap={32}>
          {events.map((event) => (
            <EventThumbnail key={event.id} event={event} />
          ))}
        </Pane>
      </Pane>
    </>
  )
}
