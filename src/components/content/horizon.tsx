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
        'px-side pt-8 pb-6 -ml-2.5'
      )}
    >
      {data.map((horizonEntry, index) => {
        return (
          <button
            className={clsx(
              'box-border',
              'py-4 px-2.5',
              'rounded hover:shadow-menu',
              'hidden mb-8 w-full sm:w-1/3 sm:mb-0 sm:block',
              'first:block sm:mr-6 max-w-screen-mobile'
            )}
            tabIndex={-1}
            key={index}
          >
            <Link
              className="text-brand-700 text-left leading-cozy hover:no-underline hover:text-truegray-700"
              href={horizonEntry.url}
              noExternalIcon
              path={[]}
            >
              <img
                className="mb-2.5 pr-1 h-auto"
                alt={horizonEntry.title}
                src={horizonEntry.imageUrl}
              />
              <h4 className="font-bold text-xl mx-0 mt-3 mb-1">
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
