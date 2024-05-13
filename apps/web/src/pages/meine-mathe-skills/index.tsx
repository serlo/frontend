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
const filterKey = 'math-skills-filter'

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

const topicMap = {
  Potenzfunktionen: { tracks: [1], subtitles: ['Potenzfunktionen'] },
  'Quadratische Funktionen & Gleichungen': {
    tracks: [2],
    subtitles: [
      'Quadratische Funktionen',
      'Funktionen',
      'Quadratische Gleichungen',
    ],
  },
  'Exponentialfunktion & Logarithmus': {
    tracks: [1, 2],
    subtitles: ['Exponentialfunktion', 'Logarithmus'],
  },
  'Geometrie & Trigonometrie': {
    tracks: [1],
    subtitles: ['Trigonometrie', 'Geometrie', 'Raumgeometrie'],
  },
  Trigonometrie: {
    tracks: [2],
    subtitles: ['Trigonometrie', 'Geometrie'],
  },
  Abbildungen: { tracks: [1], subtitles: ['Abbildungen'] },

  'Daten & Zufall': { tracks: [1, 2], subtitles: ['Daten und Zufall'] },
  Raumgeometrie: { tracks: [2], subtitles: ['Raumgeometrie'] },
}

function Content() {
  const [track, setTrack] = useState<1 | 2>(() => {
    if (typeof sessionStorage === 'undefined') return 2
    const sessionTrack = parseInt(sessionStorage.getItem(sessionKey) ?? '2')
    return [1, 2].includes(sessionTrack) ? (sessionTrack as 1 | 2) : 2
  })
  const [filter, setFilter] = useState(() => {
    if (typeof sessionStorage === 'undefined') return 'all'
    return sessionStorage.getItem(filterKey) ?? 'all'
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

  const trackTasks = examTasks.filter(([, task]) => {
    if (task.track === 3) return true
    return task.track === track
  })

  const filteredTasks = trackTasks.filter(([, task]) => {
    if (filter === 'all') return true
    if (filter.startsWith('topic:')) {
      const topicKey = filter.replace('topic:', '')
      if (!Object.hasOwn(topicMap, topicKey)) return false
      return topicMap[topicKey as keyof typeof topicMap].subtitles.includes(
        task.subtitle
      )
    }
    if (filter === 'easy') return !task.difficulty || task.difficulty < 2
    if (filter === 'hard') return task.difficulty && task.difficulty > 1
    return false
  })

  // reset filter if topic in not on new track
  useEffect(() => {
    if (!filter.startsWith('topic:')) return
    const topicKey = filter.replace('topic:', '')
    if (
      !Object.hasOwn(topicMap, topicKey) ||
      !topicMap[topicKey as keyof typeof topicMap].tracks.includes(track)
    ) {
      setFilter('all')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, filteredTasks])

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
                  track === 1 && '!bg-opacity-50',
                  'my-5 inline-block rounded-lg px-2 py-1 text-2xl shadow-menu',
                  'bg-animal bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-10'
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
                  track === 2 && '!bg-opacity-50',
                  'my-5 ml-3 inline-block rounded-lg px-2 py-1 text-2xl shadow-menu',
                  'bg-animal bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-10'
                )}
                onClick={() => {
                  sessionStorage.setItem(sessionKey, '2')
                  setTrack(2)
                }}
              >
                Zweig II/III
              </button>
            </div>
            <div className="mb-10">
              <b>Filter:</b>
              <br />
              {renderFilterButton('all', 'Alle Aufgaben 🎓')}
              {Object.entries(topicMap).map(([topic, data]) => {
                if (!data.tracks.includes(track)) return null
                return renderFilterButton(`topic:${topic}`, topic)
              })}
              {renderFilterButton(
                'easy',
                <>
                  Nur leichtere Aufgaben <span className="font-emoji">✌️</span>
                </>
              )}
              {renderFilterButton(
                'hard',
                <>
                  Nur schwere Aufgaben <span className="font-emoji">🌶</span>
                </>
              )}
            </div>
            {track === 1 ? (
              <div>
                <h4 className="text-lg font-bold">
                  Teil A (ohne Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {filteredTasks
                    .filter(([, obj]) => obj.calculatorAllowed === false)
                    .map(([id, obj]) => renderCard(id, obj))}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {filteredTasks
                    .filter(([, task]) => task.calculatorAllowed === true)
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
                  {filteredTasks
                    .filter(([, task]) => task.calculatorAllowed === false)
                    .map((entry) => renderCard(...entry))}
                </div>
                <h4 className="text-lg font-bold">
                  Teil B (mit Taschenrechner)
                </h4>
                <div className="my-6 flex flex-wrap gap-3">
                  {filteredTasks
                    .filter(([, obj]) => obj.calculatorAllowed === true)
                    .map(([id, obj]) => renderCard(id, obj))}
                </div>
              </div>
            ) : null}
            <h4 className="mt-16 text-lg font-bold">Nützliche Links</h4>
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
                  Westermann Schulbuch{' '}
                  {track === 1 ? 'Zweig I' : 'Zweig II/III'}
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

  function renderFilterButton(filterName: string, text: string | JSX.Element) {
    const isActive = filter === filterName

    return (
      <button
        className={cn(
          isActive && '!bg-opacity-50',
          'my-1.5 mr-2 inline-block rounded-lg px-2 py-1 text-lg shadow-menu',
          'bg-animal bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-10'
        )}
        onClick={() => {
          if (isActive) return
          sessionStorage.setItem(filterKey, filterName)
          setFilter(filterName)
        }}
      >
        {text}
      </button>
    )
  }

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
          'text-base transition-colors hover:bg-opacity-25 hover:shadow-menu active:bg-opacity-25'
        )}
      >
        <p className="font-emoji text-lg">
          {data?.animal
            ? points.map(() => animalsData[data.animal].emoji)
            : null}
        </p>
        <p className="mb-2 text-xl">
          <b>{title}</b>
        </p>
        <p>({subtitle})</p>
        {renderDifficulty(difficulty)}
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
      <p className="mt-1.5 font-emoji text-sm" title={title}>
        {arrayOfLength(difficulty).map(() => '🌶')}
      </p>
    )
  }
}

export default ContentPage
