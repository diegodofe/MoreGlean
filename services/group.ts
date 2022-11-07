import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore'
import db from '../firebase'
import Group, { GroupData, GroupMember } from '../types/groups'

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

export async function getGroupMembersByGroupId(groupId: string) {
  const members: GroupMember[] = []

  try {
    const q = query(collection(db, `groups/${groupId}/members`))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((memberDoc) =>
      members.push({
        id: memberDoc.id,
        ...memberDoc.data(),
      } as unknown as GroupMember)
    )
  } catch (error) {
    console.log(error)
  }

  return members
}
