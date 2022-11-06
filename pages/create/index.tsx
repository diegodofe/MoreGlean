import { Button } from 'antd'
import { GeoPoint, Timestamp } from 'firebase/firestore'
import {
  getRandomFirstName,
  getRandomFoodbankName,
  getRandomGroupName,
  getRandomLastName,
  getRandomRole,
} from '../../constants/fakeData'
import { createEvent } from '../../services/event'
import { createFoodbank } from '../../services/foodbank'
import { createGroup } from '../../services/group'
import { createUser, getAllUsers } from '../../services/users'
import { EventData } from '../../types/event'
import { FoodbankData } from '../../types/foodbank'
import { GroupData } from '../../types/group'
import { UserData } from '../../types/user'

export default function Create() {
  const handleCreateUser = async () => {
    const fullName = `${getRandomFirstName()} ${getRandomLastName()}`
    const userData: UserData = {
      name: fullName,
      photo: 'https://picsum.photos/200',
      email: `${fullName}@gmail.com`,
      acceptedConditions: false,
      role: getRandomRole(),
    }

    await createUser(userData)
  }

  const handleCreateEvent = async () => {
    const eventData: EventData = {
      title: 'Event title',
      date: new Timestamp(2000000, 0),
      foodbankId: '',
      foodAmount: 0,
      location: new GeoPoint(10, 10),
      groupId: undefined,
    }

    await createEvent(eventData)
  }

  const handleCreateGroup = async () => {
    const allUsers = await getAllUsers()

    if (allUsers.length < 5) return

    const groupMembers = [allUsers[1].id, allUsers[2].id, allUsers[3].id]

    const min = Math.ceil(0)
    const max = Math.floor(5)
    const score = Math.floor(Math.random() * (max - min + 1) + min)

    const groupData: GroupData = {
      name: getRandomGroupName(),
      location: new GeoPoint(5, 5),
      rating: score,
      photo: 'https://picsum.photos/200',
      ownerId: allUsers[0].id,
      members: groupMembers,
      memberCount: groupMembers.length,
    }

    await createGroup(groupData)
  }

  const handleCreateFoodbank = async () => {
    const min = Math.ceil(1)
    const max = Math.floor(1000)
    const capacity = Math.floor(Math.random() * (max - min + 1) + min)
    const distance = Math.floor(Math.random() * (max - min + 1) + min)

    const foodbankName = getRandomFoodbankName()

    const foodbankData: FoodbankData = {
      name: foodbankName,
      email: `${foodbankName}@gmail.com`,
      location: new GeoPoint(2, 2),
      pickupCapacity: capacity,
      maxDistance: distance,
      startDate: new Timestamp(1000000, 0),
      endDate: new Timestamp(3000000, 0),
    }

    await createFoodbank(foodbankData)
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
        <Button type='link' onClick={handleCreateFoodbank}>
          Create a foodbank
        </Button>
      </div>
    </div>
  )
}
