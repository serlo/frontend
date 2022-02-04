import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { CommunityWallPersons } from '../rework/community-wall/community-wall-persons'
import { Link } from '@/components/content/link'
import {
  communityWallPersons,
  CommunityWallPerson,
} from '@/data/de/community-people'
import { shuffleArray } from '@/helper/shuffle-array'

const positions = [
  ['8%', '-10%'],
  ['72%', '-18%'],
  ['65%', '56%'],
  ['82%', '22%'],
  ['15%', '42%'],
]

export function CommunityWallInformatik() {
  const [persons, setPersons] = useState<CommunityWallPerson[]>(
    communityWallPersons.filter((person) =>
      person.subjects.includes('informatik')
    )
  )

  useEffect(() => {
    setPersons((p) => shuffleArray(p))
  }, [])

  return (
    <>
      <div className="z-10 justify-center relative mt-32">
        <div className="md:absolute text-center w-full z-20">
          <h3
            className={clsx(
              'text-center text-4xl font-extrabold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-20 mx-auto relative z-10 mb-8'
            )}
          >
            Lust mitzumachen?
          </h3>
          <p className="jsx-1406289065 text-2xl leading-cozy text-truegray-700 max-w-2xl mx-auto">
            Alle Inhalte auf serlo.org werden von einer ehrenamtlichen Community
            aus Lehrkräften, Studierenden, Schüler*innen und anderen
            Bildungsbegeisterten gestaltet. Erweitere mit uns dieses Angebot um
            noch mehr Lernenden Bildung frei verfügbar zu machen!
          </p>
          <div className="group text-center">
            <Link
              className="mt-10 serlo-new-landing-button inline-block group-hover:bg-brand-light hover:no-underline"
              href="/mitmachen"
            >
              Mehr erfahren
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
            'md:block md:pb-12 md:h-630 md:relative lg:h-[770px]'
          )}
        >
          <CommunityWallPersons
            persons={persons}
            positions={positions}
            mobileLimit={3}
          />
        </div>
      </div>
    </>
  )
}
