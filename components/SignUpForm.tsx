import {
  Button,
  Checkbox,
  Heading,
  Pane,
  RadioGroup,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import { User as FirebaseUser } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createUser, getUserById } from '../services/users'
import User, { UserData, UserRole } from '../types/users'

export default function SignUpForm({
  currentFirebaseUser,
  setUser,
}: {
  currentFirebaseUser: FirebaseUser
  setUser: (user: User) => void
}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(false)
  const [role, setRole] = useState(UserRole.GLEANER)

  const submitHandler = async () => {
    const userData: UserData = {
      name,
      photo: 'https://picsum.photos/200',
      email: currentFirebaseUser.email || '@gmail.com',
      acceptedConditions: checked,
      role,
    }

    await createUser(currentFirebaseUser.uid, userData).then(() =>
      router.push('/test')
    )

    const user = await getUserById(currentFirebaseUser.uid)

    if (!user) {
      toaster.warning('Error signing up')
      return
    }

    setUser(user)
  }

  return (
    <Pane padding='2%' width='80%' height='100%'>
      <Heading>Complete Your Profile</Heading>
      <RadioGroup
        label='Role'
        size={16}
        value={role}
        options={[
          { label: 'Farmer', value: UserRole.FARMER },
          { label: 'Gleaner', value: UserRole.GLEANER },
        ]}
        onChange={(event) => setRole(event.target.value as UserRole)}
      />
      <TextInputField
        required
        inputWidth='40%'
        label='Full Name'
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        placeholder='Enter your full name.'
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
