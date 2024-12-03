import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { AnimateChangeInHeight } from '../text-area-exercise/animate-change-in-height'

export function SubmitButtonAndFeedback() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)

  return (
    <div className="relative">
      <AnimateChangeInHeight className="sticky bottom-1 z-50 p-3">
        <button
          onClick={() => {
            setTriesLeft((previous) => previous - 1)
            setShowFeedback(true)
          }}
          className={cn(
            'mb-3 rounded-md bg-brand-100 px-16 pb-4 pt-4 font-bold',
            'hover:cursor-pointer hover:bg-brand-200'
          )}
        >
          Zur Rückmeldung abschicken ({triesLeft})
        </button>
        {showFeedback ? (
          <div className="flex w-full flex-row gap-3 bg-purple-200 p-3">
            <img src="/_assets/img/birdie.svg" className="max-w-20" />
            <div>
              Feedback text Feedback text Feedback text Feedback text Feedback
              text Feedback text Feedback text Feedback text Feedback text
              Feedback text Feedback text Feedback text Feedback text Feedback
              text Feedback text Feedback text Feedback text{' '}
            </div>
          </div>
        ) : null}
      </AnimateChangeInHeight>
    </div>
  )
}
