import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import Group, { GroupData } from '../types/group'

export async function createGroup(groupData: GroupData) {
  await addDoc(collection(db, 'groups'), groupData)
}

export async function getGroupById(groupId: string) {
  const docRef = doc(db, 'groups', groupId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const group: Group = { id: docSnap.id, ...docSnap.data() } as unknown as Group

  return group
}
