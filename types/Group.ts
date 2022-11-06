import { GeoPoint } from 'firebase/firestore'

export interface Group {
  id: string
  name: string
  location: GeoPoint
  rating: number
  photo: string
  ownerId: string
  members: string[]
  memberCount: number
}

export type GroupData = Omit<Group, 'id'>
