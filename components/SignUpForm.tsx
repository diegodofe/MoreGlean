/* eslint-disable react/jsx-props-no-spreading */

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 30 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 30 },
//     sm: { span: 16 },
//   },
// }

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 0,
//     },
//   },
// }

export default function SignUpForm() {
  return (
    <div>
      {/* <Row>
        <Col span={24}>
          <Form {...formItemLayout} layout='vertical'>
            <h1>Complete Your Profile</h1>
            <Form.Item id='role' name='role' label='What is your role?'>
              <Radio.Group>
                <Radio value='farm'> Farm </Radio>
                <Radio value='user'> User </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='fullname'
              label='Full Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='Address'>
              <Input />
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
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='groupsize'
              dependencies={['role']}
              hasFeedback
              label='Number of people in your group.'
              rules={[
                {
                  required: true,
                  message: 'Please enter the number of people in your group.',
                },
                // eslint-disable-next-line no-empty-pattern
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      value != null &&
                      value !== '' &&
                      !Number.isNaN(Number(value.toString()))
                    ) {
                      let foodName = (
                        document.getElementById('role') as HTMLInputElement
                      ).value
                      console.log(foodName)
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Please enter a valid number.')
                    )
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='capacity'
              label='Food Capacity in Kg'
              rules={[
                {
                  required: true,
                  message: 'Please enter the food capacity.',
                },
                // eslint-disable-next-line no-empty-pattern
                ({}) => ({
                  validator(_, value) {
                    if (
                      value != null &&
                      value !== '' &&
                      !Number.isNaN(Number(value.toString()))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Please enter a valid number.')
                    )
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='distance'
              label='Distance in Km'
              rules={[
                {
                  required: true,
                  message:
                    'Please enter the distance you are willing to travel.',
                },
                // eslint-disable-next-line no-empty-pattern
                ({}) => ({
                  validator(_, value) {
                    if (
                      value != null &&
                      value !== '' &&
                      !Number.isNaN(Number(value.toString()))
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Please enter a valid number.')
                    )
                  },
                }),
              ]}
            >
              <Input defaultValue={0} min={0} />
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
              {...tailFormItemLayout}
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
          </Form>
        </Col>
      </Row> */}
    </div>
  )
}
