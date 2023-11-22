import {
  faCaretLeft,
  faCaretRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { FaIcon } from '../fa-icon'
import { TaxonomyData } from '@/data-types'
import { tw } from '@/helper/tw'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import {
  EditorExerciseDocument,
  EditorTemplateExerciseGroupDocument,
} from '@/serlo-editor/types/editor-plugins'
import { isTemplateExerciseGroupDocument } from '@/serlo-editor/types/plugin-type-guards'

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

  // const solved = JSON.parse(
  //   sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
  // ) as number[]

  useHotkeys(['esc'], () => {
    setShowInModal(-1)
  })

  if (showInModal >= 0) {
    const element = data.exercisesContent[showInModal]
    // const isSolved = solved.includes(element.context.id)
    return (
      <>
        <div className="fixed inset-0 z-[150] bg-gray-100"></div>
        <div
          className="exercise-modal fixed inset-0 z-[200] h-full"
          onClick={() => {
            //setShowInModal(-1)
          }}
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
              close={() => {
                setShowInModal(-1)
              }}
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
        const solved =
          typeof window !== 'undefined'
            ? (JSON.parse(
                sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
              ) as number[])
            : undefined

        const solvedPercentage = isTemplateExerciseGroupDocument(exercise)
          ? exercise.state.exercises.filter(
              (exercise) =>
                exercise.serloContext?.uuid &&
                solved?.includes(exercise.serloContext.uuid)
            ).length / exercise.state.exercises.length
          : -1

        const isSolved =
          (exercise.serloContext?.uuid &&
            solved?.includes(exercise.serloContext?.uuid)) ||
          solvedPercentage === 1

        return (
          <Fragment key={i}>
            <div
              className={tw`
                relative mb-5 mr-4 h-[238px] w-[176px]
                cursor-pointer rounded border hover:border-brand hover:shadow-xl
                hover:outline hover:outline-2 hover:outline-brand
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
                  isSolved && 'bg-brandgreen'
                )}
              >
                <div className="h-[74px] px-2 py-1 text-lg font-bold">
                  {entry.title}
                </div>
                <div className="h-8 px-2 py-1 text-sm">{entry.type}</div>
                <div className="h-8 px-2 py-1 text-sm">
                  {renderDifficulty(entry.difficulty)}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1">
                  {solvedPercentage > 0 && !isSolved && (
                    <div
                      className="h-full bg-brandgreen"
                      style={{
                        width: `${(100 * solvedPercentage).toFixed(2)}%`,
                      }}
                    ></div>
                  )}
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
  close,
}: {
  element: EditorExerciseDocument | EditorTemplateExerciseGroupDocument
  title: string
  close: () => void
}) {
  const [index, setIndex] = useState(0)

  const solved = JSON.parse(
    sessionStorage.getItem('___serlo_solved_in_session___') ?? '[]'
  ) as number[]
  // element.children![index].positionInGroup = undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [val, triggerRender] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ;(window as any).__triggerRender = () => {
    triggerRender((x) => x + 1)
  }

  const isSolvedInThisSession =
    val > 1 &&
    ((element.serloContext?.uuid &&
      solved?.includes(element.serloContext.uuid)) ||
      (isTemplateExerciseGroupDocument(element) &&
        element.state.exercises[index].serloContext?.uuid &&
        solved?.includes(
          element.state.exercises[index].serloContext?.uuid as number
        )))

  if (element.plugin === EditorPluginType.Exercise) {
    return (
      <>
        <div className="flex-1" />
        <div className="flex-1">
          <div
            className={clsx(
              'pointer-events-auto max-h-[calc(100vh-150px)] overflow-y-auto rounded-xl bg-white',
              isSolvedInThisSession && '[&_.serlo-button-blue]:invisible'
            )}
          >
            <div>
              <h2 className="mx-side mt-6 hyphens-manual pb-2 text-xl font-bold">
                {title}
              </h2>
              <div
                key={index}
                className="[&_.serlo-h2]:hidden [&_.serlo-h3]:hidden"
              >
                <StaticRenderer document={element} />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              ' mt-2.5 flex justify-end',
              !isSolvedInThisSession && 'hidden'
            )}
          >
            <button
              className="pointer-events-auto rounded-xl bg-brand px-8 py-4 font-bold text-white transition-colors hover:bg-brand-700"
              onClick={() => {
                close()
              }}
            >
              Zurück zum Aufgabenordner
            </button>
          </div>
        </div>
        <div className="flex-1" />
      </>
    )
  }

  return (
    <Fragment key={index}>
      <div className="flex-1" />
      <div className="flex-1">
        <div
          className={clsx(
            'pointer-events-auto max-h-[calc(100vh-150px)] overflow-y-auto rounded-xl bg-white',
            isSolvedInThisSession && '[&_.serlo-button-blue]:invisible'
          )}
        >
          <div>
            <h2 className="mx-side mt-6 hyphens-manual text-lg font-bold">
              {title}
            </h2>

            <div className="mt-6">
              <StaticRenderer document={element.state.exercises[index]} />
            </div>
          </div>
        </div>
        <div className="mt-2.5 flex justify-between">
          {index > 0 ? (
            <button
              className="pointer-events-auto rounded-xl bg-brand-50 px-8 py-4 font-bold text-brand transition-colors hover:bg-brand hover:bg-brand-700 hover:text-white"
              onClick={() => {
                setIndex((i) => i - 1)
                triggerRender(1)
              }}
            >
              <FaIcon icon={faCaretLeft} /> vorherige Teilaufgabe
            </button>
          ) : (
            <div />
          )}
          {index + 1 < element.state.exercises.length ? (
            <button
              className={clsx(
                'pointer-events-auto rounded-xl  px-8 py-4 font-bold  transition-colors',
                isSolvedInThisSession
                  ? 'bg-brand text-white'
                  : 'bg-brand-50 text-brand hover:bg-brand hover:text-white'
              )}
              onClick={() => {
                setIndex((i) => i + 1)
                triggerRender(1)
              }}
            >
              nächste Teilaufgabe <FaIcon icon={faCaretRight} />
            </button>
          ) : isSolvedInThisSession ? (
            <button
              className="pointer-events-auto rounded-xl bg-brand px-8 py-4 font-bold text-white transition-colors hover:bg-brand-700"
              onClick={() => {
                close()
              }}
            >
              Zurück zum Aufgabenordner
            </button>
          ) : (
            <div />
          )}
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
      <div className="flex-1" />
    </Fragment>
  )
}
