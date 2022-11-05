import { Button } from 'antd'
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomRole,
} from '../../constants/fakeData'
import { createUser } from '../../services/users'
import { UserData } from '../../types/user'

export default function Create() {
  const handleCreateUser = async () => {
    const fullName = `${getRandomFirstName()} ${getRandomLastName()}`
    const userData: UserData = {
      name: fullName,
      email: `${fullName}@gmail.com`,
      acceptedConditions: false,
      role: getRandomRole(),
    }

    await createUser(userData)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Create some data</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type='link' onClick={handleCreateUser}>
          Create a user
        </Button>
        <Button type='link'>Create an event</Button>
        <Button type='link'>Create a group</Button>
        <Button type='link'>Create a foodbank</Button>
      </div>
    </div>
  )
}
