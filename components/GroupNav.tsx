import { Skeleton } from 'antd'
import {
  Avatar,
  CrownIcon,
  Heading,
  Pane,
  PeopleIcon,
  Text,
} from 'evergreen-ui'
import { useContext } from 'react'
import UserContext from '../constants/context'
import useGroup from '../hooks/useGroup'
import useUser from '../hooks/useUser'
import useUserPhoto from '../hooks/useUserPhoto'

function GroupMemberThumbnail({
  userId,
  isOwner,
}: {
  userId: string
  isOwner: boolean
}) {
  const { user, isLoading: isUserLoading } = useUser({ userId })
  const { userPhoto, isLoading: isPhotoLoading } = useUserPhoto({ userId })

  if (!user) {
    return (
      <Pane display='flex' gap={8} alignItems='center'>
        <Avatar src='' name='???' />
        <Pane display='flex' flexDirection='column' gap={8}>
          <Text>User not found</Text>
        </Pane>
      </Pane>
    )
  }

  if (isPhotoLoading || isUserLoading) return <Skeleton active />

  return (
    <Pane display='flex' gap={8} alignItems='center'>
      <Avatar src={userPhoto} name={user.name} size={48} />
      <Pane display='flex' flexDirection='column' gap={8}>
        <Text fontWeight={600}>{user.name}</Text>
        <Text color='muted'>{user.email}</Text>
      </Pane>

      {isOwner ? <CrownIcon color='warning' /> : null}
    </Pane>
  )
}

export default function GroupNav() {
  const user = useContext(UserContext)

  const { group } = useGroup({ groupId: user.groupId })

  if (!group) return null

  return (
    <Pane display='flex' flexDirection='column' gap={16}>
      <Pane display='flex' gap={8}>
        <Heading>{group.name}</Heading>
        <PeopleIcon />
      </Pane>
      {group.members.map((memberId) => (
        <GroupMemberThumbnail
          key={memberId}
          userId={memberId}
          isOwner={memberId === group.ownerId}
        />
      ))}
    </Pane>
  )
}
