import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from 'firebase/firestore'
import db from '../firebase'
import Group, { GroupData } from '../types/groups'

export async function createGroup(groupData: GroupData) {
  const docRef = await addDoc(collection(db, 'groups'), groupData)

  return docRef
}

export async function getGroupByDocRef(
  groupRef: DocumentReference<DocumentData>
) {
  const docSnap = await getDoc(groupRef)

  if (!docSnap.exists()) return undefined

  const group: Group = { id: docSnap.id, ...docSnap.data() } as unknown as Group

  return group
}

export async function getGroupById(groupId: string) {
  const docRef = doc(db, 'groups', groupId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const group: Group = { id: docSnap.id, ...docSnap.data() } as unknown as Group

  return group
}
