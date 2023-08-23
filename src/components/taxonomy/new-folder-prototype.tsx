import { faTimes } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

import { FaIcon } from '../fa-icon'
import { TaxonomyData } from '@/data-types'
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
    type: 'Single Choice',
  },
  {
    title: 'Kinopreise berechnen',
    difficulty: 2,
    img: 'https://assets.serlo.org/83e53100-41ac-11ee-89f0-6196501948c9/image.png',
    type: 'Aufgabe mit Eingabefeld',
  },
  {
    title: 'Vertiefungs-aufgaben',
    difficulty: 1,
    img: '',
    type: 'Single Choice',
  },
  {
    title: 'Vertiefungs-aufgaben',
    difficulty: 2,
    img: '',
    type: 'Single Choice',
  },
  {
    title: 'Reisezeit nach Hogwarts',
    difficulty: 3,
    img: 'https://assets.serlo.org/b3deaf80-41ac-11ee-89f0-6196501948c9/image.png',
    type: 'Single Choice',
  },
]

export function NewFolderPrototype({ data }: NewFolderPrototypeProps) {
  const [showInModal, setShowInModal] = useState(-1)
  if (showInModal >= 0) {
    const element = data.exercisesContent[showInModal]
    element.positionOnPage = undefined
    return (
      <>
        <div className="fixed inset-0 z-[150] bg-gray-100"></div>
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
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
          relative z-[200] mx-8 mb-16 mt-8 flex flex
          max-h-[calc(100%-48px)] min-h-[400px]
          w-[900px] max-w-full flex-col overflow-y-auto rounded-xl bg-white px-6 py-8
        `}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h2 className="mx-side text-lg font-bold">
              {hardcodedDataforDreisatz[showInModal].title}
            </h2>
            {renderArticle(
              [element],
              `tax${data.id}`,
              `ex${element.context.id}`
            )}
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
    <div className="mx-side flex flex-wrap">
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
              className="mb-5 mr-4 h-[238px] w-[176px] cursor-pointer rounded border hover:border-brand"
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
                      entry.type === 'Single Choice'
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
                  'relative h-[142px] rounded-b',
                  isSolved && 'bg-green-200',
                  solvedPercentage > 0 && 'to-whote bg-gradient-to-r to-white',
                  solvedPercentage > 0 &&
                    solvedPercentage < 0.5 &&
                    'from-green-50',
                  solvedPercentage >= 0.5 && 'from-green-200'
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
        <span className="inline-block w-14">moderat</span> ★★☆
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
