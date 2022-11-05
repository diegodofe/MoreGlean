import { GeoPoint, Timestamp } from 'firebase/firestore'

export default interface Foodbank {
  id: string
  name: string
  email: string
  pickupCapacity: number
  location: GeoPoint
  maxDistance: number
  startDate: Timestamp
  endDate: Timestamp
}
