import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import User from '../types/users'

export default function FileUploader({ user }: { user: User }) {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return

    const newFile = event.currentTarget.files[0]

    const imageRef = ref(storage, `images/${user.id}`)
    uploadBytes(imageRef, newFile)
  }

  return <input type='file' onChange={handleUpload} />
}
