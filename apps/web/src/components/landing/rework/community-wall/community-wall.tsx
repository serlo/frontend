import { useEffect, useState } from 'react'

import { CommunityWallPersons } from './community-wall-persons'
import { Link } from '@/components/content/link'
import {
  communityWallPersons,
  CommunityWallPerson,
} from '@/data/de/community-people'
import { cn } from '@/helper/cn'
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
      <div className="mt-20 bg-cw-green px-side py-16">
        <h3
          className={cn(`
            relative z-10 mx-auto max-w-2xl
            text-center text-2xl font-normal leading-snug text-black sm:text-3xl
          `)}
        >
          <span className="serlo-underlined pb-1 font-handwritten text-5xl text-brand">
            Gemeinsam
          </span>{' '}
          mit der Redaktion von Chancenwerk baut unsere große ehrenamtliche
          Community an Serlo.
        </h3>

        <div className="relative z-10 mt-10 flex justify-center">
          <div className="group text-center">
            <Link
              className="serlo-new-landing-button inline-block !font-normal !text-white hover:no-underline group-hover:bg-brand-500"
              href="/mitmachen"
            >
              Willst du mitmachen?
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex justify-center">
                <div
                  className={cn(`
                  pointer-events-none h-5 w-72 select-none
                  bg-underlined bg-contain bg-top
                  bg-no-repeat opacity-0 transition-all
                  duration-200 ease-linear group-hover:rotate-1 group-hover:opacity-100
                `)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(`
          mt-16 flex flex-wrap justify-evenly
          md:relative md:mb-72 md:block md:h-[630px]
        `)}
      >
        <CommunityWallPersons persons={persons} positions={positions} />
      </div>
    </section>
  )
}
