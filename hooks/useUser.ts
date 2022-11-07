import { useEffect, useState } from 'react'
import { getUserById } from '../services/users'
import User from '../types/users'

export default function useUser({ userId }: { userId: string }) {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userId) return

    setIsLoading(true)
    getUserById(userId)
      .then(setUser)
      .finally(() => setIsLoading(false))
  }, [userId])

  return { user, isLoading }
}
