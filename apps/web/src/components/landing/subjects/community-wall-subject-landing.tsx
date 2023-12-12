import { cn } from '@serlo/tailwind/helper/cn'
import { useEffect, useState } from 'react'

import { CommunityWallPersons } from '../rework/community-wall/community-wall-persons'
import { Link } from '@/components/content/link'
import type { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import {
  communityWallPersons,
  type CommunityWallPerson,
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
  const [persons, setPersons] = useState<CommunityWallPerson[]>([])

  useEffect(() => {
    const persons = communityWallPersons.filter((person) =>
      person.subjects.includes(subject)
    )
    setPersons(shuffleArray(persons))
  }, [subject])

  const { title, contributeLink } = deSubjectLandingData[subject]

  return (
    <>
      <div className="relative z-10 mt-32 justify-center">
        <div className="z-20 w-full text-center md:absolute">
          <h3
            className={cn(`
                relative z-10 mx-auto
                mb-8 mt-20
                max-w-xl text-center text-3xl font-extrabold leading-cozy tracking-tight
              `)}
          >
            Lust, das Fach {title} mitzugestalten?
          </h3>
          <p className="jsx-1406289065 mx-auto max-w-xl text-xl leading-cozy text-almost-black">
            Alle Inhalte auf serlo.org werden von einer ehrenamtlichen Community
            aus Lehrkräften, Studierenden, Schüler*innen und anderen
            Bildungsbegeisterten gestaltet. Erweitere mit uns das Angebot von{' '}
            <b>Serlo {title}</b>, um noch mehr Lernenden Bildung frei verfügbar
            zu machen!
          </p>
          <div className="group text-center">
            <Link
              className={cn(`
                serlo-new-landing-button mt-6 inline-block px-4
                py-2 text-lg hover:no-underline group-hover:bg-brand-500
              `)}
              href={contributeLink}
            >
              Mitmachen
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex justify-center">
                <div
                  className={cn(`
                    pointer-events-none h-5 w-48 select-none
                    bg-underlined bg-contain bg-top
                    bg-no-repeat opacity-0 transition-all
                    duration-200 ease-linear group-hover:rotate-1 group-hover:opacity-100
                  `)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(`
            flex flex-wrap justify-evenly md:relative md:block
            md:h-630 md:pb-12 lg:mx-auto lg:max-w-[85rem]
          `)}
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
