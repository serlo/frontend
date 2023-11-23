import { useRef, useEffect } from 'react'

import { Link } from '../content/link'
import { SecondaryMenuData } from '@/data-types'
import { cn } from '@/helper/cn'

export interface SecondaryMenuProps {
  data: SecondaryMenuData['entries']
}

export function SecondaryMenu({ data }: SecondaryMenuProps) {
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
          className={cn(`
            pointer-events-none absolute right-0 z-10 h-16 w-14 
            bg-gradient-to-l from-white to-white/0
          `)}
        />
        <ul className="my-3.5 whitespace-nowrap px-4 pt-3" ref={containerRef}>
          {data.map((entry) => {
            return (
              <li
                className={cn(
                  'mr-4 inline-block border-b-2 py-[3px] text-[0.9rem] font-bold',
                  entry.active ? 'border-brand' : 'border-brand-200'
                )}
                key={entry.url}
                ref={entry.active ? activeRef : null}
              >
                <Link href={entry.url} className="hover:no-underline">
                  {entry.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <nav
        className={cn(`
          absolute left-side z-10 mt-8
          hidden w-[170px] md:block xl:left-0 xl:ml-side-lg xl:w-[200px]
        `)}
      >
        <ul>
          {data.map((entry) => {
            return (
              <li className="mb-1.5" key={entry.title}>
                <Link
                  href={entry.url ?? `/${entry.id}`}
                  className="group block py-1 hover:no-underline"
                  noExternalIcon
                >
                  <span
                    className={cn(
                      `serlo-button rounded-xl py-[3px] tracking-slightly-tighter
                      group-hover:bg-brand group-hover:text-white
                      `,
                      entry.active
                        ? 'bg-brand-200 text-black'
                        : 'serlo-button-blue-transparent'
                    )}
                  >
                    {entry.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
