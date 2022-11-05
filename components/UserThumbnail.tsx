import { User } from '../types/User'

export default function UserThumbnail({ user }: { user: User }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <h3>{`${user.name.toUpperCase()}!!!`}</h3>
    </div>
  )
}
