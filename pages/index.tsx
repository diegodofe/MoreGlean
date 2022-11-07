import { DatePicker } from 'antd'
import { EmptyState, Pane, SearchIcon } from 'evergreen-ui'
import { Timestamp } from 'firebase/firestore'
import Head from 'next/head'
import { useState } from 'react'
import EventThumbnail from '../components/EventThumbnail'
import useEvents from '../hooks/useEvents'
import { RangeValue } from '../types/dates'

const { RangePicker } = DatePicker

export default function Home() {
  const { events } = useEvents()
  const [date, setDate] = useState<RangeValue>(null)

  const rangeChosen = date && date[0] && date[1]

  const eventsToDisplay = rangeChosen
    ? events.filter(
        (event) =>
          event.date >= new Timestamp(date[0]?.unix() ?? 0, 0) &&
          event.date <= new Timestamp(date[1]?.unix() ?? 0, 0)
      )
    : events

  return (
    <>
      <Head>
        <title>MoreGlean</title>
      </Head>

      <Pane display='flex' flexDirection='column' gap={32}>
        <RangePicker onChange={setDate} />

        {eventsToDisplay.length === 0 ? (
          <EmptyState
            background='light'
            title='No events in this range'
            orientation='vertical'
            icon={<SearchIcon color='#C1C4D6' />}
            iconBgColor='#EDEFF5'
          />
        ) : (
          <Pane display='flex' flexDirection='column' gap={32}>
            {eventsToDisplay.map((event) => (
              <EventThumbnail key={event.id} event={event} />
            ))}
          </Pane>
        )}
      </Pane>
    </>
  )
}
