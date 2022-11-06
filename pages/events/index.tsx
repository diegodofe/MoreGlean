import { Button, Pane } from 'evergreen-ui'
import { signOut } from 'firebase/auth'
import router from 'next/router'
import { useEffect } from 'react'
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

  const authStateChangedHandler = async (authState: any) => {
    if (!authState) {
      console.log('User is not logged in')
      // redirect the user to sign up page
      router.push('/')
    } else {
      console.log('Welcome back')
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChangedHandler)

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Pane>
      <div>here are all the events!</div>

      <Button appearance='primary' onClick={handleLogout}>
        Sign out from Google
      </Button>
    </Pane>
  )
}
