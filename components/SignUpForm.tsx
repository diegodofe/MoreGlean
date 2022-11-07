import {
  Button,
  Checkbox,
  FilePicker,
  Heading,
  Pane,
  RadioGroup,
  TextInput,
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

  // File upload
  const handleSelectFile = (files: FileList) => {
    if (files.length === 0) return

    const newFile = files[0]

    setFile(newFile)
  }

  const submitHandler = async () => {
    const userData: UserData = {
      name,
      email: currentFirebaseUser.email || '@gmail.com',
      acceptedConditions: checked,
      role,
      groupId: undefined,
    }

    // File upload
    if (!file) {
      toaster.warning('Profile picture missing')
      return
    }
    const userFileLocation = `images/profiles/${currentFirebaseUser.uid}`
    const imageRef = ref(storage, userFileLocation)
    uploadBytes(imageRef, file)

    await createUser(currentFirebaseUser.uid, userData).then(() =>
      router.push('/')
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
    <Pane
      background='white'
      padding={32}
      borderRadius={8}
      elevation={1}
      display='flex'
      flexDirection='column'
      gap={16}
    >
      <Heading size={800} marginBottom={16}>
        Complete Your Profile
      </Heading>

      <Pane>
        <Heading size={200} marginBottom={8}>
          Full name
        </Heading>
        <TextInput
          width='100%'
          onChange={(e: any) => setName(e.target.value)}
          value={name}
          placeholder='Enter your full name.'
        />
      </Pane>

      <Pane>
        <Heading size={200}>Role</Heading>
        <RadioGroup
          value={role}
          options={[
            { label: 'Farmer', value: UserRole.FARMER },
            { label: 'Gleaner', value: UserRole.GLEANER },
          ]}
          onChange={(event) => setRole(event.target.value as UserRole)}
        />
      </Pane>

      <Heading size={200}>Profile picture</Heading>
      <FilePicker
        multiple
        onChange={handleSelectFile}
        placeholder='Place your profile picture here!'
      />

      <Checkbox
        label='By clicking on sign-up, you agree to MoreGlean’s Terms and
        Conditions of Use.'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
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
