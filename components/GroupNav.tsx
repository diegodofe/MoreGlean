import { Skeleton } from 'antd'
import { Avatar, Pane, Text } from 'evergreen-ui'
import { useContext } from 'react'
import UserContext from '../constants/context'
import useGroupMembers from '../hooks/useGroup'
import { GroupMember } from '../types/groups'

function GroupMemberThumbnail({ member }: { member: GroupMember }) {
  return (
    <Pane display='flex' gap={8} alignItems='center'>
      <Avatar src='' name={member.name} />
      <Pane display='flex' flexDirection='column' gap={8}>
        <Text>{member.name}</Text>
      </Pane>
    </Pane>
  )
}

function GroupLoader() {
  return (
    <Pane>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Pane>
  )
}

export default function GroupNav() {
  const user = useContext(UserContext)

  const { members, isLoading } = useGroupMembers({ groupId: user.groupId })

  if (members.length === 0) return <Pane>No group</Pane>

  if (isLoading) <GroupLoader />

  return (
    <Pane>
      {members.map((member) => (
        <GroupMemberThumbnail key={member.id} member={member} />
      ))}
    </Pane>
  )
}
