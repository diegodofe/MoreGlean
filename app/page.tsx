import Link from 'next/link'

export default function Landing() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 46px)' }}>
        Welcome to MoreGlean
      </h1>

      <Link href='/preview'>Click to see a more gleans</Link>
    </div>
  )
}
