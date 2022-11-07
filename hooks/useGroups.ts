import { useEffect, useState } from 'react'
import { listenToGroups } from '../services/group'
import Group from '../types/groups'

export default function useGroups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    () =>
      listenToGroups({
        cb: (newGroups) => {
          setGroups(newGroups)
          setIsLoading(false)
        },
      }),
    []
  )

  return { groups, isLoading }
}
