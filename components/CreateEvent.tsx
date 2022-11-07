import { DatePicker, Space } from 'antd'
import { Button, FilePicker, Pane, TextInputField, toaster } from 'evergreen-ui'
import { ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../firebase'

type RangeValue = moment.Moment | null

export default function CreateEvent() {
  const [farm, setName] = useState('')
  const [location, setLocation] = useState('')
  const [amount, setCapacity] = useState('')
  const [date, setDate] = useState<RangeValue>(null)
  const [file, setFile] = useState<File>()

  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    setFile(newFile)
  }

  const submitHandler = () => {
    if (!file) {
      toaster.warning('Event picture missing')
      return
    }

    // Update below line to event Id after storing event in Firestore.
    // const userFileLocation = `images/events/${event.id}`
    const userFileLocation = `images/events/testEventPhoto`
    const imageRef = ref(storage, userFileLocation)
    uploadBytes(imageRef, file)

    console.log({ farm, location, amount, date })
  }
  return (
    <Pane>
      <h1>Create an Event</h1>
      <TextInputField
        required
        label='Farm Name'
        onChange={(e: any) => setName(e.target.value)}
        value={farm}
        placeholder='Enter the farm name.'
      />
      <TextInputField
        required
        label='Location'
        onChange={(e: any) => setLocation(e.target.value)}
        value={location}
        placeholder='Enter the location.'
      />
      <TextInputField
        required
        label='Food Capacity in Kg'
        onChange={(e: any) => setCapacity(e.target.value)}
        value={amount}
        placeholder='Enter the food capacity.'
      />
      <Pane marginBottom='10px'>
        <Space direction='vertical' size={12}>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            onChange={setDate}
            value={date}
          />
        </Space>
      </Pane>

      <FilePicker
        multiple
        width={250}
        onChange={handleSelectFile}
        placeholder='Select the file here!'
      />

      <Button appearance='primary' onClick={submitHandler}>
        Submit
      </Button>
    </Pane>
  )
}
