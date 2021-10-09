import clsx from 'clsx'
import { ReactNode } from 'react'

export interface FeedbackProps {
  correct: boolean
  children: ReactNode
}

export function Feedback({ children, correct }: FeedbackProps) {
  return (
    <div className="ml-0 mb-0 flex">
      <span
        className={clsx(
          'my-0 mr-0 ml-1',
          correct ? 'text-brandgreen' : 'text-[#cc1500]'
        )}
      >
        ⬤
      </span>{' '}
      <div>{children}</div>
      {correct && '🎉'}
    </div>
  )
}
