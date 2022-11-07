import { FilePicker, Pane } from 'evergreen-ui'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

export default function FileUploader({ id }: { id: string }) {
  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    const imageRef = ref(storage, `images/${id}`)
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
