import React from 'react'

import { Button, Checkbox, Pane, TextInputField } from 'evergreen-ui'

export default function CreateAGroup() {
  const [name, setName] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const submitHandler = () => {
    console.log({ name, location, checked })
  }
  return (
    <Pane alignContent='center'>
      <h1>Create a Group</h1>

      <TextInputField
        required
        inputWidth='40%'
        label='Group Name'
        placeholder="Input a your new group's name"
        onChange={(e: any) => setName(e.target.value)}
        value={name}
      />

      <TextInputField
        required
        inputWidth='40%'
        label='location'
        placeholder="Input a your new group's location"
        onChange={(e: any) => setLocation(e.target.value)}
        value={location}
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
