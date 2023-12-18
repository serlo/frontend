/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'

import { EquationTask } from './equation-task'
import { Overview } from './overview'
import {
  LinearEquationTask,
  linearEquationData,
} from '@/data/de/gleichungs-app'

export function EquationsAppV2() {
  const [solved, setSolved] = useState<number[]>([])

  useEffect(() => {
    setSolved(readSolved())
  }, [])

  const [taskNumber, setTaskNumber] = useState(-1)
  const [hideBackButton, setHideBackButton] = useState(false)

  const showOverview = taskNumber === -1
  const showTask = taskNumber > 0

  let task: LinearEquationTask | null = null

  const lastScrollPosition = useRef(-1)

  useEffect(() => {
    if (showOverview && lastScrollPosition.current > 0) {
      window.document.documentElement.scrollTop = lastScrollPosition.current
    }
  }, [showOverview])

  if (showTask) {
    for (const level of linearEquationData.levels) {
      for (const t of level.tasks) {
        if (t.number === taskNumber) {
          task = t
          break
        }
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
          <div className="mx-auto mt-4 max-w-[600px] px-4 [&>h3]:mt-8 [&>h3]:text-lg [&>h3]:font-bold">
            <Overview
              selectLevel={(n) => {
                setTaskNumber(n)
                setHideBackButton(false)
                lastScrollPosition.current =
                  window.document.scrollingElement?.scrollTop ?? -1
                window.document.scrollingElement?.scrollTo({ top: 0 })
              }}
              solved={solved}
            />
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
      {showTask && task && (
        <div className="shrink grow">
          <div className="mx-auto mt-4 max-w-[600px] px-4">
            <EquationTask
              data={task}
              onSolve={(n) => {
                if (!solved.includes(n)) {
                  setSolved((list) => {
                    const newVal = [...list, n]
                    storeToSolved(newVal)
                    return newVal
                  })
                }
                setHideBackButton(true)
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

  function renderHeaderUI() {
    if (showTask && !hideBackButton) {
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
