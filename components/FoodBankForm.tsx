import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from 'antd'

const { RangePicker } = DatePicker

export default function FoodBankForm() {
  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 40 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 30 },
      }}
      layout='vertical'
    >
      <div>
        <h1>Register as a Food Bank</h1>

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
                'Please input the maximum distance your food bank can pick up from!',
            },
          ]}
        >
          <InputNumber min={0} max={6500} />
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
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 0 },
          }}
        >
          <Checkbox>
            By clicking on sign-up, you agree to MoreGlean’s Terms and
            Conditions of Use.
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

/*
import { Button, TextInput } from 'evergreen-ui'

export default function FoodBankForm() {
  return (
    <>
      <div>Register as a Food Bank</div>
      <TextInput
        required
        name='text-input-name'
        placeholder='Text input placeholder...'
      />
      <br />
      <Button marginRight={16} appearance='primary'>
        Submit
      </Button>
    </>
  )
}
*/
