import { useEffect, useState } from 'react'
import { getFoodbankById } from '../services/foodbank'
import Foodbank from '../types/foodbanks'

export default function useFoodbanks({ foodbankId }: { foodbankId: string }) {
  const [bank, setBank] = useState<Foodbank>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!foodbankId) return

    setIsLoading(true)
    getFoodbankById(foodbankId)
      .then(setBank)
      .finally(() => setIsLoading(false))
  }, [foodbankId])

  return { bank, isLoading }
}
