import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventHandler,
  type ChangeEventHandler,
  type MouseEventHandler,
} from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

interface BlankDraggableDummyAnswerProps {
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyboardEventHandler
  onRemoveClick: MouseEventHandler
}

export function BlankDraggableDummyAnswer(
  props: BlankDraggableDummyAnswerProps
) {
  const { text, onChange, onKeyDown, onRemoveClick } = props
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  return (
    <div className="relative">
      <span className="serlo-autogrow-input mb-1 mr-2" data-value={text + '_ '}>
        <input
          className="serlo-input-font-reset w-3/4 !min-w-[80px] rounded-full border border-brand bg-brand-50 focus:border-transparent focus:outline focus:outline-red-400"
          value={text}
          autoFocus
          size={4}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </span>
      <button
        className={cn(
          `serlo-tooltip-trigger absolute right-3 top-1 h-6 w-6 rounded-full px-1 py-0.5 leading-none text-black
          opacity-50 hover:bg-editor-primary-200 hover:opacity-100 focus:bg-editor-primary-200 focus:opacity-100`
        )}
        onClick={onRemoveClick}
      >
        <EditorTooltip
          text={blanksExerciseStrings.removeDummyAnswer}
          className="-top-10"
        />
        <FaIcon icon={faCircleXmark} className="text-sm" />
      </button>
    </div>
  )
}
