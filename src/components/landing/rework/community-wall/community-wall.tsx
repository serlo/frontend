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
  const [persons, setPersons] = useState<CommunityWallPerson[]>(
    communityWallPersons.filter((person) => person.subjects.includes('landing'))
  )

  useEffect(() => {
    setPersons((p) => shuffleArray(p))
  }, [])

  return (
    <section className="overflow-hidden">
      <h3
        className={clsx(
          'text-center text-4xl font-bold text-almost-black',
          'leading-cozy tracking-tight',
          'relative z-10 mx-auto mt-32 max-w-2xl px-2'
        )}
      >
        Wir sind eine große, ehrenamtliche Community und gestalten Serlo
        <p className="font-handwritten text-5xl italic text-brand">
          gemeinsam.
        </p>
      </h3>
      <div className="relative z-0 mt-1 h-0 w-full">
        <div
          className={clsx(
            'absolute inset-0 -mt-14 ml-5 h-32',
            'bg-circled-and-arrow bg-contain bg-top bg-no-repeat'
          )}
        ></div>
      </div>

      <div className="relative z-10 mt-16 flex justify-center">
        <div className="group text-center">
          <Link
            className="serlo-new-landing-button inline-block hover:no-underline group-hover:bg-brand-500"
            href="/mitmachen"
          >
            Magst du mitmachen?
          </Link>
          <div className="relative">
            <div className="absolute inset-0 flex justify-center">
              <div
                className={clsx(
                  'pointer-events-none h-5 w-72 select-none',
                  'opacity-0 group-hover:rotate-1 group-hover:opacity-100',
                  'transition-all duration-200 ease-linear',
                  'bg-underlined bg-contain bg-top bg-no-repeat'
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-wrap justify-evenly',
          'md:relative md:mb-72 md:block md:h-630'
        )}
      >
        <CommunityWallPersons persons={persons} positions={positions} />
      </div>
    </section>
  )
}
