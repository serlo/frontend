import clsx from 'clsx'
import produce, { Immutable } from 'immer'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

interface TaskData {
  title: string
  earnings: number
  description: string
  h5p: string
}

const tasks: { [key: number]: TaskData } = {
  1: {
    title: 'Start',
    earnings: 5,
    description:
      'Hey, danke dass du den Job übernimmst. Ich schicke dir mal für den Start eine Aufgabe für die Grundschule, irgendwas mit Formen zuordnen, du wirst schon sehen. Wenn du mehr als die Hälfte korrekt löst, dann erhältst du dsa Lösungswort, mit dem du dein Feedback abgeben kannst.',
    h5p: 'https://app.Lumi.education/run/P46cdL',
  },
}

type State = Immutable<{
  sigmas: number
  ui: {
    currentTab: 'new' | 'complete'
    showTask: number
    showH5p: boolean
  }
  tasks: number[]
  completed: number[]
}>

const Game: NextPage = () => {
  const [core, setCore] = useState<State>({
    sigmas: 0,
    ui: { currentTab: 'new', showTask: -1, showH5p: false },
    tasks: [1],
    completed: [],
  })

  return (
    <>
      <Head>
        <title>Mathe Redaktions Simulator</title>
      </Head>
      <div className="w-[800px] mx-auto bg-pink-100 px-3">
        {core.ui.showTask > 0 && (
          <>
            {core.ui.showH5p && (
              <div className="fixed inset-0 bg-yellow-200">
                <div className="absolute top-2 right-2">
                  <button
                    className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => {
                      setCore(
                        produce((draft) => {
                          draft.ui.showH5p = false
                        })
                      )
                    }}
                  >
                    Schließen
                  </button>
                </div>
                <iframe
                  className="w-full h-full"
                  src={tasks[core.ui.showTask].h5p}
                ></iframe>
              </div>
            )}
            <h1 className="text-2xl pt-8">{tasks[core.ui.showTask].title}</h1>
            <p className="mt-4 flex justify-between">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setCore(
                    produce((draft) => {
                      draft.ui.showTask = -1
                    })
                  )
                }}
              >
                zurück
              </button>
              <span>{tasks[core.ui.showTask].earnings} ∑</span>
            </p>
            <p className="mt-8 mb-4">{tasks[core.ui.showTask].description}</p>
            <p>
              <button
                className="px-2 py-0.5 bg-green-200 hover:bg-green-300"
                onClick={() => {
                  setCore(
                    produce((draft) => {
                      draft.ui.showH5p = true
                    })
                  )
                }}
              >
                Lerninhalt öffnen
              </button>
            </p>
            <p>Feedback</p>
            <p>
              Lösungswort: <input />
            </p>
            <p>Verständlichkeit: 1 - 5</p>
            <p>Spaß: 1 - 5</p>
            <p>Abschicken</p>
          </>
        )}
        {core.ui.showTask < 0 && (
          <>
            <h1 className="text-3xl pt-8 mb-8">Mathe Redaktions Simulator</h1>
            <p className="italic">
              Du wachst eines Tages auf und hast den Job eines Mathe-Redakteur:
              Du verdienst dein Geld damit, Lerninhalte durchzuklicken und zu
              bewerten. Ok, denkst du dir, warum auch nicht ...
            </p>
            <p className="my-6">Kontostand: {core.sigmas} ∑</p>
            <div className="flex my-6 border-b border-black">
              <button
                className={clsx(core.ui.currentTab == 'new' && 'font-bold')}
                onClick={() => {
                  setCore(
                    produce((draft) => {
                      draft.ui.currentTab = 'new'
                    })
                  )
                }}
              >
                Neue Aufträge
              </button>
              <button
                className={clsx(
                  core.ui.currentTab == 'complete' && 'font-bold',
                  'ml-4'
                )}
                onClick={() => {
                  setCore(
                    produce((draft) => {
                      draft.ui.currentTab = 'complete'
                    })
                  )
                }}
              >
                abgeschlossen
              </button>
            </div>
            {core.ui.currentTab == 'new' && (
              <div className="mt-4 pb-4">
                {core.tasks.map((taskId, i) => {
                  const task = tasks[taskId]
                  if (core.completed.includes(taskId)) {
                    return null
                  } else {
                    return (
                      <div
                        className="flex justify-between m-2 bg-white cursor-pointer p-2 rounded"
                        key={i}
                        onClick={() => {
                          setCore(
                            produce((draft) => {
                              draft.ui.showTask = taskId
                            })
                          )
                        }}
                      >
                        <span className="font-bold">{task.title}</span>
                        <span>{task.earnings} ∑</span>
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Game
