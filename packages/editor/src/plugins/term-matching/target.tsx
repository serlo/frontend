import { FocusEventHandler } from 'react'
import { useDrag } from 'react-dnd'

import { TermMatchingTargetProps } from '.'
import { ItemTypes } from './itemTypes'

export function Target({
  id,
  name,
  position,
  onFocus,
}: TermMatchingTargetProps & { onFocus: FocusEventHandler<HTMLInputElement> }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TARGET,
      item: { id: id.value, x: position.x.value, y: position.y.value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, position.x, position.y]
  )

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div
      key={id.value}
      className="absolute h-5 w-5 -translate-x-2.5 -translate-y-2.5 rounded-full bg-pink-600 ring-offset-2 focus-within:ring-2 focus-within:ring-pink-600"
      style={{
        left: position.x.value,
        top: position.y.value,
      }}
      onClick={(e) => e.stopPropagation()}
      ref={drag}
    >
      <input
        className="absolute left-8"
        value={name.value}
        onChange={(e) => name.set(e.currentTarget.value)}
        onFocus={onFocus}
        data-target-id={id.value}
        // onBlur={() => setCurrentlyFocusedTarget(undefined)}
      />
    </div>
  )
}
