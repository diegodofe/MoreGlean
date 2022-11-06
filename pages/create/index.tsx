import { Button } from 'antd'
import { GeoPoint, Timestamp } from 'firebase/firestore'
import {
  getRandomFirstName,
  getRandomLastName,
  getRandomRole,
} from '../../constants/fakeData'
import { createEvent } from '../../services/event'
import { createGroup } from '../../services/group'
import { createUser } from '../../services/users'
import { EventData } from '../../types/event'
import { GroupData } from '../../types/group'
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

  const handleCreateEvent = async () => {
    const eventData: EventData = {
      title: 'Event title',
      date: new Timestamp(0, 0),
      foodbankId: '',
      foodAmount: 0,
      location: new GeoPoint(0, 0),
      groupId: undefined,
    }

    await createEvent(eventData)
  }

  const handleCreateGroup = async () => {
    const groupData: GroupData = {
      name: 'The best team',
      location: new GeoPoint(0, 0),
      rating: 4.5,
      photo: 'https://picsum.photos/200',
      ownerId: '',
      members: [],
      memberCount: 0,
    }

    await createGroup(groupData)
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
        <Button type='link' onClick={handleCreateEvent}>
          Create an event
        </Button>
        <Button type='link' onClick={handleCreateGroup}>
          Create a group
        </Button>
        <Button type='link'>Create a foodbank</Button>
      </div>
    </div>
  )
}
