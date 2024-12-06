import { useEffect } from 'react'

import { FeedbackBlock } from './feedback-block'
import { createTextBlock, PrototypeStateStore } from './prototype-state'
import { TextBlock } from './text-block'
import { usePluginId } from './use-plugin-id'

// All text and feedback blocks
export function Blocks() {
  const pluginId = usePluginId()
  const blocks = PrototypeStateStore.useState(
    (s) => s.textAreaPlugins[pluginId]?.textAreaBlocks || []
  )

  // Initialize blocks
  useEffect(() => {
    if (blocks.length !== 0) return

    PrototypeStateStore.update((s) => {
      s.textAreaPlugins[pluginId] = {
        ...s.textAreaPlugins[pluginId],
        textAreaBlocks: [createTextBlock()],
      }
    })
  })

  // Dont render blocks because their state is not initialized on first render
  if (!blocks) return <></>

  return (
    <div className="mt-1">
      <div className="flex w-full flex-col gap-3 rounded-xl border-2 border-brand bg-brand-50 p-2">
        {blocks.map((block) =>
          block.type === 'text' ? (
            <TextBlock key={block.id} {...block} />
          ) : block.type === 'feedback' ? (
            <FeedbackBlock key={block.id} {...block} />
          ) : (
            <div>Unknown type</div>
          )
        )}
      </div>
    </div>
  )
}
