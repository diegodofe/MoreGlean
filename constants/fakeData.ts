import { UserRole } from '../types/user'

const firstNames = ['James', 'Nick', 'Abby', 'Chris', 'Alexa', 'Sam', 'Donna']

const lastNames = ['Smith', 'Barlowe', 'Hart', 'Laurier', 'Whitlock']

const roles = [UserRole.FARMER, UserRole.GLEANER]

export function getRandomFirstName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)]
}

export function getRandomLastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)]
}

export function getRandomRole() {
  return roles[Math.floor(Math.random() * roles.length)]
}
