import { GeoPoint, Timestamp } from 'firebase/firestore'

export default interface Event {
  id: string
  title: string
  date: Timestamp
  foodbankId: string
  foodAmount: number
  location: GeoPoint
  description: string
  groupId: string | undefined
}

export type EventData = Omit<Event, 'id'>
