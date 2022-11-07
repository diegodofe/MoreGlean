import { useEffect, useState } from 'react'
import { getAllFoodbanks } from '../services/foodbank'
import Foodbank from '../types/foodbanks'

export default function useFoodbanks() {
  const [banks, setBanks] = useState<Foodbank[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
    getAllFoodbanks()
      .then(setBanks)
      .finally(() => setIsLoading(true))
  }, [])

  return { banks, isLoading }
}
