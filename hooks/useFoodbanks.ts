import { useEffect, useState } from 'react'
import { listenToFoodbanks } from '../services/foodbank'
import Foodbank from '../types/foodbanks'

export default function useFoodbanks() {
  const [banks, setBanks] = useState<Foodbank[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   setIsLoading(false)
  //   getAllFoodbanks()
  //     .then(setBanks)
  //     .finally(() => setIsLoading(true))
  // }, [])

  useEffect(
    () =>
      listenToFoodbanks({
        cb: (newFoodbanks) => {
          setBanks(newFoodbanks)
          setIsLoading(false)
        },
      }),
    []
  )

  return { banks, isLoading }
}
