import Image from 'next/image'
import { zip } from 'ramda'
import { Fragment } from 'react'

import { Link } from '@/components/content/link'
import { CommunityWallPerson } from '@/data/de/community-people'
import { cn } from '@/helper/cn'

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
            className={cn(
              `
                group z-30 mx-1 mt-12
                w-1/3v max-w-[13rem] text-center
                sm:w-1/4v md:absolute md:w-1/8v
              `,
              hideMobile && 'hidden md:block'
            )}
            style={{ left, top }}
          >
            <div className="relative z-0 w-full">
              <div
                className={cn(`
                  absolute -left-12 -right-12 bg-wiggle bg-contain
                  bg-no-repeat pb-6/5 opacity-0 transition-all
                  duration-200 ease-linear group-hover:rotate-1 group-hover:opacity-100
                `)}
              ></div>
            </div>
            <Link
              className="relative z-10 whitespace-nowrap hover:no-underline"
              href={`/user/profile/${name}`}
            >
              <div className="relative block aspect-square w-full">
                <Image
                  src={imgSrc}
                  alt={`Avatar von ${name}`}
                  fill
                  sizes="(max-width: 799px) 33vw, (max-width: 1023px) 25vw, 12.5vw"
                  className="rounded-full object-cover"
                />
              </div>
              <p className="mb-2 mt-2 text-base font-bold text-gray-700">
                @{name}
              </p>
              <span
                className={cn(
                  'rounded-2xl px-2 py-1 text-base font-bold text-white',
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
