import { Button } from 'antd'
import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}
    >
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
        Welcome to MoreGlean!
      </h1>

      <Link href='/create'>
        <Button type='link'>Create Data</Button>
      </Link>
    </div>
  )
}
