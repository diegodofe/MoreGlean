import { Rate } from 'antd'
import { Button, Heading, Pane, Text } from 'evergreen-ui'
import Image from 'next/image'
import Event from '../types/events'
import User, { UserRole } from '../types/users'

export default function EventThumbnail({
  event,
  user,
}: {
  event: Event
  user: User
}) {
  const eventDate = event.date.toDate()

  return (
    <Pane
      display='flex'
      flexDirection='column'
      minWidth={100}
      maxWidth={400}
      style={{ color: '#90EE90' }}
    >
      <Image src={event.image} alt={event.title} width={300} height={200} />
      <Heading>Farm Name: {event.title}</Heading>
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
        Time: {eventDate.getHours()}:{eventDate.getMinutes()}
      </Text>
      <Text>Number of People Going: 33 </Text>
      <Text>Food Capacity (kg): {event.foodAmount}</Text>
      <br />
      <Text>
        Description: Come and help out this farm. Products to glean include
        tomatoes, potatoes, squash, and cucumbers. Your help is greatly
        appreciated. This farm is easily accessible. All gleaners all welcome!,
      </Text>
    </Pane>
  )
}
