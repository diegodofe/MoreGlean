import { GeoPoint } from 'firebase/firestore'

export default interface Group {
  id: string
  name: string
  location: GeoPoint
  ownerId: string
  members: string[]
}

export type GroupData = Omit<Group, 'id'>
