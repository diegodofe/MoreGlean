import { GeoPoint, Timestamp } from 'firebase/firestore'

export default interface Event {
  id: string
  title: string
  date: Timestamp
  image: string
  foodbankId: string
  foodAmount: number
  location: GeoPoint
  groupId: string | undefined
}

export type EventData = Omit<Event, 'id'>
