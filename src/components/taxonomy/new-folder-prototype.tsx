import { faTimes } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

import { FaIcon } from '../fa-icon'
import { TaxonomyData } from '@/data-types'
import {
  FrontendExerciseGroupNode,
  FrontendExerciseNode,
  FrontendNodeType,
} from '@/frontend-node-types'
import { tw } from '@/helper/tw'
import { renderArticle } from '@/schema/article-renderer'

export interface NewFolderPrototypeProps {
  data: TaxonomyData
}

const hardcodedDataforDreisatz = [
  {
    title: 'Eiskugeln Preise',
    difficulty: 1,
    img: 'https://assets.serlo.org/5ca4f940-41ac-11ee-89f0-6196501948c9/image.png',
    type: 'Auswahlaufgabe',
  },
  {
    title: 'Kuchenrezept',
    difficulty: 1,
    img: 'https://assets.serlo.org/1c88de00-45ab-11ee-89f0-6196501948c9/image.jpg',
    type: 'Zuordnungsaufgabe',
  },
  {
    title: 'Vertiefungs\xADaufgaben',
    difficulty: 1,
    img: '',
    type: 'Auswahlaufgabe',
  },
  {
    title: 'Kinopreise berechnen',
    difficulty: 2,
    img: 'https://assets.serlo.org/83e53100-41ac-11ee-89f0-6196501948c9/image.png',
    type: 'Rechenaufgabe',
  },
  {
    title: 'Vertiefungs\xADaufgaben',
    difficulty: 2,
    img: '',
    type: 'Auswahlaufgabe',
  },
  {
    title: 'Wohnung streichen',
    difficulty: 2,
    img: 'https://assets.serlo.org/73d9ae70-459a-11ee-b109-a3f2e53ad6dd/image.jpg',
    type: 'Rechenaufgabe',
  },
  {
    title: 'Reisezeit nach Hogwarts',
    difficulty: 3,
    img: 'https://assets.serlo.org/b3deaf80-41ac-11ee-89f0-6196501948c9/image.png',
    type: 'Auswahlaufgabe',
  },
]

