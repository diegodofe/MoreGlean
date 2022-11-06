import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Event, EventData } from '../types/event'

export async function createEvent(eventData: EventData) {
  await addDoc(collection(db, 'events'), {
    ...eventData,
    groupId: null, // Firestore cannot accept undefined for ommited values
  })
}

export async function getEventById(eventId: string) {
  const docRef = doc(db, 'events', eventId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const event: Event = { id: docSnap.id, ...docSnap.data() } as unknown as Event

  return event
}
