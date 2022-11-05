import { GeoPoint } from 'firebase/firestore'

export default interface Group {
  id: string
  name: string
  location: GeoPoint
  rating: number
  photo: string
  ownerId: string
  members: string[]
  memberCount: number
}
