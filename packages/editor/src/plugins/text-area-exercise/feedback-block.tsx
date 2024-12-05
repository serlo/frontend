import { cn } from '@editor/utils/cn'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { PrototypeStateStore } from './prototype-state'
import { Feedback } from './types'

export function FeedbackBlock({ id, content }: Feedback) {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  return (
    <div
      id={id}
      className={cn('m-3 rounded-md bg-purple-200 p-3', silentmode && 'hidden')}
    >
      <AnimateChangeInHeight>
        {/* {isCorrect ? (
          <FaIcon icon={faCheck} className="text-purple-400" />
        ) : (
          <FaIcon icon={faExclamationTriangle} className="text-purple-400" />
        )}{' '} */}
        {content}
      </AnimateChangeInHeight>
    </div>
  )
}
