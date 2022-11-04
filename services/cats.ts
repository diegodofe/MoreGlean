import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../firebase'
import Cat from '../types/cat'

export async function getCats() {
  const catCollection = collection(db, 'cats')
  const catSnapshot = await getDocs(catCollection)
  return catSnapshot.docs.map((catDoc) => {
    const cat = { id: catDoc.id, ...catDoc.data() } as unknown as Cat
    return cat
  })
}

export async function getCatById(catId: string) {
  const docRef = doc(db, 'cats', catId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const cat: Cat = { id: docSnap.id, ...docSnap.data() } as unknown as Cat

  return cat
}
