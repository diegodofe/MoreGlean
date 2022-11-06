import { Rate } from 'antd'
import Image from 'next/image'
import Event from '../types/events'

export default function EventThumbnail({ event }: { event: Event }) {
  return (
    <div>
      <Image src={event.image} alt={event.title} width={200} height={200} />
      <Rate disabled defaultValue={2} />
      <h2>Title: {event.title}</h2>
      <h3>Amount of food is: {event.foodAmount}</h3>
    </div>
  )
}
