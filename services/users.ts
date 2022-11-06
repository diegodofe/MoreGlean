import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import db, { storage } from '../firebase'
import User from '../types/user'

export async function getAllUsers() {
  return []
}

export async function getUserById(userId: string) {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const user: User = { id: docSnap.id, ...docSnap.data() } as unknown as User

  return user
}

export async function getUserPhotoUrlById(userId: string) {
  try {
    const imageRef = ref(storage, `images/${userId}`)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return undefined
  }
}
