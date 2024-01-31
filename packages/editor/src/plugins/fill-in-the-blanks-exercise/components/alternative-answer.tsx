import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { forwardRef } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

interface AlternativeAnswerProps {
  answer: string
  index: number
  onAdd: () => void
  onChange: (targetIndex: number, newValue: string) => void
  onRemove: (targetIndex: number) => void
}

export const AlternativeAnswer = forwardRef<
  HTMLInputElement,
  AlternativeAnswerProps
>(function AlternativeAnswer(props, ref) {
  const { answer, index, onAdd, onChange, onRemove } = props

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  return (
    <div key={index} className="relative">
      <span className="serlo-autogrow-input" data-value={answer + '_ '}>
        <input
          ref={ref}
          className="serlo-input-font-reset w-3/4 !min-w-[80px] rounded-full border border-brand bg-brand-50 focus:outline focus:outline-1"
          value={answer}
          size={4}
          onChange={(event) => {
            onChange(index, event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onAdd()
            if (event.key === 'Backspace' && answer === '') onRemove(index)
          }}
        />
      </span>
      <button
        className={cn(
          `serlo-tooltip-trigger absolute right-1 top-1 h-6 w-6 rounded-full px-1 py-0.5 leading-none text-black
          opacity-50 hover:bg-editor-primary-200 hover:opacity-100 focus:bg-editor-primary-200 focus:opacity-100`
        )}
        onClick={() => {
          onRemove(index)
        }}
      >
        <EditorTooltip
          text={blanksExerciseStrings.removeAlternativeAnswer}
          className="-top-10"
        />
        <FaIcon icon={faCircleXmark} className="text-sm" />
      </button>
    </div>
  )
})
