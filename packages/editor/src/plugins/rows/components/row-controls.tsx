import { FaIcon } from '@editor/editor-ui/fa-icon'
import { StateTypeReturnType } from '@editor/types/internal__plugin-state'
import { cn } from '@editor/utils/cn'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import type { RowsPluginState } from '..'

interface RowDragButtonProps {
  rows: StateTypeReturnType<RowsPluginState>
  index: number
}

export function RowControls({ rows, index }: RowDragButtonProps) {
  function handleUp() {
    rows.move(index, index - 1)
  }

  function handleDown() {
    rows.move(index, index + 1)
    setTimeout(() => scrollToMovedRow(), 400)
  }

  function scrollToMovedRow() {
    const element = document.getElementById(rows[index].id)
    if (element) element.scrollIntoView({ block: 'nearest' })
  }

  return (
    <div
      className={cn(
        'row-controls',
        'absolute bottom-14 left-2 top-0 z-[22] flex flex-col justify-center gap-4',
        'rounded-l-md bg-white bg-opacity-70 opacity-0 transition-opacity'
      )}
    >
      <button
        className={cn(buttonStyles, index === 0 && 'hidden')}
        onClick={handleUp}
      >
        <div className={iconWrapperStyles} aria-hidden="true">
          <FaIcon icon={faAngleUp} className="text-xl" />
        </div>
      </button>

      <button
        className={cn(buttonStyles, index === rows.length - 1 && 'hidden')}
        onClick={handleDown}
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
