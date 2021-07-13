import { Event, EventData } from '@/components/user/event'

export interface EventLogProps {
  events?: EventData[]
}

export function EventLog({ events }: EventLogProps) {
  if (!events) return null

  return (
    <>
      {events.map((event) => {
        return (
          <Event
            key={event.id}
            eventId={event.id}
            event={event}
            unread={false}
          />
        )
      })}
    </>
  )
}
