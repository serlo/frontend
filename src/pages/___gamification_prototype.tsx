import clsx from 'clsx'
import produce, { Immutable } from 'immer'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { replaceWithJSX } from '@/helper/replace-with-jsx'

interface TaskData {
  title: string
  earnings: number
  description: string
  h5p: string
  topic: string
  solution: string
}

const tasks: { [key: number]: TaskData } = {
  1: {
    title: 'Start',
    earnings: 10,
    description: `
      Hey, cool das du hier bist!

      Ich habe eine dir eine kleine Aufgabe vorbereitet. Sobald du mehr als die Hälfte der Punkte gesammelt hast,
      erhältst du ein Lösungswort, dass du in der oberen Zeile eintragen kannst.

      Danach bekommst du den Verdienst auf dein Konto gutgeschrieben.
    `,
    h5p: 'https://app.Lumi.education/run/P46cdL',
    topic: 'Grundlagen der Mathematik',
    solution: 'Tonne',
  },
}

type State = Immutable<{
  sigmas: number
  ui: {
    showTask: number
    showH5p: boolean
    solutionInput: string
  }
  tasks: number[]
  completed: number[]
}>

const Game: NextPage = () => {
  const [core, setCore] = useState<State>({
    sigmas: 0,
    ui: { showTask: -1, showH5p: false, solutionInput: '' },
    tasks: [1],
    completed: [],
  })

  return (
    <>
      <Head>
        <title>Serlo Mathematik Challenge</title>
      </Head>
      <div className="w-[800px] mx-auto px-3">
        {core.ui.showTask > 0 && (
          <>
            {core.ui.showH5p && (
              <div className="fixed inset-0 bg-brand">
                <div className="absolute left-0 top-0 right-0 h-16 bg-brand-150 flex justify-between items-baseline pt-3">
                  <div className="text-xl ml-4">
                    {!core.completed.includes(core.ui.showTask) && (
                      <>
                        <label>
                          Lösungswort:{' '}
                          <input
                            className="ml-4 p-1 border-2 border-brandgreen rounded w-48 outline-none"
                            onChange={(e) => {
                              setCore(
                                produce((draft) => {
                                  draft.ui.solutionInput = e.target.value
                                })
                              )
                            }}
                          />
                        </label>
                        <button
                          className="px-2 py-1 ml-4 bg-brandgreen-200 hover:bg-brandgreen-300 rounded border-brandgreen border-2"
                          onClick={() => {
                            if (
                              tasks[core.ui.showTask].solution.toLowerCase() ===
                              core.ui.solutionInput.toLowerCase()
                            ) {
                              setCore(
                                produce((draft) => {
                                  draft.ui.solutionInput = ''
                                  draft.ui.showH5p = false
                                  if (
                                    !draft.completed.includes(core.ui.showTask)
                                  ) {
                                    draft.completed.push(core.ui.showTask)
                                    draft.sigmas +=
                                      tasks[core.ui.showTask].earnings
                                    alert(
                                      `Du hast ${
                                        tasks[core.ui.showTask].earnings
                                      } Sigmas erhalten.`
                                    )
                                  }
                                  draft.ui.showTask = -1
                                })
                              )
                            } else {
                              alert('Falsches Lösungswort')
                            }
                          }}
                        >
                          Los
                        </button>
                      </>
                    )}
                  </div>
                  <div className="font-bold">
                    {tasks[core.ui.showTask].title}
                  </div>
                  <button
                    className="px-2 py-0.5 bg-brand-300 hover:bg-brand-400 rounded block mr-2"
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
              <div>
                {!core.completed.includes(core.ui.showTask) && (
                  <span>{tasks[core.ui.showTask].earnings} ∑</span>
                )}
              </div>
            </p>
            <p className="mt-8 mb-4">
              {processMiniMarkdown(tasks[core.ui.showTask].description)}
            </p>
            <p>
              <button
                className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded"
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
          </>
        )}
        {core.ui.showTask < 0 && (
          <>
            <h1 className="text-4xl pt-14 pb-14 mb-4 text-center bg-brand-150">
              Serlo Mathematik Challenge
            </h1>
            <p className="italic px-2">
              Teste dein Mathe-Können und verdiene Sigmas, mit denen du neue
              Aufgaben freischalten kannst. Du kannst aus verschiedenen Themen
              wählen.
            </p>
            <p className="my-8 text-center">Kontostand: {core.sigmas} ∑</p>
            <h2 className="my-4 text-xl font-bold ml-2">Deine Aufgaben</h2>
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left border font-normal">Name</th>
                  <th className="border font-normal text-left">Thema</th>
                  <th className="border w-24 font-normal">Verdienst</th>
                </tr>
              </thead>
              <tbody>
                {core.tasks.map((taskId, i) => {
                  const task = tasks[taskId]
                  if (core.completed.includes(taskId)) {
                    return null
                  } else {
                    return (
                      <tr
                        className={clsx(
                          'cursor-pointer hover:bg-brand-300',
                          i % 2 == 0 ? 'bg-brand-50' : 'bg-brand-150'
                        )}
                        key={i}
                        onClick={() => {
                          setCore(
                            produce((draft) => {
                              draft.ui.showTask = taskId
                            })
                          )
                        }}
                      >
                        <td className="font-bold px-2 py-4 border">
                          {task.title}
                        </td>
                        <td className="border">{task.topic}</td>
                        <td className="border">{task.earnings} ∑</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
            <h2 className="mt-12 mb-4 text-xl font-bold ml-2">Themen</h2>
            <p className="ml-2">
              Grundlagen der Mathematik (Klasse 1. - 5.){' '}
              <button className="text-brand-600 hover:underline">
                [neue Aufgabe freischalten (Kosten: 5 ∑)]
              </button>
            </p>
            <h2 className="mt-24 mb-4 text-xl ml-2">abgeschlossen</h2>
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left border font-normal">Name</th>
                  <th className="border font-normal text-left">Thema</th>
                </tr>
              </thead>
              <tbody>
                {core.completed.map((taskId, i) => {
                  const task = tasks[taskId]

                  return (
                    <tr
                      className="cursor-pointer hover:bg-brand-100"
                      key={i}
                      onClick={() => {
                        setCore(
                          produce((draft) => {
                            draft.ui.showTask = taskId
                          })
                        )
                      }}
                    >
                      <td className="p-2 border">{task.title}</td>
                      <td className="border">{task.topic}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  )
}

export function processMiniMarkdown(input: string) {
  const key = { val: 1 }
  return replaceWithJSX([input], /(^\s*(?:$\s*)*$)/gm, () => (
    <div className="h-3" key={key.val++}></div>
  ))
}

export default Game
