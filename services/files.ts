import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'

export async function getPhotoUrlByUserId(userId: string) {
  try {
    const location = `images/profiles/${userId}`
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return ''
  }
}

export async function getPhotoUrlByEventId(eventId: string) {
  try {
    const location = `images/events/${eventId}`
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return ''
  }
}

export async function getPhotoUrlByGroupId(groupId: string) {
  try {
    const location = `images/groups/${groupId}`
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return ''
  }
}
