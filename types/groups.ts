import { GeoPoint } from 'firebase/firestore'

export default interface Group {
  id: string
  name: string
  location: GeoPoint
  rating: number
  ownerId: string
  members: string[]
  memberCount: number
}

export type GroupData = Omit<Group, 'id'>
