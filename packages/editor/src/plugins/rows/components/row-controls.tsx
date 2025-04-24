import { FaIcon } from '@editor/editor-ui/fa-icon'
import { StateTypeReturnType } from '@editor/types/internal__plugin-state'
import { cn } from '@editor/utils/cn'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import type { ConnectDragSource } from 'react-dnd'

import type { RowsPluginState } from '..'

interface RowDragButtonProps {
  drag: ConnectDragSource
  rows: StateTypeReturnType<RowsPluginState>
  index: number
}

export function RowControls({ drag, rows, index }: RowDragButtonProps) {
  function handleUpButtonClick() {
    const previousRow = document.getElementById(rows[index - 1].id)
    if (!previousRow) return
    scrollToElement(previousRow, { offset: 60, direction: 'up' }, () => {
      rows.move(index, index - 1)
    })
  }

  function handleDownButtonClick() {
    const nextRow = document.getElementById(rows[index + 1].id)
    if (!nextRow) return
    scrollToElement(nextRow, { offset: 40, direction: 'down' }, () => {
      rows.move(index, index + 1)
    })
  }

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        'row-controls',
        'absolute bottom-14 left-2 top-0 z-[22] flex flex-col justify-center gap-4',
        'rounded-l-md bg-white bg-opacity-70 opacity-0 transition-opacity'
      )}
    >
      <button
        className={cn(buttonStyles, index === 0 && 'hidden')}
        onClick={handleUpButtonClick}
      >
        <div className={iconWrapperStyles} aria-hidden="true">
          <FaIcon icon={faAngleUp} className="text-xl" />
        </div>
      </button>
      <button
        className={cn(buttonStyles, index === rows.length - 1 && 'hidden')}
        onClick={handleDownButtonClick}
      >
        <div className={iconWrapperStyles} aria-hidden="true">
          <FaIcon icon={faAngleDown} className="text-xl" />
        </div>
      </button>
    </div>
  )
}

const buttonStyles = cn(`
  serlo-tooltip-trigger -mt-[3px] select-none
  rounded-full border-0 bg-none p-0
`)

const iconWrapperStyles = cn(`
  serlo-button-edit-primary block rounded-full bg-editor-primary-100
  px-0.5 py-0 text-almost-black hover:bg-editor-primary-300
`)

function scrollToElement(
  target: HTMLElement,
  options: { offset: number; direction: 'up' | 'down' },
  callback: () => void
) {
  const { offset, direction } = options
  const rect = target.getBoundingClientRect()

  const isFullyVisible =
    rect.top >= offset && rect.bottom <= window.innerHeight - offset

  if (isFullyVisible) return callback()

  const targetPosition =
    direction === 'up'
      ? rect.top + window.scrollY - offset
      : rect.bottom + window.scrollY + offset - window.innerHeight

  window.scrollTo({ top: targetPosition, behavior: 'smooth' })

  // Call the callback function once the element is in view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      callback()
    },
    // Make sure that the whole element is in view
    { threshold: 1 }
  )

  observer.observe(target)
}
