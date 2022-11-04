import UserThumbnail from '../../components/UserThumbnail'
import { RONALDO_DOC_ID } from '../../constants/users'
import { getUserById } from '../../services/users'

async function getPreviewUser() {
  const welcomeUser = await getUserById(RONALDO_DOC_ID)

  return welcomeUser
}

export default async function Preview() {
  const welcomeUser = await getPreviewUser()

  if (!welcomeUser) return <p>Oops, the person got away...</p>

  return (
    <div>
      <UserThumbnail user={welcomeUser} />
    </div>
  )
}
