import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { cn } from '@/helper/cn'
import { useMathSkillsStorage } from '@/components/math-skills/utils/math-skills-data-context'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: `Lernpfad High Five - meine Mathe-Skills`,
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const [selected, setSelected] = useState(-1)
  const [renderCounter, setRenderCounter] = useState(1)

  const { updateData, data } = useMathSkillsStorage()

  return (
    <div className="mx-auto w-fit px-4">
      {selected === -1 ? (
        <>
          <h2 className="mb-3 mt-8 text-2xl font-bold">High Five</h2>
          <p className="mb-7">
            <Link href="/meine-mathe-skills">zurück zur Lernpfad-Auswahl</Link>
          </p>
          <div
            className="relative h-[668px] w-[800px]"
            style={{
              backgroundImage: "url('/_assets/mathe-skills/high-five.jpg')",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 668"
              className="relative"
            >
              {Object.entries(levels).map(([id, levelData]) => {
                const lid = parseInt(id)
                if (
                  data.highFiveSolved.includes(lid) ||
                  levels[lid].deps.length === 0 ||
                  levels[lid].deps.some((dep) =>
                    data.highFiveSolved.includes(dep)
                  )
                )
                  return (
                    <Fragment key={id}>
                      {levelData.deps.map((dep) => {
                        if (data.highFiveSolved.includes(dep)) {
                          return (
                            <line
                              key={`connect-${id}-${dep}`}
                              x1={levelData.x}
                              y1={levelData.y}
                              x2={levels[dep].x}
                              y2={levels[dep].y}
                              strokeWidth="10"
                              stroke="rgba(148, 163, 184, 0.8)"
                            />
                          )
                        } else {
                          return null
                        }
                      })}
                    </Fragment>
                  )

                return null
              })}
            </svg>
            {Object.entries(levels).map(([id, levelData]) => (
              <div
                className="absolute flex w-0 items-center justify-center"
                style={{ left: `${levelData.x}px`, top: `${levelData.y}px` }}
                key={id}
              >
                <button
                  className={cn(
                    'absolute rounded  px-2 py-0.5 font-bold ',
                    data.highFiveSolved.includes(parseInt(id))
                      ? 'bg-gray-200 hover:bg-gray-300'
                      : 'bg-newgreen hover:bg-newgreen-600'
                  )}
                  onClick={() => {
                    setSelected(parseInt(id))
                  }}
                >
                  {levelData.title}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-[800px]">
          <h2 className="mb-3 mt-8 text-2xl font-bold">
            High Five - {levels[selected].title}
          </h2>
          <p>
            <button
              onClick={() => {
                setSelected(-1)
                setRenderCounter((counter) => counter + 1)
              }}
              className="serlo-link"
            >
              zurück
            </button>
          </p>
          <main className="mt-8 text-base [&>p]:my-4 [&>p]:text-lg">
            {levels[selected].component(renderCounter, () => {
              updateData((data) => {
                if (!data.highFiveSolved.includes(selected)) {
                  data.highFiveSolved.push(selected)
                }
                setSelected(-1)
              })
            })}
          </main>
        </div>
      )}
    </div>
  )
}

export default ContentPage

const levels: {
  [key: number]: {
    title: string
    x: number
    y: number
    component: (counter: number, onClose: () => void) => JSX.Element
    deps: number[]
  }
} = {
  0: {
    title: 'Start',
    x: 60,
    y: 50,
    deps: [],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Herzlich Willkommen bei der Tour durch die Highlights der 5. Klasse.
            Diese Tour wird entspannt, aber trotzdem (hoffentlich) nicht
            langweilig.
          </p>
          <p>
            Die 5. Klasse bietet einige abwechslungsreiche Themen. Gleichzeitig
            ist das eine gute Gelegenheit, deine Mathe-Skills etwas
            aufzufrischen.
          </p>
          <p>
            Die erste Aufgabe ist unten eingeblendet. Erreiche 40 Punkte, um die
            Aufgabe abzuschließen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/euro.php"
            height={420}
            target={40}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  1: {
    title: 'Start',
    x: 60,
    y: 200,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>TODO</p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/euro.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  2: {
    title: 'Römer',
    x: 160,
    y: 35,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>TODO</p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/euro.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  3: {
    title: 'Start',
    x: 160,
    y: 400,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>TODO</p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/euro.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
}

function RealmathInjection({
  url,
  height,
  onClose,
  target,
}: {
  url: string
  height?: number
  onClose: () => void
  target: number
}) {
  const [score, setScore] = useState(-1)

  function handler(e: MessageEvent) {
    const s = parseInt(e.data as string)
    console.log(e.data)
    setScore(isNaN(s) ? -1 : s)
  }

  useEffect(() => {
    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])
  return (
    <>
      <div className="mb-4 mt-12 w-full bg-gray-100 p-3">
        {score < target ? (
          <>
            Erreiche {target} Punkte. Aktueller Stand:{' '}
            <strong>{Math.max(score, 0)} Punkte</strong>
          </>
        ) : (
          <div className="text-center">
            <button
              className=" rounded bg-newgreen px-2 py-0.5 font-bold hover:bg-newgreen-600"
              onClick={onClose}
            >
              Super, Aufgabe abschließen
            </button>
          </div>
        )}
      </div>
      <iframe
        src={`/api/frontend/realmath/embed?url=${encodeURIComponent(url)}`}
        className={cn(
          'mb-8 w-full rounded-xl border-3',
          score >= target && 'opacity-35'
        )}
        style={{ height: `${height ?? 450}px` }}
      ></iframe>
    </>
  )
}
