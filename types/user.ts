import { UserRole } from '../constants'

export interface User {
  id: string
  name: string
  email: string
  acceptedConditions: boolean
  role: UserRole
}
