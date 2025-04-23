import { cn } from '@editor/utils/cn'
import { useState, type JSX } from 'react';

export interface SpoilerRendererProps {
  title: JSX.Element
  children: JSX.Element
  openOverwrite?: boolean
  onOpen?: () => void
}

export function SpoilerRenderer({
  title,
  children,
  openOverwrite,
  onOpen,
}: SpoilerRendererProps) {
  const [open, setOpen] = useState(false)
  const isOpen = openOverwrite === undefined ? open : openOverwrite

  const handleSpoilerClick = () => {
    setOpen(!open)
    onOpen?.()
  }

  return (
    <div
      className={cn(
        'mb-block flex flex-col rounded-lg border-3',
        '[&>div.my-block:first-of-type]:mt-5',
        isOpen ? 'border-brand-200' : 'border-brand-100'
      )}
    >
      <button
        onClick={() => handleSpoilerClick()}
        className={cn(
          `
            serlo-input-font-reset m-0 border-none px-side py-2.5
            text-left text-lg leading-normal text-almost-black transition-colors
          `,
          isOpen ? 'bg-brand-200' : 'bg-brand-100'
        )}
      >
        <span className="flex">
          <span className="inline-block w-4">{isOpen ? '▾ ' : '▸ '} </span>
          {title}
        </span>
      </button>

      {isOpen ? children : null}
    </div>
  )
}
