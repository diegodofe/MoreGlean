import { useEffect, useState } from 'react'
import { getPhotoUrlByUserId } from '../services/files'

export default function useUserPhoto({ userId }: { userId: string }) {
  const [userPhoto, setUserPhoto] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userId) return

    setIsLoading(true)
    getPhotoUrlByUserId(userId)
      .then(setUserPhoto)
      .finally(() => setIsLoading(false))
  }, [userId])

  return { userPhoto, isLoading }
}
