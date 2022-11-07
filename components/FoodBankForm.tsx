import { DatePicker, InputNumber } from 'antd'
import {
  Button,
  Checkbox,
  Heading,
  Pane,
  TextInput,
  toaster,
} from 'evergreen-ui'
import { GeoPoint, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { MAX_LAT, MAX_LONG, MIN_LAT, MIN_LONG } from '../constants/location'
import { createFoodbank } from '../services/foodbank'
import { RangeValue } from '../types/dates'
import { FoodbankData } from '../types/foodbanks'

export default function FoodBankForm() {
  const { RangePicker } = DatePicker
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [foodAmt, setFoodAmt] = useState(1)
  const [checked, setChecked] = useState(false)
  const [date, setDate] = useState<RangeValue>(null)
  const [distance, setDist] = useState(1)
  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)

  const submitHandler = () => {
    if (!date || !date[0] || !date[1]) return

    const startDateSeconds = date[0].unix()
    const endDateSeconds = date[1].unix()

    const foodBankData: FoodbankData = {
      name,
      email,
      location: new GeoPoint(lat, long),
      pickupCapacity: foodAmt,
      maxDistance: distance,
      startDate: new Timestamp(startDateSeconds, 0),
      endDate: new Timestamp(endDateSeconds, 0),
    }

    createFoodbank(foodBankData).then(() =>
      toaster.success('Your source is now sending data')
    )
  }

  const handleSetFoodAmount = (amount: number | null) => {
    if (amount) setFoodAmt(amount)
  }

  const handleDistance = (amount: number | null) => {
    if (amount) setDist(amount)
  }

  const handleSetLong = (amount: number | null) => {
    if (amount) setLong(amount)
  }

  const handleSetLat = (amount: number | null) => {
    if (amount) setLat(amount)
  }

  return (
    <Pane
      display='flex'
      flexDirection='column'
      gap={8}
      background='white'
      padding={32}
      borderRadius={8}
    >
      <Heading>Register a Foodbank</Heading>
      <TextInput
        width='100%'
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        placeholder='Enter your food bank name.'
      />
      <TextInput
        width='100%'
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
        placeholder='Enter your email.'
      />

      <Pane display='flex'>
        <Pane flex={1}>
          <Heading size={400}>Longitude</Heading>
          <InputNumber
            min={MIN_LONG}
            max={MAX_LONG}
            defaultValue={50}
            onChange={handleSetLong}
            value={long}
          />
        </Pane>

        <Pane flex={1}>
          <Heading size={400}>Latitude</Heading>
          <InputNumber
            min={MIN_LAT}
            max={MAX_LAT}
            defaultValue={50}
            onChange={handleSetLat}
            value={lat}
          />
        </Pane>
      </Pane>

      <Pane>
        Distance:
        <InputNumber
          required
          onChange={handleDistance}
          value={distance}
          placeholder='Enter the max distance you are willing to travel.'
        />
      </Pane>

      <Pane>
        Food Capacity:
        <InputNumber
          min={1}
          required
          onChange={handleSetFoodAmount}
          value={foodAmt}
          placeholder='Enter the max food amount your bank can handle.'
        />
      </Pane>

      <Pane>
        Availablity
        <RangePicker onChange={setDate} value={date} />
      </Pane>

      <Checkbox
        label='By clicking on sign-up, you agree to MoreGlean’s Terms and
        Conditions of Use.'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Button appearance='primary' onClick={submitHandler}>
        Submit
      </Button>
    </Pane>
  )
}
