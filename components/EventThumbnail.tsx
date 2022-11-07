import { Rate } from 'antd'
import {
  CalendarIcon,
  Heading,
  HorizontalBarChartIcon,
  IconButton,
  InfoSignIcon,
  Pane,
  Paragraph,
  PeopleIcon,
  SendMessageIcon,
  Text,
  TimeIcon,
} from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../constants/context'
import useGroup from '../hooks/useGroup'
import { getPhotoUrlByEventId } from '../services/files'
import Event from '../types/events'
import { UserRole } from '../types/users'
import LocationMap from './LocationMap'

export default function EventThumbnail({ event }: { event: Event }) {
  const user = useContext(UserContext)
  const [eventImage, setEventImage] = useState<string>('')
  const [viewMap, setViewMap] = useState(false)

  const { group } = useGroup({ groupId: event.groupId })

  useEffect(() => {
    getPhotoUrlByEventId(event.id).then(setEventImage)
  }, [event])

  const eventDate = event.date.toDate()

  return (
    <Pane
      display='flex'
      flexDirection='column'
      minWidth={100}
      maxWidth={500}
      background='#fffcf2'
      borderRadius={8}
      elevation={1}
    >
      <Pane position='relative' width='100%' height={200} overflow='auto'>
        <AnimatePresence>
          {viewMap ? (
            <motion.div
              key={`location-${event.location.latitude}-${event.location.longitude}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LocationMap
                location={
                  new GeoPoint(
                    event.location.latitude,
                    event.location.longitude
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
                src={eventImage}
                alt={event.title}
                layout='fill'
                objectFit='cover'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Pane>

      <Pane padding={16} display='flex' flexDirection='column' gap={8}>
        <Heading>{event.title}</Heading>

        <Pane display='flex' justifyContent='space-between' alignItems='center'>
          <Rate />

          <Pane display='flex' gap={8}>
            <IconButton
              icon={InfoSignIcon}
              onClick={() => setViewMap(!viewMap)}
            />
            {user.role === UserRole.GLEANER && (
              <IconButton icon={SendMessageIcon} />
            )}
          </Pane>
        </Pane>

        <Pane display='flex' alignItems='center' gap={8}>
          <CalendarIcon color='muted' fontSize={16} />
          <Text>
            Date: {eventDate.getMonth()}/{eventDate.getDate()}/
            {eventDate.getFullYear()}
          </Text>
        </Pane>

        <Pane display='flex' alignItems='center' gap={8}>
          <TimeIcon color='muted' fontSize={16} />
          <Text>
            Time: {eventDate.getHours()}:{eventDate.getMinutes()}0 hours
          </Text>
        </Pane>

        <Pane display='flex' alignItems='center' gap={8}>
          <HorizontalBarChartIcon color='muted' fontSize={16} />
          <Text>Food Capacity: {event.foodAmount} kg</Text>
        </Pane>

        <Pane display='flex' alignItems='center' gap={8}>
          <PeopleIcon color='muted' fontSize={16} />
          <Text>Going: {group?.members ? group?.members.length : 0}</Text>
        </Pane>

        <Paragraph>{event.description}</Paragraph>
      </Pane>
    </Pane>
  )
}
