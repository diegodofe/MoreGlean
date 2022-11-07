import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import Event from '../types/events'
import User from '../types/users'

export async function getPhotoUrlByUser({ user }: { user: User }) {
  try {
    const location = `images/profiles/${user.id}`
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return ''
  }
}

export async function getPhotoUrlByEvent({ event }: { event: Event }) {
  try {
    const location = `images/events/${event.id}`
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return ''
  }
}
