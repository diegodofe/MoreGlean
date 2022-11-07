import { Rate } from 'antd'
import {
  Button,
  Heading,
  IconButton,
  InfoSignIcon,
  Pane,
  PeopleIcon,
  PlusIcon,
  Text,
  toaster,
} from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../constants/context'
import { getPhotoUrlByGroupId } from '../services/files'
import { updateUserById } from '../services/users'
import Group from '../types/groups'
import { UserRole } from '../types/users'
import LocationMap from './LocationMap'

export default function GroupThumbnail({ group }: { group: Group }) {
  const user = useContext(UserContext)
  const [groupImage, setGroupImage] = useState<string>('')
  const [viewMap, setViewMap] = useState(false)

  const isFarmer = user.role === UserRole.FARMER

  const handleJoinGroup = () => {
    updateUserById(user.id, 'groupId', group.id).then(() =>
      toaster.success(`Joined ${group.name} `)
    )
  }

  useEffect(() => {
    getPhotoUrlByGroupId(group.id).then(setGroupImage)
  }, [group])

  return (
    <Pane
      display='flex'
      flexDirection='column'
      width={500}
      background='#fffcf2'
      borderRadius={8}
      elevation={1}
    >
      <Pane position='relative' width='100%' height={200} overflow='auto'>
        <AnimatePresence>
          {viewMap ? (
            <motion.div
              key={`location-${group.location.latitude}-${group.location.longitude}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LocationMap
                location={
                  new GeoPoint(
                    group.location.latitude,
                    group.location.longitude
                  )
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key='modal'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={groupImage}
                alt={group.name}
                layout='fill'
                objectFit='cover'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Pane>

      <Pane padding={16} display='flex' flexDirection='column' gap={8}>
        <Heading>{group.name}</Heading>
        <Pane display='flex' justifyContent='space-between'>
          <Rate defaultValue={3} />

          <Pane>
            {!isFarmer && (
              <Button
                marginRight={16}
                iconBefore={PlusIcon}
                intent='none'
                onClick={handleJoinGroup}
              >
                Join Group
              </Button>
            )}
            <IconButton
              icon={InfoSignIcon}
              onClick={() => setViewMap(!viewMap)}
            />
          </Pane>
        </Pane>

        <Pane display='flex' alignItems='center' gap={8}>
          <PeopleIcon color='muted' fontSize={16} />
          <Text>Members: {group.members.length}</Text>
        </Pane>
      </Pane>
    </Pane>
  )
}
