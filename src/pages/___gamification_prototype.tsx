import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import produce, { Immutable } from 'immer'
import Head from 'next/head'
import { useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { colors } from '@/helper/colors'

interface TaskData {
  title: string
  x: number
  y: number
  deps: number[]
  h5p: string
  solution: string
}

const tasks: { [key: number]: TaskData } = {
  1: {
    title: 'Start',
    x: 20,
    y: 40,
    deps: [],
    h5p: 'https://app.Lumi.education/run/P46cdL',
    solution: 'Tonne',
  },
  2: {
    title: 'Zweite Aufgabe',
    x: 210,
    y: 10,
    deps: [1],
    h5p: 'https://app.Lumi.education/run/P46cdL',
    solution: 'Tonne',
  },
  3: {
    title: 'Dritte Aufgabe',
    x: 80,
    y: 200,
    deps: [1],
    h5p: 'https://app.Lumi.education/run/P46cdL',
    solution: 'Tonne',
  },
}

type State = Immutable<{
  showTask: number
  solved: number[]
}>

export default function Game() {
  const [core, setCore] = useState<State>({
    showTask: -1,
    solved: [],
  })

  return (
    <>
      <Head>
        <title>Zurück zu den Anfängen - Serlo Lernpfad</title>
      </Head>
      {core.showTask < 0 && (
        <div
          style={{
            backgroundImage:
              'url(https://3djungle.net/upload/resize_cache/iblock/8c8/400_400_1/8c860403cce5bb805fcc9f20b78c8c5e.jpg)',
          }}
          className="relative"
        >
          <div className="absolute right-2 top-2 p-1 bg-white/50 rounded">
            gelöste Aufgaben: {core.solved.length} von{' '}
            {Object.keys(tasks).length}
          </div>
          <div className="h-12"></div>
          <div className="bg-white/50 w-[550px] mx-auto p-4 rounded">
            <p className="text-gray-600">Serlo Lernpfad</p>
            <h1 className="text-4xl mt-4">Zurück zu den Anfängen</h1>
            <p className="mt-4 italic">
              Eine Reise in die Mathematik der 1. - 5. Klasse
            </p>
          </div>
          <div className="w-[1200px] h-[1000px] mt-4 relative mx-auto pb-12 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000">
              {Object.entries(tasks).map((entry) => {
                if (isVisibe(parseInt(entry[0]))) {
                  return (
                    <>
                      {entry[1].deps.map((dep) => {
                        if (isVisibe(dep)) {
                          return (
                            <line
                              key={`connect-${entry[0]}-${dep}`}
                              x1={entry[1].x + 35}
                              y1={entry[1].y + 70}
                              x2={tasks[dep].x + 35}
                              y2={tasks[dep].y + 70}
                              strokeWidth="15"
                              stroke="gray"
                            />
                          )
                        } else {
                          return null
                        }
                      })}
                    </>
                  )
                }
                return null
              })}
            </svg>
            {Object.keys(tasks)
              .map((x) => parseInt(x))
              .map(placeBird)}
          </div>
        </div>
      )}
      {core.showTask > 0 && (
        <div className="fixed inset-0 bg-brand">
          <div className="absolute left-0 top-0 right-0 h-16 bg-brand-150 flex justify-between items-baseline pt-3">
            <div className="font-bold ml-4 text-lg">
              {tasks[core.showTask].title}
            </div>
            <div className="text-lg ml-4">
              {!core.solved.includes(core.showTask) && (
                <SolutionInput
                  callback={(val) => {
                    if (
                      tasks[core.showTask].solution.toLowerCase() ===
                      val.toLowerCase()
                    ) {
                      setCore(
                        produce((draft) => {
                          draft.showTask = -1
                          alert('Herzlichen Glückwunsch, Aufgabe gelöst!')
                          if (!draft.solved.includes(core.showTask)) {
                            draft.solved.push(core.showTask)
                          }
                        })
                      )
                    } else {
                      alert('Falsches Lösungswort')
                    }
                  }}
                />
              )}
            </div>
            <button
              className="w-10 h-10 rounded-full bg-brand-300 hover:bg-brand-400 block mr-4 transition-colors"
              onClick={() => {
                setCore(
                  produce((draft) => {
                    draft.showTask = -1
                  })
                )
              }}
            >
              <FaIcon icon={faTimes} className="mt-1" />
            </button>
          </div>
          <iframe
            className="w-full h-full"
            src={tasks[core.showTask].h5p}
          ></iframe>
        </div>
      )}
    </>
  )

  function placeBird(index: number) {
    if (!isVisibe(index)) {
      return null
    }
    return (
      <div
        className="absolute group cursor-pointer"
        style={{ left: `${tasks[index].x}px`, top: `${tasks[index].y}px` }}
        onClick={() => {
          setCore(
            produce((draft) => {
              draft.showTask = index
            })
          )
        }}
      >
        <p className="text-center mb-2 text-lg -ml-32 -mr-32 pointer-events-none">
          <span className="pointer-events-auto">{tasks[index].title}</span>
        </p>
        <div className="w-[70px] h-[70px] bg-white group-hover:bg-gray-200 rounded-full transition-colors pt-2">
          <Bird
            fill={
              core.solved.includes(index) ? colors.brand : colors.brandGreen
            }
          />
        </div>
      </div>
    )
  }

  function isVisibe(index: number) {
    return (
      tasks[index].deps.length == 0 ||
      tasks[index].deps.some((i) => core.solved.includes(i))
    )
  }
}

function Bird(props: { fill: string }) {
  const fill = props.fill
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 10 100 80">
      <path
        d="m69.4 69.1-1.7-3.8a23.1 23.1 0 0 0-3-12.3 39.1 39.1 0 0 0-3-4.1 47.7 47.7 0 0 0-5.2-4.8 66.5 66.5 0 0 0-5.6-3.6 64.1 64.1 0 0 1-5.7-3.7 29.9 29.9 0 0 1-6.5-6.3 23.9 23.9 0 0 1-2.8-4.9 23.4 23.4 0 0 1-1.8-6.4 27 27 0 0 0 3.2 8.3 30.2 30.2 0 0 0 4.8 5.8s2.4 2.1 4.3 3.4l.9.6 2.8 1.8a95.2 95.2 0 0 1 8.5 5.7 33.7 33.7 0 0 1 5.2 4.8 19 19 0 0 1 2.2 3.3 27.4 27.4 0 0 1 2.9 9.2l.5 7Z"
        style={{ fill }}
      />
      <path
        d="M67.5 60.9a1.2 1.2 0 0 1-.5-.5 10.8 10.8 0 0 0-4.7-4.3 6.2 6.2 0 0 0-2.3-.7h-2.4v-.6a4.6 4.6 0 0 0-1.5-3.1l-.3-.3h.3a5.9 5.9 0 0 1 2.3-.5h.6c0-.1-.1 0-1-.1h-.1a8.3 8.3 0 0 0-2.2.3h-.5l-.5-.4-2.9-1.7-.8-.5 2.2-.5 3.1-.3h.9a12.3 12.3 0 0 0-2.7-.2 18.4 18.4 0 0 0-4.1.4h-.6l-1.3-.7a47.2 47.2 0 0 1-7.7-4.8 60.2 60.2 0 0 1-4.6-4.2 11.5 11.5 0 0 1-1.4-1.7l-.5-.8A17.1 17.1 0 0 1 32.4 20a22.1 22.1 0 0 1 1.8-3.4 7.6 7.6 0 0 1 .1 1.5 9.9 9.9 0 0 0 .3 2.4 24.3 24.3 0 0 0 3.7 8.8 22.8 22.8 0 0 0 2.1 3c1.6 2.1 6.4 5.8 11 8.5a61.6 61.6 0 0 1 6.3 4.1 30.2 30.2 0 0 1 4.5 4.2 25.8 25.8 0 0 1 3.2 4.9 33.5 33.5 0 0 1 1.9 5.3 7.8 7.8 0 0 1 .2 1.6M68 69.4a92 92 0 0 1-10.4-1.2 73.2 73.2 0 0 1-15.1-4 40.7 40.7 0 0 1-6.7-3.1c-2.8-1.7-4.3-3.3-4.5-4.7a2.3 2.3 0 0 1 1-2.2c1.2-.9 3.1-1.5 6-1.7l6.2-.6a12.6 12.6 0 0 0 3.3-.5l.5-.2a.8.8 0 0 0 .4-.4.4.4 0 0 0-.1-.3c-1.3-1-4.4-1.9-7.3-2.7l-.5-.2c-3.1-.9-6.8-1.8-9-2.3l-1.8-.4c.1 0 4.3.6 8.8 1.5a68.1 68.1 0 0 1 6.7 1.8 12.2 12.2 0 0 1 4.4 2.2.7.7 0 0 1 .2.7c0 .3-.4.6-1 .8a44 44 0 0 1-8.7 1.5l-3.2.5c-1.4.4-3.1 1-3.2 2.1s1.5 2.6 4 4.2a48 48 0 0 0 10.5 4.2 71.4 71.4 0 0 0 17.9 2.3ZM82.7 64.3a1.6 1.6 0 0 1-1.5-1.6 1.6 1.6 0 0 1 1.4-1.5h.1a1.6 1.6 0 0 1 1.5 1.6 1.8 1.8 0 0 1-.4 1 1.6 1.6 0 0 1-1.1.5h-.1"
        style={{ fill }}
      />
      <path
        d="M66.1 82.1A35.9 35.9 0 0 1 55 79.9a61.2 61.2 0 0 1-11.6-5.4 104 104 0 0 0-10.5-5.4 55.7 55.7 0 0 0-8.1-2.9 28 28 0 0 0-7-.9H17a15 15 0 0 0-4.7.8l-.5.2.8-.8a14.4 14.4 0 0 1 5.8-2.1h3l4.1.2A54.6 54.6 0 0 1 36.1 67l6.9 3 5.1 2.2c2.2.8 7.3 2.5 9.3 3a26 26 0 0 0 6.8 1h.8a39 39 0 0 0 5.9-.4l3.6-1a29.5 29.5 0 0 0 6.6-3.4 30.6 30.6 0 0 0 5.3-4.2 10.2 10.2 0 0 1 1.8-1.3 9.3 9.3 0 0 1 2-1l.4-.2h-.2a10.2 10.2 0 0 1-3.1-3.1 8 8 0 0 0-2.1-2 6 6 0 0 0-2.9-.8h-.5a10.3 10.3 0 0 0-4.5 1.4 3.1 3.1 0 0 1-1 .5l.9-.9 1.3-1.1a15.9 15.9 0 0 1 2.9-1.5 6.2 6.2 0 0 1 1.9-.2h1.8a7.4 7.4 0 0 1 4.3 2.8c1.9 2.1 3.7 3.6 5 3.9l.4.2-.5.3c-1.2.7-2.4 1.4-3.5 2.2a21 21 0 0 0-5.2 5.5 27.2 27.2 0 0 1-6.2 6 29.3 29.3 0 0 1-8.7 3.7 17.5 17.5 0 0 1-4.6.5Z"
        style={{ fill }}
      />
    </svg>
  )
}

function SolutionInput(props: { callback: (val: string) => void }) {
  const [val, setVal] = useState('')
  return (
    <>
      <label>
        Lösungswort:{' '}
        <input
          className="ml-4 p-1 border-2 border-brandgreen rounded w-48 outline-none"
          onChange={(e) => {
            setVal(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              props.callback(val)
            }
          }}
          value={val}
        />
      </label>
      <button
        className="px-2 py-1 ml-4 bg-brandgreen-200 hover:bg-brandgreen-300 rounded border-brandgreen border-2 transition-colors"
        onClick={() => {
          props.callback(val)
        }}
      >
        Los
      </button>
    </>
  )
}
