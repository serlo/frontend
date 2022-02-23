import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { CommunityWallPersons } from '../rework/community-wall/community-wall-persons'
import { Link } from '@/components/content/link'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import {
  communityWallPersons,
  CommunityWallPerson,
} from '@/data/de/community-people'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import { shuffleArray } from '@/helper/shuffle-array'

const positions = [
  ['8%', '-8%'],
  ['72%', '-14%'],
  ['60%', '57%'],
  ['82%', '22%'],
  ['17%', '39%'],
]

export function CommunityWallSubjectLanding({
  subject,
}: {
  subject: deSubjectLandingSubjects
}) {
  const [persons, setPersons] = useState<CommunityWallPerson[]>(
    communityWallPersons.filter((person) => person.subjects.includes(subject))
  )

  useEffect(() => {
    setPersons((p) => shuffleArray(p))
  }, [])

  const { title } = deSubjectLandingData[subject]

  return (
    <>
      <div className="z-10 justify-center relative mt-32">
        <div className="md:absolute text-center w-full z-20">
          <h3
            className={clsx(
              'text-center text-3xl font-extrabold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-20 mx-auto relative z-10 mb-8'
            )}
          >
            Lust das Fach {title} mitzugestalten?
          </h3>
          <p className="jsx-1406289065 text-xl leading-cozy text-truegray-700 max-w-xl mx-auto">
            Alle Inhalte auf serlo.org werden von einer ehrenamtlichen Community
            aus Lehrkräften, Studierenden, Schüler*innen und anderen
            Bildungsbegeisterten gestaltet. Erweitere mit uns das Angebot von{' '}
            <b>Serlo {title}</b>, um noch mehr Lernenden Bildung frei verfügbar
            zu machen!
          </p>
          <div className="group text-center">
            <Link
              className={clsx(
                'serlo-new-landing-button inline-block group-hover:bg-brand-light hover:no-underline',
                'mt-6 py-2 px-4 text-lg'
              )}
              href="/49982/neu-hier"
            >
              Mehr erfahren
            </Link>
            <div className="relative">
              <div className="absolute flex justify-center inset-0">
                <div
                  className={clsx(
                    'pointer-events-none select-none h-5 w-48',
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
            'flex flex-wrap justify-evenly lg:max-w-[85rem] lg:mx-auto',
            'md:block md:pb-12 md:h-630 md:relative lg:h-[75vh]'
          )}
        >
          <CommunityWallPersons
            persons={persons}
            positions={positions}
            mobileLimit={4}
          />
        </div>
      </div>
    </>
  )
}
