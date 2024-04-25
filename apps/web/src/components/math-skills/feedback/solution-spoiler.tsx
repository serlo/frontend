import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'

export interface SolutionSpoilerProps {
  title: JSX.Element
  content: JSX.Element
  openOverwrite?: boolean
  setOpenOverwrite?: (open: boolean) => void
  onOpen?: () => void
}

export function SolutionSpoiler({
  title,
  content,
  openOverwrite,
  setOpenOverwrite,
  onOpen,
}: SolutionSpoilerProps) {
  const [open, setOpen] = useState(false)
  const isOpen = openOverwrite === undefined ? open : openOverwrite

  const handleSpoilerClick = () => {
    setOpenOverwrite ? setOpenOverwrite(!isOpen) : setOpen(!open)
    onOpen && onOpen()
  }

  return (
    <div
      className={cn(
        'mb-block flex flex-col rounded-xl border-3 mobile:mx-side',
        '[&>div.my-block:first-of-type]:mt-5 border-animal',
        isOpen ? 'border-opacity-20' : ' border-opacity-10'
      )}
    >
      <button
        onClick={() => handleSpoilerClick()}
        className={cn(
          `
            serlo-input-font-reset m-0 border-none px-side py-2.5 bg-animal rounded-t-[9px]
            text-left text-lg leading-normal text-almost-black transition-colors
          `,
          isOpen ? 'bg-opacity-20' : 'bg-opacity-10'
        )}
      >
        <span className="flex">
          <span className="inline-block w-4">{isOpen ? '▾ ' : '▸ '} </span>
          {title}
        </span>
      </button>

      {isOpen ? content : null}
    </div>
  )
}
