import Link from 'next/link'

export default function Page() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
        Welcome to create-crash-app!
      </h1>

      <p>Github</p>

      <Link href='/preview'>Click to see a cat</Link>
    </div>
  )
}
