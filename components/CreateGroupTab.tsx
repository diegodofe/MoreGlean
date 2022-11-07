import { InputNumber } from 'antd'
import {
  Dialog,
  Heading,
  Pane,
  PlusIcon,
  Tab,
  Text,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import { useContext, useState } from 'react'
import UserContext from '../constants/context'
import { MAX_LAT, MAX_LONG, MIN_LAT, MIN_LONG } from '../constants/location'
import { createGroup, getGroupByDocRef } from '../services/group'
import { updateUserById } from '../services/users'
import { GroupData } from '../types/groups'

export default function CreateGroupTab() {
  const user = useContext(UserContext)
  const [isCreateGroupShown, setIsCreateGroupShown] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [long, setLong] = useState(0)
  const [lat, setLat] = useState(0)

  const handleSubmit = async () => {
    const groupData: GroupData = {
      name: groupName,
      location: new GeoPoint(lat, long),
      ownerId: user.id,
      members: [user.id],
    }

    const groupRef = await createGroup(groupData)

    const newGroup = await getGroupByDocRef(groupRef)

    if (newGroup?.id) {
      await updateUserById(user.id, 'groupId', newGroup.id)
      toaster.success('Group created')
    } else {
      toaster.warning('Error creating group')
    }
    setIsCreateGroupShown(false)
  }

  const handleSetLong = (amount: number | null) => {
    if (amount) setLong(Math.ceil(amount))
  }

  const handleSetLat = (amount: number | null) => {
    if (amount) setLat(Math.ceil(amount))
  }

  return (
    <>
      <Tab
        id='Create-Group'
        direction='vertical'
        aria-controls='panel-Group'
        onSelect={() => setIsCreateGroupShown(true)}
      >
        <Pane display='flex' alignItems='center' gap={8}>
          <PlusIcon size={24} /> <Text>Create Group</Text>
        </Pane>
      </Tab>
      <Dialog
        isShown={isCreateGroupShown}
        title='Create a group'
        onCloseComplete={() => setIsCreateGroupShown(false)}
        confirmLabel='Create'
        onConfirm={handleSubmit}
      >
        <Pane>
          <TextInputField
            required
            label='Group name'
            onChange={(e: any) => setGroupName(e.target.value)}
            value={groupName}
            placeholder='Enter a name for the group'
          />
          <Heading size={400}>Longitude</Heading>
          <InputNumber
            min={MIN_LONG}
            max={MAX_LONG}
            defaultValue={50}
            onChange={handleSetLong}
          />
          <Heading size={400}>Latitude</Heading>
          <InputNumber
            min={MIN_LAT}
            max={MAX_LAT}
            defaultValue={50}
            onChange={handleSetLat}
          />
        </Pane>
      </Dialog>
    </>
  )
}
