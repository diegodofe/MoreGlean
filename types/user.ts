export default interface User {
  id: string
  name: string
  email: string
  acceptedConditions: boolean
  role: UserRole
}

export enum UserRole {
  GLEANER = 'gleaner',
  FARMER = 'farmer',
}

export type UserData = Omit<User, 'id'>
