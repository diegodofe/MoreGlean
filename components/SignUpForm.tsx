import { Button, Checkbox, Col, Form, Input, Radio, Row } from 'antd'

export default function SignUpForm() {
  return (
    <div>
      <Row>
        <Col span={24}>
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
            <h1>Complete Your Profile</h1>
            <Form.Item
              id='role'
              name='role'
              label='What is your role?'
              rules={[
                {
                  required: true,
                  message: 'Please choose your role!',
                },
              ]}
            >
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
            {/* <Form.Item label='Address'>
              <Input />
            </Form.Item> */}
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
      </Row>
    </div>
  )
}
