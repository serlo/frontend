import clsx from 'clsx'
import { Children, ReactNode } from 'react'

import { useInstanceData } from '@/contexts/instance-context'

export interface FeedbackProps {
  correct: boolean
  children?: ReactNode
  missedSome?: boolean
}

export function Feedback({ children, correct, missedSome }: FeedbackProps) {
  const exStrings = useInstanceData().strings.content.exercises

  const hasFeedback = Children.count(children)
  const fallback = (
    <p className="serlo-p">
      {exStrings[correct ? 'correct' : missedSome ? 'missedSome' : 'wrong']}
    </p>
  )
  const feedback = hasFeedback ? (
    <>
      {missedSome && exStrings.missedSome}
      {children}
    </>
  ) : (
    fallback
  )

  return (
    <div className="ml-4 flex animate-in fade-in ">
      <span
        className={clsx(
          'my-0 mr-1',
          correct ? 'text-brandgreen' : 'text-[#cc1500]'
        )}
      >
        ⬤
      </span>{' '}
      {feedback}
      {correct && ' 🎉'}
    </div>
  )
}
