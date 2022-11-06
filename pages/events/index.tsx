import { Button, Pane } from 'evergreen-ui'
import { signOut } from 'firebase/auth'
import router from 'next/router'
import { auth } from '../../firebase'

export default function EventsPage() {
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully')
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Pane>
      <div>here are all the events!</div>

      <Button appearance='primary' onClick={handleLogout}>
        Sign out from Google
      </Button>
    </Pane>
  )
}
