import clsx from 'clsx'
import { useState } from 'react'

import { tw } from '@/helper/tw'

export interface SpoilerRendererProps {
  title: JSX.Element
  content: JSX.Element
  openOverwrite?: boolean
}

export function SpoilerRenderer({
  title,
  content,
  openOverwrite,
}: SpoilerRendererProps) {
  const [open, setOpen] = useState(false)
  const isOpen = openOverwrite === undefined ? open : openOverwrite

  return (
    <div className="mb-block flex flex-col mobile:mx-side">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          tw`
            serlo-input-font-reset z-10 m-0 rounded-xl
            border-none bg-brand-100 py-2.5 px-side
            text-left text-lg leading-normal text-almost-black transition-colors
          `,
          isOpen && 'rounded-bl-none bg-brand text-white'
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
