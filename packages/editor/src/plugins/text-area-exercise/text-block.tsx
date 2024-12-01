import { FeedbackButton } from './feedback-button'
import { createTextBlock, PrototypeStateStore } from './prototype-state'
import { Text } from './types'

// Where user types text
export function TextBlock({ id }: Text) {
  return (
    <div className="flex flex-row">
      <textarea
        autoFocus
        id={id}
        onChange={(e) => {
          PrototypeStateStore.update((s) => {
            const index = s.textAreaBlocks.findIndex((block) => block.id === id)
            s.textAreaBlocks[index].content = e.target.value
          })
        }}
        onKeyDown={(keyDownEvent) => {
          if (keyDownEvent.key !== 'Enter') return
          keyDownEvent.preventDefault() // Don't add newline
          PrototypeStateStore.update((s) => {
            const index = s.textAreaBlocks.findIndex((block) => block.id === id)
            const newTextBlock = createTextBlock()
            s.textAreaBlocks.splice(index + 1, 0, newTextBlock)
          })
        }}
        className="text-area-chrome-autogrow grow resize-none bg-transparent outline-none"
      ></textarea>
      <FeedbackButton id={id} />
    </div>
  )
}
