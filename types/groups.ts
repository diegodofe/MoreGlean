import { GeoPoint } from 'firebase/firestore'

export default interface Group {
  id: string
  name: string
  location: GeoPoint
  ownerId: string
}

export interface GroupMember {
  id: string
  name: string
}

export type GroupData = Omit<Group, 'id'>
