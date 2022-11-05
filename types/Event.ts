import { GeoPoint, Timestamp } from 'firebase/firestore'

export default interface Event {
  id: string
  title: string
  date: Timestamp
  foodbankId: string
  foodAmount: number
  location: GeoPoint
  groupId: string | undefined
}
