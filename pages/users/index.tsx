import UserThumbnail from '../../components/UserThumbnail'
import { getAllUsers } from '../../services/users'
import User from '../../types/user'

export async function getServerSideProps() {
  const users = await getAllUsers()
  return { props: { users } }
}

export default function UsersPage({ users }: { users: User[] }) {
  if (users.length === 0) return <p>No Gleaners</p>

  return (
    <div>
      <h1>The Real Gleaners</h1>
      {users.map((u) => (
        <UserThumbnail key={u.id} user={u} />
      ))}
    </div>
  )
}
