import {
  Button,
  Checkbox,
  FilePicker,
  Heading,
  Pane,
  RadioGroup,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import { User as FirebaseUser } from 'firebase/auth'
import { ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { storage } from '../firebase'
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
  const [file, setFile] = useState<File>()
  const [role, setRole] = useState(UserRole.GLEANER)

  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    setFile(newFile)
  }

  const submitHandler = async () => {
    if (!file) {
      toaster.warning('Profile picture missing')
      return
    }

    const userFileLocation = `images/${currentFirebaseUser.uid}`

    const userData: UserData = {
      name,
      photo: userFileLocation,
      email: currentFirebaseUser.email || '@gmail.com',
      acceptedConditions: checked,
      role,
    }

    const imageRef = ref(storage, userFileLocation)
    uploadBytes(imageRef, file)

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

  const disableSubmit = !file || !name || !checked

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

      <FilePicker
        multiple
        width={250}
        onChange={handleSelectFile}
        placeholder='Select the file here!'
      />

      <Button
        appearance='primary'
        onClick={submitHandler}
        disabled={disableSubmit}
      >
        Submit
      </Button>
    </Pane>
  )
}
