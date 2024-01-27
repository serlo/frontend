import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/helper/cn'

interface BlankDraggableDummyAnswerProps {
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onRemove: MouseEventHandler
}

export function BlankDraggableDummyAnswer(
  props: BlankDraggableDummyAnswerProps
) {
  const { text, onChange, onRemove } = props

  const [isInEditMode, setIsInEditMode] = useState(false)
  const [isInHoverMode, setIsInHoverMode] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setIsInEditMode(true)
  }, [])

  return isInEditMode ? (
    <span className="serlo-autogrow-input mb-1 mr-2" data-value={text + '_'}>
      <input
        className="rounded-full border border-red-temp bg-editor-primary-100 outline-none"
        ref={inputRef}
        value={text}
        autoFocus
        size={4}
        onBlur={() => {
          setIsInEditMode(false)
        }}
        onChange={onChange}
      />
    </span>
  ) : (
    <div
      className="mb-1 mr-2 flex"
      onMouseEnter={() => {
        setIsInHoverMode(true)
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsInHoverMode(false)
        }, 300)
      }}
    >
      <button
        className={cn(
          'relative h-full rounded-full border border-editor-primary-300 bg-editor-primary-100',
          text.length < 1 ? 'px-8' : 'px-2'
        )}
        onClick={() => {
          setIsInEditMode(true)
        }}
      >
        <span className={cn(isInHoverMode && 'opacity-20')}>{text}</span>
        <span
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0 text-center',
            !isInHoverMode && 'opacity-0'
          )}
        >
          <FaIcon icon={faPencil} className="text-sm" />
        </span>
      </button>
      {isInHoverMode ? (
        <button
          className="ml-2 rounded-full bg-red-temp px-2"
          onClick={onRemove}
        >
          <FaIcon icon={faTrashCan} className="text-sm" />
        </button>
      ) : null}
    </div>
  )
}
