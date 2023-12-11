/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'

import { EquationTask } from './equation-task'
import { Overview } from './overview'
import {
  LinearEquationTask,
  linearEquationData,
} from '@/data/de/gleichungs-app'

export function EquationsAppV2() {
  const [unlockedLevel /*setUnlockedLevel*/] = useState(1)
  //const [solved, setSolved] = useState<number[]>([])

  const [taskNumber, setTaskNumber] = useState(-1)
  const [hideBackButton, setHideBackButton] = useState(false)

  const showOverview = taskNumber === -1
  const showTask = taskNumber > 0

  let task: LinearEquationTask | null = null

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
              data={linearEquationData}
              unlockedLevel={unlockedLevel}
              selectLevel={(n) => {
                setTaskNumber(n)
                setHideBackButton(false)
              }}
            />{' '}
            <div className="mb-6 mt-[200px] text-center">
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
            <EquationTask data={task} />
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
