import { FaIcon } from '@editor/editor-ui/fa-icon'
import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { Feedback } from './types'

export function FeedbackBlock({ id, content, isCorrect }: Feedback) {
  return (
    <div id={id} className="m-3 rounded-md bg-purple-200 p-3">
      <AnimateChangeInHeight>
        {isCorrect ? (
          <FaIcon icon={faCheck} className="text-purple-400" />
        ) : (
          <FaIcon icon={faExclamationTriangle} className="text-purple-400" />
        )}{' '}
        {content}
      </AnimateChangeInHeight>
    </div>
  )
}
