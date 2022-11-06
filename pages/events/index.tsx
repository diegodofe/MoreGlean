import { GeoPoint, Timestamp } from 'firebase/firestore'
import EventThumbnail from '../../components/EventThumbnail'
import Event from '../../types/events'

export default function EventsPage() {
  const fakeEvent: Event = {
    id: 'some-event-id',
    title: 'Best Gleaning Job Out There',
    date: new Timestamp(0, 0),
    image: 'https://picsum.photos/200',
    foodbankId: 'some-food-bank-id',
    foodAmount: 50,
    location: new GeoPoint(1, 2),
    groupId: 'some-group-id',
  }

  return (
    <div>
      <h1>Here is one event</h1>
      <EventThumbnail event={fakeEvent} />
    </div>
  )
}
