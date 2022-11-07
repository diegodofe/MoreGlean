export default interface User {
  id: string
  name: string
  email: string
  photo: string
  acceptedConditions: boolean
  groupId: string | undefined
  role: UserRole
}

export enum UserRole {
  GLEANER = 'gleaner',
  FARMER = 'farmer',
}

export type UserData = Omit<User, 'id'>
