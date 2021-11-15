import clsx from 'clsx'
import { Children, ReactNode } from 'react'

import { useInstanceData } from '@/contexts/instance-context'

export interface FeedbackProps {
  correct: boolean
  children?: ReactNode
}

export function Feedback({ children, correct }: FeedbackProps) {
  const { strings } = useInstanceData()

  const hasFeedback = Children.count(children)
  const feedback = hasFeedback ? (
    children
  ) : (
    <p className="serlo-p">{strings.content[correct ? 'right' : 'wrong']}</p>
  )

  return (
    <div className="ml-4 flex">
      <span
        className={clsx('my-0', correct ? 'text-brandgreen' : 'text-[#cc1500]')}
      >
        ⬤
      </span>{' '}
      <div>{feedback}</div>
      {correct && ' 🎉'}
    </div>
  )
}
