import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'

export default async function getPhotoFromFirebase(location: string) {
  try {
    const imageRef = ref(storage, location)
    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    return undefined
  }
}
