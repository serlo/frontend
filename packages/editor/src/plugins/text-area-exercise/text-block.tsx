import { FeedbackButton } from './feedback-button'
import { createTextBlock, PrototypeStateStore } from './prototype-state'
import { Text } from './types'
import { usePluginId } from './use-plugin-id'

// Where user types text
export function TextBlock({ id }: Text) {
  const pluginId = usePluginId()
  const __is_starting_up = PrototypeStateStore.useState(
    (s) => s.__is_starting_up
  )

  const thisBlock = PrototypeStateStore.getRawState().textAreaPlugins[
    pluginId
  ].textAreaBlocks.find((b) => b.id === id)

  console.log(__is_starting_up)
  return (
    <div className="group flex flex-row">
      <textarea
        autoFocus={!__is_starting_up}
        id={id}
        onChange={(e) => {
          PrototypeStateStore.update((s) => {
            if (!s.textAreaPlugins[pluginId]) {
              s.textAreaPlugins[pluginId] = {
                textAreaBlocks: [createTextBlock()],
              }
            }
            const blocks = s.textAreaPlugins[pluginId].textAreaBlocks
            const index = blocks.findIndex((block) => block.id === id)
            blocks[index].content = e.target.value
          })
        }}
        onKeyDown={(keyDownEvent) => {
          if (keyDownEvent.key !== 'Enter') return
          keyDownEvent.preventDefault() // Don't add newline
          PrototypeStateStore.update((s) => {
            if (!s.textAreaPlugins[pluginId])
              throw new Error(
                'Missing text area plugin state. Should be initialized first.'
              )
            const blocks = s.textAreaPlugins[pluginId].textAreaBlocks
            const index = blocks.findIndex((block) => block.id === id)
            const newTextBlock = createTextBlock()
            blocks.splice(index + 1, 0, newTextBlock)
          })
        }}
        className="text-area-chrome-autogrow grow resize-none bg-transparent outline-none"
      ></textarea>
      <FeedbackButton
        id={id}
        spinner={thisBlock?.type === 'text' && thisBlock.feedbackPending}
      />
    </div>
  )
}