export function NewFolderPrototype({ data }: NewFolderPrototypeProps) {
  const [showInModal, setShowInModal] = useState(-1)

  const solved = JSON.parse(
    sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
  ) as number[]
  const [, triggerRender] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ;(window as any).__triggerRender = () => {
    triggerRender((x) => x + 1)
  }

  if (showInModal >= 0) {
    const element = data.exercisesContent[showInModal]
    element.positionOnPage = undefined

    const isSolved = solved.includes(element.context.id)
    return (
      <>
        <div className="fixed inset-0 z-[150] bg-gray-100"></div>
        <div
          className="exercise-modal fixed inset-0 z-[200] h-full"
          onClick={() => {
            setShowInModal(-1)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowInModal(-1)
            }
          }}
          tabIndex={-1}
        >
          <button
            onClick={() => {
              setShowInModal(-1)
            }}
            className={tw`
          absolute right-4 top-4 z-[300] h-10 w-10 rounded-full bg-blue-200 text-xl
          hover:bg-blue-300
        `}
          >
            <FaIcon icon={faTimes} />
          </button>
          <div
            className={tw`
          pointer-events-none relative
          z-[200] mx-auto flex
          h-full w-[900px] max-w-full flex-col overflow-y-hidden px-6
        `}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <ExerciseWrapper
              element={element}
              title={hardcodedDataforDreisatz[showInModal].title}
            />
          </div>
        </div>
        <style jsx global>{`
          body {
            position: fixed;
          }
        `}</style>
      </>
    )
  }
  return (
    <div className="mx-side flex flex-col items-center mobile:flex-row mobile:flex-wrap">
      {data.exercisesContent.map((exercise, i) => {
        const entry = hardcodedDataforDreisatz[i]
        const solved = JSON.parse(
          sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
        ) as number[]
        const isSolved = solved.includes(exercise.context.id)
        const solvedPercentage = exercise.children
          ? exercise.children.filter((child) =>
              solved.includes(child.context.id)
            ).length / exercise.children.length
          : -1
        return (
          <Fragment key={i}>
            <div
              className={tw`
                mb-5 mr-4 h-[238px] w-[176px] cursor-pointer
                rounded border hover:border-brand hover:shadow-xl hover:outline
                hover:outline-2 hover:outline-brand
              `}
              onClick={() => {
                setShowInModal(i)
              }}
            >
              <div
                className="flex h-24 w-full items-center justify-center bg-brand-100 bg-cover bg-center pt-2 text-center text-gray-600"
                style={
                  entry.img ? { backgroundImage: `url(${entry.img})` } : {}
                }
              >
                {entry.img ? null : (
                  /* eslint-disable-next-line @next/next/no-img-element*/
                  <img
                    alt="Serlo"
                    src={
                      entry.type === 'Auswahlaufgabe'
                        ? 'https://assets.serlo.org/65df4c50-41ab-11ee-89f0-6196501948c9/image.png'
                        : '/_assets/img/serlo-logo.svg'
                    }
                    width={74}
                    className="-mt-1"
                  ></img>
                )}
              </div>
              <div
                className={clsx(
                  'relative h-[140px] rounded-b',
                  isSolved && 'bg-brandgreen',
                  solvedPercentage > 0 && 'to-whote bg-gradient-to-r to-white',
                  solvedPercentage > 0 &&
                    solvedPercentage < 0.5 &&
                    'from-green-50',
                  solvedPercentage >= 0.5 && 'from-brandgreen'
                )}
              >
                <div className="h-[74px] px-2 py-1 text-lg font-bold">
                  {entry.title}
                </div>
                <div className="h-8 px-2 py-1 text-sm">{entry.type}</div>
                <div className="h-8 px-2 py-1 text-sm">
                  {renderDifficulty(entry.difficulty)}
                </div>
              </div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

function renderDifficulty(dif: number) {
  if (dif === 1) {
    return (
      <>
        <span className="inline-block w-14">leicht</span> ★☆☆
      </>
    )
  }
  if (dif === 2) {
    return (
      <>
        <span className="inline-block w-14">mittel</span> ★★☆
      </>
    )
  }
  if (dif === 3) {
    return (
      <>
        <span className="inline-block w-14">knifflig</span> ★★★
      </>
    )
  }
  return null
}

function ExerciseWrapper({
  element,
  title,
}: {
  element: FrontendExerciseGroupNode | FrontendExerciseNode
  title: string
}) {
  const [index, setIndex] = useState(0)
  const solved = JSON.parse(
    sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
  ) as number[]
  // element.children![index].positionInGroup = undefined
  return (
    <>
      <div className="flex-1"></div>
      <div className="flex-1">
        <div className="pointer-events-auto max-h-[calc(100vh-150px)] overflow-y-auto rounded-xl bg-white ">
          <div>
            <h2 className="mx-side hyphens-manual text-lg font-bold">
              {title}
            </h2>
            <div key={index}>{renderArticle([element])}</div>
          </div>
        </div>
        <div className=" flex justify-between">
          <button className="serlo-button-blue-transparent pointer-events-auto">
            vorherige Teilaufgabe
          </button>
          <button className="serlo-button-blue-transparent pointer-events-auto">
            nächste Teilaufgabe
          </button>
        </div>
        <style jsx global>{`
          li.serlo-grouped-exercise-wrapper:before {
            display: none;
          }
          li.serlo-grouped-exercise-wrapper {
            list-style-type: none;
          }
        `}</style>
      </div>
      <div className="flex-1"></div>
    </>
  )
}

/*


{element.type === FrontendNodeType.Exercise ? (
              <div className="pointer-events-auto flex-1 overflow-y-auto rounded-xl bg-white">
                {renderArticle(
                  [element],
                  `tax${data.id}`,
                  `ex${element.context.id}`
                )}
                {isSolved && (
                  <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                    <button
                      className="serlo-button-green"
                      onClick={() => {
                        setShowInModal(-1)
                      }}
                    >
                      zurück zur Übersicht
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <ExerciseGroupWrapper
                element={element}
                title={hardcodedDataforDreisatz[showInModal].title}
              />
            )}


            */
