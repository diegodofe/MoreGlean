import { useEffect, useState } from 'react'
import { getGroupById } from '../services/group'
import Group from '../types/groups'

export default function useGroup({ groupId }: { groupId: string | undefined }) {
  const [group, setGroup] = useState<Group>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!groupId) return

    setIsLoading(true)
    getGroupById(groupId)
      .then(setGroup)
      .finally(() => setIsLoading(false))
  }, [groupId])

  return { group, isLoading }
}
