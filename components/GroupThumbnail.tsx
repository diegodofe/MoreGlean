import { Rate } from 'antd'
import { Button, Heading, Pane } from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../constants/context'
import { getPhotoUrlByGroupId } from '../services/files'
import Group from '../types/groups'
import { UserRole } from '../types/users'
import LocationMap from './LocationMap'

export default function GroupThumbnail({ group }: { group: Group }) {
  const user = useContext(UserContext)
  const [groupImage, setGroupImage] = useState<string>('')

  useEffect(() => {
    getPhotoUrlByGroupId(group.id).then(setGroupImage)
  }, [group])

  return (
    <Pane
      display='flex'
      flexDirection='column'
      minWidth={400}
      maxWidth={400}
      background='#fffcf2'
      padding={32}
      borderRadius={8}
      elevation={1}
    >
      <Pane position='relative' width='100%' height={200}>
        <Image
          src={groupImage}
          alt={group.name}
          layout='fill'
          objectFit='cover'
        />
      </Pane>
      <Heading>{group.name}</Heading>
      <Pane display='flex' justifyContent='space-between'>
        <>
          {user.role === UserRole.FARMER && <Rate />}
          {user.role === UserRole.GLEANER && (
            <Button marginRight={16} appearance='primary' intent='none'>
              Join Group
            </Button>
          )}
        </>
      </Pane>

      <LocationMap
        location={
          new GeoPoint(group.location.latitude, group.location.longitude)
        }
      />
    </Pane>
  )
}
