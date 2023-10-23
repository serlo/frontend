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
    <div
      className={clsx(
        'mb-block flex flex-col rounded-xl border-3 mobile:mx-side',
        '[&>div.my-block:first-of-type]:mt-5',
        isOpen ? 'border-brand-200' : 'border-brand-100'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          tw`
            serlo-input-font-reset z-10 m-0 border-none px-side py-2.5
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

      {isOpen ? content : null}
    </div>
  )
}
