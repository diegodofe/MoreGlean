import { GeoPoint, Timestamp } from 'firebase/firestore'
import EventThumbnail from '../../components/EventThumbnail'
import Event from '../../types/events'

export default function EventsPage() {
  const fakeEvent: Event = {
    id: 'some-event-id',
    title: 'Happy Farm',
    date: new Timestamp(1667763732, 0),
    foodbankId: 'some-food-bank-id',
    foodAmount: 50,
    location: new GeoPoint(45.5, 73.6),
    groupId: 'some-group-id',
  }
  return (
    <div>
      <h1>Gleaning Event</h1>
      <EventThumbnail event={fakeEvent} />
    </div>
  )
}
