import { DatePicker, Space } from 'antd'
import { Button, Pane, TextInputField } from 'evergreen-ui'
import React from 'react'

type RangeValue = moment.Moment | null

export default function CreateEvent() {
  const [farm, setName] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [amount, setCapacity] = React.useState('')
  const [date, setDate] = React.useState<RangeValue>(null)

  const submitHandler = () => {
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
            // onChange={onChange}
            onChange={setDate}
            value={date}
          />
        </Space>
      </Pane>
      <Button appearance='primary' onClick={submitHandler}>
        Submit
      </Button>
    </Pane>
  )
}
