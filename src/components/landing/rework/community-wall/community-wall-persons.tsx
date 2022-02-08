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
              'mt-12 mx-1 text-center group',
              'w-1/3v sm:w-1/4v md:w-1/8v md:absolute z-30',
              'max-w-[13rem]',
              hideMobile && 'hidden md:block'
            )}
            style={{ left, top }}
          >
            <div className="relative w-full z-0">
              <div
                className={clsx(
                  'bg-wiggle absolute -left-12 -right-12 pb-6/5',
                  'bg-no-repeat bg-contain opacity-0 group-hover:opacity-100',
                  'transition-all ease-linear duration-200 group-hover:rotate-1'
                )}
              ></div>
            </div>
            <Link
              className="hover:no-underline relative z-10 whitespace-nowrap"
              href={`/user/profile/${name}`}
            >
              <img
                src={imgSrc}
                alt={`Avatar von ${name}`}
                className="rounded-full w-full"
              />
              <p className="text-base mt-2 mb-2 font-bold text-gray-700">
                @{name}
              </p>
              <span
                className={clsx(
                  'text-white text-base font-bold px-2 py-1',
                  'rounded-2xl',
                  role.includes('Autor')
                    ? 'bg-yellow'
                    : role.includes('Team')
                    ? 'bg-brand-light'
                    : role.includes('Lehrer')
                    ? 'bg-newgreen'
                    : 'bg-berry'
                )}
              >
                {role}
              </span>
            </Link>
          </figure>
          {lineBreak && <div className="md:hidden h-0 w-full"></div>}
        </Fragment>
      )
    })
  }
}
