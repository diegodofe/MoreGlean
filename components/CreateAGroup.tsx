import { InputNumber } from 'antd'
import {
  Button,
  Dialog,
  Heading,
  Pane,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import { GeoPoint } from 'firebase/firestore'
import { useContext, useState } from 'react'
import UserContext from '../constants/context'
import { createGroup, getGroupByDocRef } from '../services/group'
import { updateUserById } from '../services/users'
import { GroupData } from '../types/groups'

export default function CreateGroupButton() {
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
  }

  const handleSetLong = (amount: number | null) => {
    if (amount) setLong(amount)
  }

  const handleSetLat = (amount: number | null) => {
    if (amount) setLat(amount)
  }

  return (
    <>
      <Button onClick={() => setIsCreateGroupShown(true)}>Create Group</Button>
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
          <InputNumber min={1} defaultValue={50} onChange={handleSetLong} />

          <Heading size={400}>Latitude</Heading>
          <InputNumber min={1} defaultValue={50} onChange={handleSetLat} />
        </Pane>
      </Dialog>
    </>
  )
}
