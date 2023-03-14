import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import {
  communityWallPersons,
  CommunityWallPerson,
} from '@/data/de/community-people'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import { shuffleArray } from '@/helper/shuffle-array'
import { CommunityWallPersons } from '../landing/rework/community-wall/community-wall-persons'

const positions = [
  ['8%', '-8%'],
  ['72%', '-14%'],
  ['60%', '57%'],
  ['82%', '22%'],
  ['17%', '39%'],
]

export function CommunityWallMitmachen() {
  const [persons, setPersons] = useState<CommunityWallPerson[]>([])

  useEffect(() => {
    // const persons = communityWallPersons.filter((person) =>
    //   person.subjects.includes(subject)
    // )
    setPersons(shuffleArray(communityWallPersons))
  }, [])

  return (
    <>
      <div className="z-10 justify-center relative mt-32">
        <div className="md:absolute text-center w-full z-20">
          <h3
            className={clsx(
              'text-center text-3xl font-extrabold',
              'leading-cozy tracking-tight',
              'max-w-xl mt-20 mx-auto relative z-10 mb-8'
            )}
          >
            Los geht's
          </h3>
          <p className="text-xl leading-cozy text-truegray-700 max-w-xl mx-auto">
            Möchtest du Teil der Serlo Community werden und dadurch freie
            Bildung ermöglichen? Melde dich an und werde Teil einer Bewegung!
          </p>
          <div className="group text-center">
            <Link
              className={clsx(
                'serlo-new-landing-button inline-block landing-button-with-wings bg-brandgreen hover:bg-brandgreen-400  before:!mt-[-1.1rem] after:!mt-[-1.1rem] mt-5 rounded-full'
              )}
              href="/auth/registration"
            >
              Jetzt Registrieren
            </Link>
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-wrap justify-evenly lg:max-w-[85rem] lg:mx-auto',
            'md:block md:pb-12 md:h-630 md:relative'
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
