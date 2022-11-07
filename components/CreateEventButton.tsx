import { DatePicker, InputNumber } from 'antd'
import {
  Button,
  Dialog,
  FilePicker,
  Heading,
  Pane,
  Select,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import { GeoPoint, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { MAX_LAT, MAX_LONG, MIN_LAT, MIN_LONG } from '../constants/location'
import { storage } from '../firebase'
import useFoodbanks from '../hooks/useFoodbanks'
import { createEvent, getEventByDocRef } from '../services/event'
import { DateValue } from '../types/dates'
import { EventData } from '../types/events'

export default function CreateEventButton() {
  const [isCreateEventShown, setIsCreateEventShown] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [foodbankId, setFoodbankId] = useState('')
  const [foodAmount, setFoodAmount] = useState(0)
  const [date, setDate] = useState<DateValue>()
  const [file, setFile] = useState<File>()
  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)
  const [description, setDescription] = useState('')

  const { banks } = useFoodbanks()

  const availableBanks = banks.filter(
    (bank) =>
      bank.pickupCapacity >= foodAmount &&
      date &&
      new Timestamp(date.unix(), 0) > bank.startDate &&
      new Timestamp(date.unix(), 0) < bank.endDate
  )

  // File upload
  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    setFile(newFile)
  }

  const handleSubmit = async () => {
    if (!date || !foodbankId) return
    const eventDate = date.unix()

    const data: EventData = {
      title: eventTitle,
      date: new Timestamp(eventDate, 0),
      foodbankId,
      foodAmount,
      location: new GeoPoint(lat, long),
      description,
      groupId: undefined,
    }

    // File upload
    const createdEvent = await getEventByDocRef(await createEvent(data))
    if (!file) {
      toaster.warning('Event picture missing')
    } else {
      const userFileLocation = `images/events/${createdEvent?.id}`
      const imageRef = ref(storage, userFileLocation)
      uploadBytes(imageRef, file)
    }
    setIsCreateEventShown(false)
  }

  const handleSetFoodAmount = (amount: number | null) => {
    if (amount) setFoodAmount(amount)
  }

  const handleSetLong = (amount: number | null) => {
    if (amount) setLong(amount)
  }

  const handleSetLat = (amount: number | null) => {
    if (amount) setLat(amount)
  }

  return (
    <>
      <Button onClick={() => setIsCreateEventShown(true)}>Create Event</Button>
      <Dialog
        isShown={isCreateEventShown}
        title='Create an event'
        onCloseComplete={() => setIsCreateEventShown(false)}
        confirmLabel='Create'
        onConfirm={handleSubmit}
      >
        <Pane display='flex' flexDirection='column' gap={8}>
          <TextInputField
            required
            label='Event title'
            onChange={(e: any) => setEventTitle(e.target.value)}
            value={eventTitle}
            placeholder='Set a name for your gleaning event!'
          />

          <TextInputField
            required
            label='Farm description'
            onChange={(e: any) => setDescription(e.target.value)}
            value={eventTitle}
            placeholder='Say something about your farm!'
          />

          <Heading size={400}>Select foodbank for pickup</Heading>
          <Select
            value={foodbankId}
            onChange={(event) => setFoodbankId(event.target.value as string)}
          >
            {availableBanks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </Select>

          <Heading size={400}>Farm location (latitude)</Heading>
          <InputNumber
            min={MIN_LAT}
            max={MAX_LAT}
            defaultValue={50}
            onChange={handleSetLat}
            value={lat}
          />
          <Heading size={400}>Farm location (longitude)</Heading>
          <InputNumber
            min={MIN_LONG}
            max={MAX_LONG}
            defaultValue={50}
            onChange={handleSetLong}
            value={long}
          />

          <Heading size={400}>Amount of food (kg)</Heading>
          <InputNumber
            min={1}
            defaultValue={50}
            onChange={handleSetFoodAmount}
          />

          <Heading size={400}>Date</Heading>
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            onChange={setDate}
            value={date}
          />

          <Heading size={400}>Farm photo</Heading>
          <FilePicker
            multiple
            onChange={handleSelectFile}
            placeholder='Place your farm picture here!'
          />
        </Pane>
      </Dialog>
    </>
  )
}
