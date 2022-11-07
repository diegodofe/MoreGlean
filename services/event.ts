import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  query,
} from 'firebase/firestore'
import db from '../firebase'
import Event, { EventData } from '../types/events'

export async function createEvent(eventData: EventData) {
  const newEvent = await addDoc(collection(db, 'events'), {
    ...eventData,
    groupId: null, // Firestore cannot accept undefined for ommited values
  })

  return newEvent
}

export async function getEventById(eventId: string) {
  const docRef = doc(db, 'events', eventId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const event: Event = { id: docSnap.id, ...docSnap.data() } as unknown as Event

  return event
}

export async function getEventByDocRef(
  docRef: DocumentReference<DocumentData>
) {
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return undefined

  const event: Event = { id: docSnap.id, ...docSnap.data() } as unknown as Event

  return event
}

export function listenToEvents({ cb }: { cb: (newEvents: Event[]) => void }) {
  const q = query(collection(db, 'events'))

  return onSnapshot(q, (querySnapshot) => {
    const events: Event[] = []
    querySnapshot.forEach((docSnap) => {
      events.push({ id: docSnap.id, ...docSnap.data() } as unknown as Event)
    })
    cb(events)
  })
}
