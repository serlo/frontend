import clsx from 'clsx'
import { ReactNode, useState } from 'react'

import { isPrintMode } from '../print-mode'

export interface SpoilerProps {
  body: ReactNode
  title: ReactNode
}

export function Spoiler({ body, title }: SpoilerProps) {
  const [open, setOpen] = useState(isPrintMode)

  return (
    <div className="mb-block flex flex-col mobile:mx-side">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          `
            serlo-input-font-reset z-10 m-0 rounded-xl
            border-none bg-brand-100 py-2.5 px-side
            text-left text-lg leading-normal text-almost-black transition-colors
          `,
          open && 'rounded-bl-none bg-brand text-white'
        )}
      >
        <span className="flex">
          <span className="inline-block w-4">{open ? '▾ ' : '▸ '} </span>
          {title}
        </span>
      </button>

      {open && body}
    </div>
  )
}
