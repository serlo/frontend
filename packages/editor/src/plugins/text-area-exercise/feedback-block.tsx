import { AnimateChangeInHeight } from './animate-change-in-height'
import { Feedback } from './types'

export function FeedbackBlock({ id, content }: Feedback) {
  return (
    <div id={id} className="m-3 rounded-md bg-brand p-3 text-white">
      <AnimateChangeInHeight>{content}</AnimateChangeInHeight>
    </div>
  )
}
