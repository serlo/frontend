import clsx from 'clsx'

import { Link } from './link'
import { HorizonData } from '@/data-types'

export interface HorizonProps {
  data: HorizonData
}

export function Horizon({ data }: HorizonProps) {
  return (
    <aside
      id="horizon"
      className={clsx(
        'sm:flex sm:items-stretch sm:justify-between',
        '-ml-2.5 px-side pt-8 pb-6'
      )}
    >
      {data.map((horizonEntry, index) => {
        return (
          <button
            className={clsx(
              'box-border',
              'py-4 px-2.5',
              'rounded hover:shadow-menu',
              'mb-8 hidden w-full sm:mb-0 sm:block sm:w-1/3',
              'max-w-screen-mobile first:block sm:mr-6'
            )}
            tabIndex={-1}
            key={index}
          >
            <Link
              className="text-left leading-cozy text-brand-700 hover:text-almost-black hover:no-underline"
              href={horizonEntry.url}
              noExternalIcon
            >
              <img
                className="mb-2.5 h-auto pr-1"
                alt={horizonEntry.title}
                src={horizonEntry.imageUrl}
              />
              <h4 className="mx-0 mt-3 mb-1 text-xl font-bold">
                {horizonEntry.title}
              </h4>
              <p className="m-0">{horizonEntry.text}</p>
            </Link>
          </button>
        )
      })}
    </aside>
  )
}
