import { Button, Heading, Pane } from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import LocationMap from '../components/LocationMap'

export default function Home() {
  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>
      <Pane display='flex' flexDirection='column' gap={16}>
        <Heading size={700}>Welcome to MoreGlean!</Heading>

        <Pane display='flex' gap={8}>
          <Link href='/create'>
            <Button appearance='link'>Create Data</Button>
          </Link>

          <Link href='/signup'>
            <Button appearance='link'>Sign up</Button>
          </Link>

          <Link href='/users'>
            <Button appearance='link'>View all users</Button>
          </Link>

          <LocationMap location={new GeoPoint(45.5019, -73.5674)} />
        </Pane>
      </Pane>
    </>
  )
}
