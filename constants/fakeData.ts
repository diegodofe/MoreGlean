import { UserRole } from '../types/users'

const firstNames = ['James', 'Nick', 'Abby', 'Chris', 'Alexa', 'Sam', 'Donna']

const lastNames = ['Smith', 'Barlowe', 'Hart', 'Laurier', 'Whitlock']

const groupNames = [
  'The gleaners',
  'Dream Team',
  'MoreGlean Stanley Group',
  'Clean Team',
]

const foodbankNames = [
  'Food org',
  'Big food org',
  'Small food org',
  'Medium food org',
  'Huge food org',
  'Tiny food org',
]

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

export function getRandomGroupName() {
  return groupNames[Math.floor(Math.random() * groupNames.length)]
}

export function getRandomFoodbankName() {
  return foodbankNames[Math.floor(Math.random() * foodbankNames.length)]
}
