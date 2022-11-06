import { DatePicker, Form } from 'antd'

import { Button, Checkbox, Pane, TextInputField } from 'evergreen-ui'
import { useState } from 'react'

import { RangeValue } from '../types/dates'

export default function FoodBankForm() {
  const { RangePicker } = DatePicker
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [foodAmt, setFoodAmt] = useState('')
  const [checked, setChecked] = useState(false)
  const [date, setDate] = useState<RangeValue>(null)
  const [distance, setDist] = useState('')
  const submitHandler = () => {
    console.log({ email, name, location, foodAmt, checked, date, distance })
  }
  return (
    <Pane padding='2%' width='80%' height='100%'>
      <h1>Register as a Food Bank</h1>
      <TextInputField
        required
        inputWidth='40%'
        label='Food Bank'
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        placeholder='Enter your food bank name.'
      />
      <TextInputField
        required
        inputWidth='40%'
        label='Email'
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
        placeholder='Enter your email.'
      />

      <TextInputField
        required
        inputWidth='40%'
        label='Location'
        onChange={(e: any) => setLocation(e.target.value)}
        value={location}
        placeholder='Enter your location.'
      />

      <TextInputField
        required
        inputWidth='40%'
        label='Max distance(km)'
        onChange={(e: any) => setDist(e.target.value)}
        value={distance}
        placeholder='Enter the max distance you are willing to travel.'
      />

      <TextInputField
        required
        inputWidth='40%'
        label='Max Food Capacity(kg)'
        onChange={(e: any) => setFoodAmt(e.target.value)}
        value={foodAmt}
        placeholder='Enter the max food amount your bank can handle.'
      />

      <Form.Item
        name='availabilities'
        label='Available time range'
        rules={[
          {
            required: true,
            message: 'Please select your availability!',
          },
        ]}
      >
        <RangePicker onChange={setDate} value={date} />
      </Form.Item>
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
