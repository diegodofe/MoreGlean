import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'
import db from '../firebase'
import Group, { GroupData } from '../types/groups'

export async function createGroup(groupData: GroupData) {
  const docRef = await addDoc(collection(db, 'groups'), groupData)

  return docRef
}

export async function updateGroupById(
  groupId: string,
  field: string,
  newData: any
) {
  const docRef = doc(db, 'groups', groupId)

  await updateDoc(docRef, {
    [field]: newData,
  })
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

export function listenToGroups({ cb }: { cb: (newGroups: Group[]) => void }) {
  const q = query(collection(db, 'groups'))

  return onSnapshot(q, (querySnapshot) => {
    const groups: Group[] = []
    querySnapshot.forEach((docSnap) => {
      groups.push({ id: docSnap.id, ...docSnap.data() } as unknown as Group)
    })
    cb(groups)
  })
}

export function listenToGroupById({
  groupId,
  cb,
}: {
  groupId: string
  cb: (newGroups: Group) => void
}) {
  return onSnapshot(doc(db, 'groups', groupId), (groupDoc) => {
    cb({ id: groupDoc.id, ...groupDoc.data() } as unknown as Group)
  })
}
