import clsx from 'clsx'
import { useRef, useEffect } from 'react'

import { Link } from '../content/link'
import { SecondaryNavigationData } from '@/data-types'

export interface MetaMenuProps {
  data: SecondaryNavigationData
  hackForSubjectLanding?: boolean
  onClick?: (index: number) => void
}

export function MetaMenu({
  data,
  hackForSubjectLanding,
  onClick,
}: MetaMenuProps) {
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
            'bg-gradient-to-l',
            hackForSubjectLanding
              ? 'from-[#FFEFDA] to-[#FFEFDA00]'
              : 'from-white to-white/0',
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
          hackForSubjectLanding
            ? 'ml-side'
            : 'mt-8 absolute left-side  xl:left-0',
          'hidden md:block text-left',
          'w-[170px] z-10 xl:w-[200px] xl:ml-side-lg'
        )}
      >
        <ul>
          {data.map((entry, i) => {
            const className = clsx(
              'serlo-button rounded-xl tracking-slightly-tighter py-[3px]',
              entry.active
                ? hackForSubjectLanding
                  ? 'text-black bg-brand-300'
                  : 'text-black bg-brand-150'
                : 'serlo-make-interactive-transparent-blue'
            )

            return (
              <li className="mb-3.5" key={entry.url}>
                {onClick ? (
                  <a onClick={() => onClick(i)} className={className}>
                    {entry.title}
                  </a>
                ) : (
                  <Link
                    href={entry.url}
                    path={[`metamenu${i}`]}
                    className={className}
                  >
                    {entry.title}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
