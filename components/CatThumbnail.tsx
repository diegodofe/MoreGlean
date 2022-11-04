import Image from 'next/image'
import Cat from '../types/cat'

export default function CatThumbnail({ cat }: { cat: Cat }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Image
        alt={`${cat.name}-image`}
        src={cat.image}
        width={200}
        height={200}
        style={{ borderRadius: '8px' }}
        priority
      />
      <h3>{`<--- ${cat.name.toUpperCase()}`}</h3>
    </div>
  )
}
