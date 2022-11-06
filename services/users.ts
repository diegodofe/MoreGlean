import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../firebase'
import User, { UserData } from '../types/user'

export async function createUser(userData: UserData) {
  await addDoc(collection(db, 'users'), userData)
}

export async function getAllUsers() {
  const colRef = collection(db, 'users')
  const colSnap = await getDocs(colRef)

  return colSnap.docs.map((userDoc) => {
    const user: User = { id: userDoc.id, ...userDoc.data() } as unknown as User
    return user
  })
}

export async function getUserById(userId: string) {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const user: User = { id: docSnap.id, ...docSnap.data() } as unknown as User

  return user
}
