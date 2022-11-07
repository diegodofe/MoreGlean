import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import db from '../firebase'
import Foodbank, { FoodbankData } from '../types/foodbanks'

export async function getFoodbankByCapacity(capacity: number) {
  const q = query(
    collection(db, 'foodbanks'),
    where('pickupCapacity', '>=', capacity)
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((docSnap) => {
    const foodbank: Foodbank = {
      id: docSnap.id,
      ...docSnap.data(),
    } as unknown as Foodbank

    return foodbank
  })
}

export async function createFoodbank(foodbankData: FoodbankData) {
  await addDoc(collection(db, 'foodbanks'), foodbankData)
}

export async function getFoodbankById(FoodbankId: string) {
  const docRef = doc(db, 'foodbanks', FoodbankId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const foodbank: Foodbank = {
    id: docSnap.id,
    ...docSnap.data(),
  } as unknown as Foodbank

  return foodbank
}

export async function getAllFoodbanks() {
  const colRef = collection(db, 'users')
  const colSnap = await getDocs(colRef)

  return colSnap.docs.map((userDoc) => {
    const bank: Foodbank = {
      id: userDoc.id,
      ...userDoc.data(),
    } as unknown as Foodbank
    return bank
  })
}
