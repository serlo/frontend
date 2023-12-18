/* eslint-disable @next/next/no-img-element */

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import { ApplicationTask } from './application-task'
import { EquationTask } from './equation-task'
import { Overview } from './overview'
import { Overview2 } from './overview-2'
import { FaIcon } from '../fa-icon'
import {
  ApplicationTaskData,
  LinearEquationTask,
  applicationTasks,
  linearEquationData,
} from '@/data/de/gleichungs-app'

export function EquationsAppV2() {
  const [solved, setSolved] = useState<number[]>([])

  useEffect(() => {
    setSolved(readSolved())
  }, [])

  const [taskNumber, setTaskNumber] = useState(-1)
  const [hideBackButton, setHideBackButton] = useState(false)

  const [showMenu, setShowMenu] = useState(false)
  const [page, setPage] = useState<'linear' | 'application'>('linear')

  const showOverview = taskNumber === -1
  const showTaskLinear = taskNumber > 0 && taskNumber < 999
  const showTaskApplication = taskNumber > 1000

  let taskLinear: LinearEquationTask | null = null
  let taskApplication: ApplicationTaskData | null = null

  const lastScrollPosition = useRef(-1)

  useEffect(() => {
    if (showOverview && lastScrollPosition.current > 0) {
      window.document.documentElement.scrollTop = lastScrollPosition.current
    }
  }, [showOverview])

  if (showTaskLinear) {
    for (const level of linearEquationData.levels) {
      for (const t of level.tasks) {
        if (t.number === taskNumber) {
          taskLinear = t
          break
        }
      }
    }
  }

  if (showTaskApplication) {
    for (const task of applicationTasks) {
      if (task.id === taskNumber) {
        taskApplication = task
        break
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex grow-0 items-baseline justify-between bg-gray-100 pb-1">
        <div className="mt-1 flex items-baseline">
          <h1 className="text-bold my-2 ml-3 text-xl">
            <img
              src="/_assets/favicon.ico"
              className="-mt-1 mr-3 inline-block h-6"
              alt=""
            />
            Serlo Gleichungs-App
          </h1>
        </div>
        {renderHeaderUI()}
      </div>
      {showOverview && (
        <div className="shrink grow">
          {showMenu && (
            <div className=" bg-brand-100 text-center">
              <button
                className="block w-full border-b-2 border-brand py-4 hover:underline"
                onClick={() => {
                  setPage('linear')
                  setShowMenu(false)
                }}
              >
                <span className="text-lg font-bold">Lineare Gleichungen</span>
              </button>
              <button
                className="block w-full border-b-2 border-brand py-4 hover:underline"
                onClick={() => {
                  setPage('application')
                  setShowMenu(false)
                }}
              >
                <span className="text-lg font-bold">Anwendungsaufgaben</span>
              </button>
            </div>
          )}
          <div className="mx-auto mt-4 max-w-[600px] px-4 [&>h3]:mt-8 [&>h3]:text-lg [&>h3]:font-bold">
            {page === 'linear' && (
              <Overview selectLevel={select} solved={solved} />
            )}
            {page === 'application' && (
              <Overview2 selectLevel={select} solved={solved} />
            )}
            <div className="mt-12 rounded bg-gray-100 p-2">
              Diese App befindet sich in Entwicklung.
              <br />
              <a
                href="https://forms.gle/PFUYn8fn5zAkzpqe8"
                target="_blank"
                rel="noreferrer"
                className="serlo-link"
              >
                Wir freuen uns über dein Feedback
              </a>
              .
            </div>
            <div className="mb-6 mt-36 text-center">
              <a href="/privacy" target="_blank" rel="noreferrer">
                Datenschutz
              </a>
              <span className="mx-5 inline-block">|</span>
              <a href="/legal" target="_blank" rel="noreferrer">
                Impressum
              </a>
            </div>
          </div>
        </div>
      )}
      {showTaskLinear && taskLinear && (
        <div className="shrink grow">
          <div className="mx-auto mt-4 max-w-[600px] px-4">
            <EquationTask
              data={taskLinear}
              onSolve={(n) => {
                solve(n)
              }}
              onBack={() => {
                setTaskNumber(-1)
              }}
            />
          </div>
        </div>
      )}
      {showTaskApplication && taskApplication && (
        <div className="shrink grow">
          <div className="mx-auto mt-4 max-w-[600px] px-4">
            <ApplicationTask
              data={taskApplication}
              onSolve={(n) => {
                solve(n)
              }}
              onBack={() => {
                setTaskNumber(-1)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )

  function select(n: number) {
    setTaskNumber(n)
    setShowMenu(false)
    setHideBackButton(false)
    lastScrollPosition.current =
      window.document.scrollingElement?.scrollTop ?? -1
    window.document.scrollingElement?.scrollTo({ top: 0 })
  }

  function solve(n: number) {
    if (!solved.includes(n)) {
      setSolved((list) => {
        const newVal = [...list, n]
        storeToSolved(newVal)
        return newVal
      })
    }
    setHideBackButton(true)
  }

  function renderHeaderUI() {
    if ((showTaskLinear || showTaskApplication) && !hideBackButton) {
      return (
        <div className="mr-3">
          <button
            className="rounded bg-pink-300 px-2 py-1 hover:bg-pink-400"
            onClick={() => {
              setTaskNumber(-1)
            }}
          >
            zurück
          </button>
        </div>
      )
    } else if (!showTaskLinear) {
      return (
        <div className="mr-3">
          <button
            className="rounded bg-brand px-2 py-1 text-white hover:bg-brand-600"
            onClick={() => {
              setShowMenu((val) => !val)
            }}
          >
            {showMenu ? (
              <>schließen</>
            ) : (
              <>
                <FaIcon icon={faBars} className="mr-2" />
                Menü
              </>
            )}
          </button>
        </div>
      )
    }
    return <div className="mr-3"></div>
  }
}

function storeToSolved(solved: number[]) {
  sessionStorage.setItem('serlo_gleichungs_app_solved', JSON.stringify(solved))
}

function readSolved() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = JSON.parse(
      sessionStorage.getItem('serlo_gleichungs_app_solved') ?? '[]'
    )
    if (Array.isArray(state) && state.every((x) => typeof x === 'number')) {
      return state as number[]
    }
    return []
  } catch (e) {
    return []
  }
}
