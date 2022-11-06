import {
  Button,
  Checkbox,
  Pane,
  RadioGroup,
  TextInputField,
} from 'evergreen-ui'
import React from 'react'

export default function SignUpForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [role, setRole] = React.useState('')

  const submitHandler = () => {
    if (name === '') {
      console.log('Write Something!')
    }
    console.log({ name, email, checked, role })
  }

  return (
    <Pane padding='2%' width='80%' height='100%'>
      <h1>Complete Your Profile</h1>
      <RadioGroup
        label='Role'
        size={16}
        value={role}
        options={[
          { label: 'Farmer', value: 'farmer' },
          { label: 'Gleaner', value: 'gleaner' },
        ]}
        onChange={(event) => setRole(event.target.value)}
      />

      <TextInputField
        required
        inputWidth='40%'
        label='Full Name'
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        placeholder='Enter you full name.'
      />
      <TextInputField
        required
        inputWidth='40%'
        label='Email'
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
        placeholder='Enter your email.'
      />
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
