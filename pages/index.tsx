import { Button, Heading, Pane } from 'evergreen-ui'
import Head from 'next/head'
import Link from 'next/link'

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

          <Link href='/register'>
            <Button appearance='link'>Register as a Food Bank</Button>
          </Link>

          <Link href='/users'>
            <Button appearance='link'>View all users</Button>
          </Link>
          <Link href='/createEvent'>
            <Button appearance='link'>Create Event</Button>
          </Link>
        </Pane>
      </Pane>
    </>
  )
}
