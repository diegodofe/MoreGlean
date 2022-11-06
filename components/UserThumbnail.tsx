import { Heading } from 'evergreen-ui'
import User from '../types/users'

export default function UserThumbnail({ user }: { user: User }) {
  return <Heading>{`${user.name.toUpperCase()}!!!`}</Heading>
}
