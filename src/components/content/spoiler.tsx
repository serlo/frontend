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
    <div className="flex flex-col mb-block mobile:mx-side">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'serlo-input-font-reset text-lg text-left leading-normal',
          'bg-brand-100 text-truegray-800 border-none rounded-xl',
          'm-0 py-2.5 px-side transition-colors z-10',
          open && 'text-white bg-brand rounded-bl-none'
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
