import clsx from 'clsx'

import { Link } from './link'
import { HorizonData } from '@/data-types'

export interface HorizonProps {
  data: HorizonData
}

export function Horizon({ data }: HorizonProps) {
  return (
    <aside
      className={clsx(
        'sm:flex sm:items-stretch sm:justify-between',
        'px-side pt-8 pb-6 -ml-2.5'
      )}
    >
      {data.map((horizonEntry, index) => {
        return (
          <Link
            className={clsx(
              'text-brand text !no-underline box-border',
              'py-4 px-2.5 leading-cozy',
              'rounded hover:shadow-menu hover:text-truegray-700',
              'hidden mb-8 w-full sm:w-1/3 sm:mb:0 sm:block',
              'first:block sm:mr-6 max-w-screen-mobile'
            )}
            href={horizonEntry.url}
            key={index}
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
        )
      })}
    </aside>
  )
}
