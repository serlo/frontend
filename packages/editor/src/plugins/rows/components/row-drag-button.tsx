import { FaIcon } from '@editor/editor-ui/fa-icon'
import { StateTypeReturnType } from '@editor/types/internal__plugin-state'
import { cn } from '@editor/utils/cn'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import type { RowsPluginState } from '..'

interface RowDragButtonProps {
  rows: StateTypeReturnType<RowsPluginState>
  index: number
}

export function RowDragButton({ rows, index }: RowDragButtonProps) {
  function handleUp() {
    rows.move(index, index - 1)
  }

  function handleDown() {
    rows.move(index, index + 1)
    scrollToMovedRow()
  }

  function scrollToMovedRow() {
    const element = document.getElementById(rows[index].id)
    if (element) setTimeout(() => element.scrollIntoView({ block: 'nearest' }))
  }

  return (
    <div
      className={cn(
        'rows-tools',
        'absolute bottom-14 left-2 top-0 z-[22] flex flex-col justify-center gap-2',
        'rounded-l-md bg-white bg-opacity-70 opacity-0 transition-opacity'
      )}
    >
      <button
        className={cn(buttonStyles, index === 0 && 'hidden')}
        onClick={handleUp}
      >
        <div className={iconWrapperStyles} aria-hidden="true">
          <FaIcon icon={faCaretUp} />
        </div>
      </button>

      <button
        className={cn(buttonStyles, index === rows.length - 1 && 'hidden')}
        onClick={handleDown}
      >
        <div className={iconWrapperStyles} aria-hidden="true">
          <FaIcon icon={faCaretDown} />
        </div>
      </button>
    </div>
  )
}

const buttonStyles = cn(`
  serlo-tooltip-trigger -mt-[3px] cursor-grab select-none
  border-0 bg-none active:cursor-grabbing
`)

const iconWrapperStyles = cn(`
  serlo-button-edit-primary rounded-full bg-transparent px-1.5
  py-0.5 text-almost-black hover:bg-editor-primary-200
`)
