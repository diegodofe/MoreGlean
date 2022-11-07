import { useEffect, useState } from 'react'
import { listenToGroupById } from '../services/group'
import Group from '../types/groups'

export default function useGroup({ groupId }: { groupId: string | undefined }) {
  const [group, setGroup] = useState<Group>()

  useEffect(() => {
    if (!groupId) return undefined

    return listenToGroupById({ groupId, cb: setGroup })
  }, [groupId])

  return { group }
}
