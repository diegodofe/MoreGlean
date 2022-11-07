import { Skeleton } from 'antd'
import { Avatar, Pane, Text } from 'evergreen-ui'
import { useContext } from 'react'
import UserContext from '../constants/context'
import useGroup from '../hooks/useGroup'
import useUser from '../hooks/useUser'
import useUserPhoto from '../hooks/useUserPhoto'

function GroupMemberThumbnail({ userId }: { userId: string }) {
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
      <Avatar src={userPhoto} name={user.name} />
      <Pane display='flex' flexDirection='column' gap={8}>
        <Text>{user.name}</Text>
      </Pane>
    </Pane>
  )
}

export default function GroupNav() {
  const user = useContext(UserContext)

  const { group } = useGroup({ groupId: user.groupId })

  if (!group) return <Pane>Join a group!</Pane>

  return (
    <Pane>
      {group.members.map((memberId) => (
        <GroupMemberThumbnail key={memberId} userId={memberId} />
      ))}
    </Pane>
  )
}
