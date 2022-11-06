import { FilePicker, Pane } from 'evergreen-ui'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import User from '../types/users'

export default function FileUploader({ user }: { user: User }) {
  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    const imageRef = ref(storage, `images/${user.id}`)
    uploadBytes(imageRef, newFile)
  }

  return (
    <Pane>
      <FilePicker
        multiple
        width={250}
        onChange={handleSelectFile}
        placeholder='Select the file here!'
      />
    </Pane>
  )
}
