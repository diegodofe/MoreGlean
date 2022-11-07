import { Heading, Pane } from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import Head from 'next/head'
import LocationMap from '../components/LocationMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>
      <Pane display='flex' flexDirection='column' gap={16}>
        <Heading size={700}>Welcome to MoreGlean!</Heading>

        <LocationMap location={new GeoPoint(45.5019, -73.5674)} />
      </Pane>
    </>
  )
}
