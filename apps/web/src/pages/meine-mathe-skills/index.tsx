/* eslint-disable @next/next/no-html-link-for-pages */
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import {
  MiddleSchoolTask,
  middleSchoolFinalExam,
} from '@/components/math-skills/exercises/middle-school-final-exam'
import { WelcomeSection } from '@/components/math-skills/landing/welcome-section'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { animalsData } from '@/components/math-skills/utils/animal-data'
import { getPointsAmount } from '@/components/math-skills/utils/get-points-amount'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '@/components/math-skills/utils/math-skills-data-context'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

const sessionKey = 'math-skills-zweig'

const examTasks = Object.entries(middleSchoolFinalExam) as [
  string,
  MiddleSchoolTask,
][]

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
  const router = useRouter()
  const { getExerciseData } = useExerciseData()
  const { data } = useMathSkillsStorage()

  // manually restore scroll position
  useEffect(() => {
    const key = 'overview-scroll-pos'
    const restoredValue = parseInt(sessionStorage.getItem(key) ?? '0')

    setTimeout(() => {
      if (restoredValue > 100) window.scroll(0, restoredValue)
    }, 10)

    const exitingFunction = () => {
      sessionStorage.setItem(key, String(Math.round(window.scrollY)))
    }
    router.events.on('routeChangeStart', exitingFunction)
    return () => router.events.off('routeChangeStart', exitingFunction)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="mx-4 sm:mt-10 [@media(min-width:900px)]:mx-auto [@media(min-width:900px)]:max-w-[53rem]">
        <div className="sm:flex sm:flex-row-reverse sm:justify-end">
          <WelcomeSection />
        </div>
        {data.name ? (
          <>
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
                        (obj.track === 1 || obj.track === 3)
                    )
                    .map(([id, obj]) => renderCard(id, obj))}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, task]) =>
                        task.calculatorAllowed === true &&
                        (task.track === 1 || task.track === 3)
                    )
                    .map((entry) => renderCard(...entry))}
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
                      ([, task]) =>
                        task.calculatorAllowed === false &&
                        (task.track === 2 || task.track === 3)
                    )
                    .map((entry) => renderCard(...entry))}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {examTasks
                    .filter(
                      ([, obj]) =>
                        obj.calculatorAllowed === true &&
                        (obj.track === 2 || (obj.track as number) === 3)
                    )
                    .map(([id, obj]) => renderCard(id, obj))}
                </div>
              </div>
            ) : null}
            <h4 className="mt-8 text-lg font-bold">Nützliche Links</h4>
            <ul className="serlo-ul">
              <li>
                <a
                  className="serlo-link"
                  href="https://www.isb.bayern.de/fileadmin/user_upload/Realschule/Mathematik/Formelsammlung_Realschule/merkhilfe_mathematik_2019.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Merkhilfe Mathematik
                </a>
              </li>
              <li>
                <a
                  className="serlo-link"
                  href={
                    track === 1
                      ? 'https://blickinsbuch.westermann.de/978-3-14-123671-2/index-h5.html#page=1'
                      : 'https://blickinsbuch.westermann.de/978-3-14-123680-4/index-h5.html#page=1'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Westermann Schulbuch
                </a>
              </li>
              <li>
                <a
                  className="serlo-link"
                  href="https://realmath.de"
                  target="_blank"
                  rel="noreferrer"
                >
                  Übungen zum Grundwissen auf realmath
                </a>
              </li>
              <li>
                <a
                  className="serlo-link"
                  href={
                    track === 1
                      ? 'https://de.serlo.org/mathe/75049/abschlusspr%C3%BCfungen-mathematik-mit-l%C3%B6sung-zweig-i'
                      : 'https://de.serlo.org/mathe/76750/abschlusspr%C3%BCfungen-mathematik-mit-l%C3%B6sungen-zweig-ii-und-iii'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Serlo: Abschlussprüfungen der letzten Jahre mit Lösungen
                </a>
              </li>
              <li>
                <a
                  className="serlo-link"
                  href="https://pruefungsarchiv.mebis.bycs.de/archiv.php?doc=record&identifier=BY-00303812"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abschlussprüfung 2023 im mebis Prüfungsarchiv
                </a>
              </li>
            </ul>
            <div className="h-24"></div>
          </>
        ) : null}
      </div>
    </>
  )

  function renderCard(id: string, task: MiddleSchoolTask) {
    const slug = `training-realschule-bayern/${id}`
    const { skillCent } = getExerciseData(slug)
    const points = Array.from({ length: getPointsAmount(skillCent) })

    const { title, subtitle, difficulty } = task

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
        <p className="text-base">
          ({subtitle}){renderDifficulty(difficulty)}
        </p>
        <p className="mt-2 text-base">
          {data?.animal
            ? points.map(() => animalsData[data.animal].emoji)
            : null}
        </p>
      </Link>
    )
  }

  function renderDifficulty(difficulty: MiddleSchoolTask['difficulty']) {
    if (!difficulty || difficulty < 2) return null // 0 or undefined

    const title = [
      '',
      'Bisschen schwerere Aufgabe',
      'Schwere Aufgabe',
      'Profi Level',
    ][difficulty]
    return (
      <span className="block" title={title}>
        {arrayOfLength(difficulty).map(() => '🌶')}
      </span>
    )
  }
}

export default ContentPage
