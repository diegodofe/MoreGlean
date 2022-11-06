import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Foodbank, FoodbankData } from '../types/foodbank'

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
