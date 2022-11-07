import { GeoPoint, Timestamp } from 'firebase/firestore'
import EventThumbnail from '../../components/EventThumbnail'
import Event from '../../types/events'
import User, { UserRole } from '../../types/users'

export default function EventsPage() {
  const fakeEvent: Event = {
    id: 'some-event-id',
    title: 'Happy Farm',
    date: new Timestamp(1667763732, 0),
    image: 'https://picsum.photos/200',
    foodbankId: 'some-food-bank-id',
    foodAmount: 50,
    location: new GeoPoint(45.5, 73.6),
    groupId: 'some-group-id',
  }

  const fakeUser: User = {
    id: '123',
    name: 'john doe',
    email: 'yahoo@yahoo.com',
    photo: 'https://picsum.photos/200',
    acceptedConditions: true,
    role: UserRole.GLEANER,
  }
  return (
    <div>
      <h1>Gleaning Event</h1>
      <EventThumbnail event={fakeEvent} user={fakeUser} />
    </div>
  )
}
