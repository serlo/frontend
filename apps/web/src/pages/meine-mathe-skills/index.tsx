/* eslint-disable @next/next/no-html-link-for-pages */
import { NextPage } from 'next'
import { useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { middleSchoolFinalExam } from '@/components/math-skills/exercises/middle-school-final-exam'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { animalsData } from '@/components/math-skills/utils/animal-data'
import { getPointsAmount } from '@/components/math-skills/utils/get-points-amount'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'
import { cn } from '@/helper/cn'

const sessionKey = 'math-skills-zweig'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const [track, setTrack] = useState<1 | 2>(() => {
    if (typeof sessionStorage === 'undefined') return 1
    const sessionTrack = parseInt(sessionStorage.getItem(sessionKey) ?? '1')
    return [1, 2].includes(sessionTrack) ? (sessionTrack as 1 | 2) : 1
  })
  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()

  const examTasks = Object.entries(middleSchoolFinalExam)
  return (
    <>
      <div className="mx-4 sm:mt-10 [@media(min-width:900px)]:mx-auto [@media(min-width:900px)]:max-w-[53rem]">
        <div className="sm:flex sm:flex-row-reverse sm:justify-end">
          <WelcomeSection />
        </div>
        {data.name ? (
          <>
            {' '}
            <h2 className="mt-10 text-2xl font-bold" id="aufgaben">
              Training Realschule Bayern (Abschlussprüfung):
            </h2>
            <div>
              <button
                className={cn(
                  track === 1 && 'bg-animal bg-opacity-50',
                  'my-5 inline-block rounded-lg px-2 py-1 text-2xl hover:shadow-menu'
                )}
                onClick={() => {
                  sessionStorage.setItem(sessionKey, '1')
                  setTrack(1)
                }}
              >
                Zweig I
              </button>
              <button
                className={cn(
                  track === 2 && 'bg-animal bg-opacity-50',
                  'my-5 ml-3 inline-block rounded-lg px-2 py-1 text-2xl hover:shadow-menu'
                )}
                onClick={() => {
                  sessionStorage.setItem(sessionKey, '2')
                  setTrack(2)
                }}
              >
                Zweig II/III
              </button>
            </div>
            {track === 1 ? (
              <div>
                <h4 className="text-lg font-bold">
                  Teil A (ohne Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, obj]) =>
                        obj.calculatorAllowed === false &&
                        (obj.track === 1 || (obj.track as number) === 3)
                    )
                    .map(([id, obj]) =>
                      renderCard(id, obj.title, obj.subtitle)
                    )}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, obj]) =>
                        obj.calculatorAllowed === true &&
                        ((obj.track as number) === 1 ||
                          (obj.track as number) === 3)
                    )
                    .map(([id, obj]) =>
                      renderCard(id, obj.title, obj.subtitle)
                    )}
                </div>
              </div>
            ) : null}
            {track === 2 ? (
              <div>
                <h4 className="text-lg font-bold">
                  Teil A (ohne Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, obj]) =>
                        obj.calculatorAllowed === false &&
                        (obj.track === 2 || (obj.track as number) === 3)
                    )
                    .map(([id, obj]) =>
                      renderCard(id, obj.title, obj.subtitle)
                    )}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, obj]) =>
                        obj.calculatorAllowed === true &&
                        ((obj.track as number) === 2 ||
                          (obj.track as number) === 3)
                    )
                    .map(([id, obj]) =>
                      renderCard(id, obj.title, obj.subtitle)
                    )}
                </div>
              </div>
            ) : null}
            <div className="h-24"></div>
          </>
        ) : null}
      </div>
    </>
  )

  function renderCard(id: string, title: string, subtitle: string) {
    const slug = `training-realschule-bayern/${id}`
    const { skillCent } = getExerciseData(slug)
    const points = Array.from({ length: getPointsAmount(skillCent) })

    return (
      <Link
        key={id}
        href={`/meine-mathe-skills/training-realschule-bayern/${id}`}
        className={cn(
          'flex aspect-square w-48 flex-col items-start justify-center rounded-2xl bg-animal bg-opacity-10 p-4 text-almost-black !no-underline',
          'text-xl transition-colors hover:bg-opacity-25 hover:shadow-menu active:bg-opacity-25'
        )}
      >
        <p className="mb-2">
          <b>{title}</b>
        </p>
        <p className="text-base">({subtitle})</p>
        <p className="mt-2 text-base">
          {data?.animal
            ? points.map(() => animalsData[data.animal].emoji)
            : null}
        </p>
      </Link>
    )
  }
}

export default ContentPage
