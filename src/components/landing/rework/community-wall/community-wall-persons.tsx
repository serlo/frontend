import clsx from 'clsx'
import { zip } from 'ramda'
import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import { CommunityWallPerson } from '@/data/de/community-people'

interface CommunityWallPersonsProps {
  persons: CommunityWallPerson[]
  positions: string[][]
  mobileLimit?: number
}

export function CommunityWallPersons({
  persons,
  positions,
  mobileLimit = 6,
}: CommunityWallPersonsProps) {
  return <>{renderPersons()}</>
  function renderPersons() {
    return zip(persons, positions).map((arg, index) => {
      const [{ name, role, imgSrc }, [left, top]] = arg
      const lineBreak = index % 5 === 1
      const hideMobile = index > mobileLimit - 1

      return (
        <Fragment key={name}>
          <figure
            className={clsx(
              'group mx-1 mt-12 text-center',
              'z-30 w-1/3v sm:w-1/4v md:absolute md:w-1/8v',
              'max-w-[13rem]',
              hideMobile && 'hidden md:block'
            )}
            style={{ left, top }}
          >
            <div className="relative z-0 w-full">
              <div
                className={clsx(
                  'absolute -left-12 -right-12 bg-wiggle pb-6/5',
                  'bg-contain bg-no-repeat opacity-0 group-hover:opacity-100',
                  'transition-all duration-200 ease-linear group-hover:rotate-1'
                )}
              ></div>
            </div>
            <Link
              className="relative z-10 whitespace-nowrap hover:no-underline"
              href={`/user/profile/${name}`}
            >
              <img
                src={imgSrc}
                alt={`Avatar von ${name}`}
                className="aspect-square w-full rounded-full object-cover"
              />
              <p className="mt-2 mb-2 text-base font-bold text-gray-700">
                @{name}
              </p>
              <span
                className={clsx(
                  'px-2 py-1 text-base font-bold text-white',
                  'rounded-2xl',
                  role.includes('Autor')
                    ? 'bg-yellow'
                    : role.includes('Team')
                    ? 'bg-brand-500'
                    : role.includes('Lehrer')
                    ? 'bg-newgreen'
                    : 'bg-berry'
                )}
              >
                {role}
              </span>
            </Link>
          </figure>
          {lineBreak && <div className="h-0 w-full md:hidden"></div>}
        </Fragment>
      )
    })
  }
}
