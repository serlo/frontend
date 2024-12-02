import { FeedbackBlock } from './feedback-block'
import { PrototypeStateStore } from './prototype-state'
import { TextBlock } from './text-block'

// All text and feedback blocks
export function Blocks() {
  const blocks = PrototypeStateStore.useState((s) => s.textAreaBlocks)

  return (
    <div className="my-5 p-3">
      <div className="flex w-full flex-col gap-3 rounded-xl border border-brand bg-brand-50 p-2">
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
