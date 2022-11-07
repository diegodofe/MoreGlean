import { Rate } from 'antd'
import { Button, Heading, Pane, Text } from 'evergreen-ui'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../constants/context'
import { getPhotoUrlByEventId } from '../services/files'
import Event from '../types/events'
import { UserRole } from '../types/users'

export default function EventThumbnail({ event }: { event: Event }) {
  const user = useContext(UserContext)
  const [eventImage, setEventImage] = useState<string>('')

  useEffect(() => {
    getPhotoUrlByEventId(event.id).then(setEventImage)
  }, [event])

  const eventDate = event.date.toDate()

  return (
    <Pane
      display='flex'
      flexDirection='column'
      minWidth={100}
      maxWidth={400}
      background='#fffcf2'
      padding={32}
      borderRadius={8}
      elevation={1}
    >
      <Pane position='relative' width='100%' height={200}>
        <Image
          src={eventImage}
          alt={event.title}
          layout='fill'
          objectFit='cover'
        />
      </Pane>
      <Heading>{event.title}</Heading>
      <Pane display='flex' justifyContent='space-between'>
        <>
          <Rate />
          {user.role === UserRole.GLEANER && (
            <Button marginRight={16} appearance='primary' intent='none'>
              REQUEST
            </Button>
          )}
        </>
      </Pane>

      <Text>
        Location: {event.location.latitude} N Longitude{' '}
        {event.location.longitude} W Latitude
      </Text>
      <Text>
        Date: {eventDate.getMonth()}/{eventDate.getDate()}/
        {eventDate.getFullYear()}
      </Text>
      <Text>
        Time: {eventDate.getHours()}:{eventDate.getMinutes()}0 hours
      </Text>
      <Text>Food Capacity (kg): {event.foodAmount}</Text>
      <Text>Description: {event.description}</Text>
    </Pane>
  )
}
