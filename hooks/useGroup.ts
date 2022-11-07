import { useEffect, useState } from 'react'
import { getGroupMembersByGroupId } from '../services/group'
import { GroupMember } from '../types/groups'

export default function useGroupMembers({
  groupId,
}: {
  groupId: string | undefined
}) {
  const [members, setMembers] = useState<GroupMember[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!groupId) return

    setIsLoading(true)
    getGroupMembersByGroupId(groupId)
      .then(setMembers)
      .finally(() => setIsLoading(false))
  }, [groupId])

  return { members, isLoading }
}
