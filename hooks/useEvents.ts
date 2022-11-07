import { useEffect, useState } from 'react'
import { listenToEvents } from '../services/event'
import Event from '../types/events'

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    () =>
      listenToEvents({
        cb: (newEvents) => {
          setEvents(newEvents)
          setIsLoading(false)
        },
      }),
    []
  )

  return { events, isLoading }
}
