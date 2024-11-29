import { useEffect, useRef } from 'react'

import { FeedbackButton } from './feedback-button'
import { createTextBlock, PrototypeStateStore } from './prototype-state'
import { Text } from './types'

// Where user types text
export function TextBlock({ id /*, content, type TODO */ }: Text) {
  const autofocusId = useRef<string | null>(null)

  useEffect(() => {
    if (!autofocusId.current) return

    console.log(autofocusId.current)

    setTimeout(() => {
      document.getElementById(autofocusId.current ?? '')!.focus()
      autofocusId.current = null
    }, 100)
  }, [autofocusId])

  return (
    <div className="flex flex-row">
      <textarea
        id={id}
        onKeyDown={(keyDownEvent) => {
          if (keyDownEvent.key !== 'Enter') return
          keyDownEvent.preventDefault() // Don't add newline
          PrototypeStateStore.update((s) => {
            const index = s.textAreaBlocks.findIndex((block) => block.id === id)
            const newTextBlock = createTextBlock()
            autofocusId.current = newTextBlock.id
            s.textAreaBlocks.splice(index + 1, 0, newTextBlock)
          })
        }}
        className="plugin-text-area-text-area grow resize-none bg-transparent outline-none"
      ></textarea>
      <FeedbackButton id={id} exercise="" solution="" studentSolution="" />
    </div>
  )
}
