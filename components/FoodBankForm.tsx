import { DatePicker, Form, Input } from 'antd'
/* eslint-disable react/jsx-props-no-spreading */

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 40 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 30 },
  },
}

export default function FoodBankForm() {
  return (
    <Form {...formItemLayout} layout='vertical'>
      <div>
        <h1>Register as a food Bank!</h1>

        <Form.Item
          name='name'
          label='Organisation'
          rules={[
            {
              required: true,
              message: 'Please input your organisation name!',
            },
          ]}
        >
          <Input placeholder='Enter your food bank name...' />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder='Enter your email address.' />
        </Form.Item>

        <Form.Item
          name='pickupCapacity'
          label='Capacity of food to receive(kg)'
          rules={[
            {
              required: true,
              message:
                'Please input the maximum capacity your food bank can handle!',
            },
          ]}
        >
          <Input placeholder='Enter the food capacity.' />
        </Form.Item>

        <Form.Item
          name='location'
          label='Location'
          rules={[
            {
              required: true,
              message: 'Please input the address of your food bank!',
            },
          ]}
        >
          <Input placeholder='Enter the food bank address.' />
        </Form.Item>

        <Form.Item
          name='Max distance'
          label='Max distance(km)'
          rules={[
            {
              required: true,
              message:
                'Please input the maximum distance your food bank can pick up!',
            },
          ]}
        >
          <Input placeholder='Enter the Maximum distance.' />
        </Form.Item>

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
          <RangePicker />
        </Form.Item>
      </div>
    </Form>
  )
}
