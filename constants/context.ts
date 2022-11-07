import { createContext } from 'react'
import User from '../types/users'

const UserContext = createContext<User>(undefined!)

export default UserContext
