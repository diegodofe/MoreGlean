import { Pane } from 'evergreen-ui'
import Head from 'next/head'
import EventThumbnail from '../components/EventThumbnail'
import useEvents from '../hooks/useEvents'

export default function Home() {
  const { events } = useEvents()
  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>

      <Pane display='flex' flexDirection='column' gap={32}>
        {events.map((event) => (
          <EventThumbnail key={event.id} event={event} />
        ))}
      </Pane>
    </>
  )
}
