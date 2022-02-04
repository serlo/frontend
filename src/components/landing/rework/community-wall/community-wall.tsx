import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { CommunityWallPersons } from './community-wall-persons'
import { Link } from '@/components/content/link'
import {
  communityWallPersons,
  CommunityWallPerson,
} from '@/data/de/community-people'
import { shuffleArray } from '@/helper/shuffle-array'

const positions = [
  ['8%', '-5%'],
  ['80%', '2%'],
  ['38%', '12%'],
  ['60%', '18%'],
  ['19%', '36%'],
  ['49%', '59%'],
  ['73%', '48%'],
  ['4%', '74%'],
  ['30%', '84%'],
  ['65%', '89%'],
]

export function CommunityWall() {
  const [persons, setPersons] =
    useState<CommunityWallPerson[]>(communityWallPersons)

  useEffect(() => {
    setPersons((p) => shuffleArray(p))
  }, [])

  return (
    <section className="overflow-hidden">
      <h3
        className={clsx(
          'text-center text-4xl text-truegray-700 font-bold',
          'leading-cozy tracking-tight',
          'max-w-2xl mt-32 mx-auto relative z-10 px-2'
        )}
      >
        Wir sind eine große, ehrenamtliche Community und gestalten Serlo
        <p className="text-brand italic font-handwritten text-5xl">
          gemeinsam.
        </p>
      </h3>
      <div className="relative z-0 h-0 w-full mt-1">
        <div
          className={clsx(
            'absolute inset-0 -mt-14 h-32 ml-5',
            'bg-circled-and-arrow bg-no-repeat bg-top bg-contain'
          )}
        ></div>
      </div>

      <div className="mt-16 z-10 flex justify-center relative">
        <div className="group text-center">
          <Link
            className="serlo-new-landing-button inline-block group-hover:bg-brand-light hover:no-underline"
            href="/mitmachen"
          >
            Magst du mitmachen?
          </Link>
          <div className="relative">
            <div className="absolute flex justify-center inset-0">
              <div
                className={clsx(
                  'pointer-events-none select-none w-72 h-5',
                  'group-hover:opacity-100 opacity-0 group-hover:rotate-1',
                  'transition-all ease-linear duration-200',
                  'bg-underlined bg-contain bg-no-repeat bg-top'
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-wrap justify-evenly',
          'md:relative md:block md:mb-72 md:h-630'
        )}
      >
        <CommunityWallPersons persons={persons} positions={positions} />
      </div>
    </section>
  )
}
