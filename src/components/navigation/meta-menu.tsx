import clsx from 'clsx'
import { useRef, useEffect } from 'react'

import { Link } from '../content/link'
import { SecondaryNavigationData } from '@/data-types'

export interface MetaMenuProps {
  data: SecondaryNavigationData
}

export function MetaMenu({ data }: MetaMenuProps) {
  const activeRef = useRef<HTMLLIElement>(null)
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (containerRef.current && activeRef.current) {
      // investigate: this is currently not working
      containerRef.current.scrollLeft = activeRef.current.offsetLeft - 8
    }
  }, [])

  return (
    <>
      <nav className="overflow-x-scroll md:hidden">
        <div
          className={clsx(
            'absolute z-10 w-14 h-16 right-0',
            'bg-gradient-to-l from-white to-white/0',
            'pointer-events-none'
          )}
        />
        <ul className="whitespace-nowrap my-3.5 px-4 pt-3" ref={containerRef}>
          {data.map((entry, i) => {
            return (
              <li
                className={clsx(
                  'inline-block mr-4 py-[3px] font-bold text-[0.9rem]',
                  'border-b-2',
                  entry.active ? 'border-brand' : 'border-brand-150'
                )}
                key={entry.url}
                ref={entry.active ? activeRef : null}
              >
                <Link
                  href={entry.url}
                  path={[`metamenu${i}`]}
                  className="hover:no-underline"
                >
                  {entry.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <nav
        className={clsx(
          'hidden md:block absolute left-side',
          'w-[170px] z-10 mt-8 xl:w-[200px] xl:ml-side-lg xl:left-0'
        )}
      >
        <ul>
          {data.map((entry, i) => {
            return (
              <li className="mb-3.5" key={entry.url}>
                <Link
                  href={entry.url}
                  path={[`metamenu${i}`]}
                  className={clsx(
                    'serlo-button rounded-xl tracking-slightly-tighter py-[3px]',
                    entry.active
                      ? 'text-black bg-brand-150'
                      : 'serlo-make-interactive-transparent-blue'
                  )}
                >
                  {entry.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
