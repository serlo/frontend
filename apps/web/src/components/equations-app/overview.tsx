import { faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import {
  LinearEquationData,
  linearEquationData,
} from '@/data/de/gleichungs-app'
import { cn } from '@/helper/cn'

interface OverviewProps {
  data: LinearEquationData
  unlockedLevel: number
  selectLevel: (n: number) => void
  solved: number[]
  unlock: () => void
}

export function Overview({
  data,
  unlockedLevel,
  selectLevel,
  solved,
  unlock,
}: OverviewProps) {
  const isUnlockAvailable =
    linearEquationData.levels
      .find((l) => l.number === unlockedLevel)!
      .tasks.filter((t) => t.isGolden && solved.includes(t.number)).length >= 2

  return (
    <div>
      <h2 className="mb-6 mt-8 text-center text-2xl font-bold mobileExt:mb-8 mobileExt:mt-12">
        Lineare Gleichungen
      </h2>
      {data.levels.map((level) => (
        <div key={level.number}>
          <div className="relative mb-10 rounded-xl bg-orange-100 pb-9 pt-4">
            <div className="mx-5 flex items-baseline justify-between">
              <span className="text-lg font-bold">
                Level {level.number}
                {level.number <= unlockedLevel ? <> - {level.heading}</> : null}
              </span>
              {/*<button
                className={cn(
                  'rounded bg-orange-300 px-1 py-0.5 hover:bg-orange-400',
                  level.number > unlockedLevel && 'hidden'
                )}
              >
                <FaIcon icon={faQuestionCircle} className="mr-1" />
                Info
                </button>*/}
            </div>
            <div
              className={cn(
                'mt-6 flex justify-center',
                level.number > unlockedLevel && 'invisible'
              )}
            >
              {level.tasks
                .filter((t) => !t.isGolden)
                .map((task, i, arr) => (
                  <div
                    key={task.number}
                    className={cn(
                      i + 1 < arr.length && 'mr-4 mobileExt:mr-8',
                      'relative'
                    )}
                  >
                    <button
                      className="h-14 w-14 rounded bg-gray-200 text-center align-middle text-xl hover:bg-gray-300"
                      onClick={() => {
                        selectLevel(task.number)
                      }}
                    >
                      {task.number}
                    </button>
                    {solved.includes(task.number) && (
                      <div className="absolute -right-1 -top-1 text-xl text-green-500">
                        <FaIcon icon={faCheckCircle} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div
              className={cn(
                'mt-4 flex justify-center mobileExt:mt-6',
                level.number > unlockedLevel && 'invisible'
              )}
            >
              {level.tasks
                .filter((t) => t.isGolden)
                .map((task, i, arr) => (
                  <div
                    key={task.number}
                    className={cn(
                      i + 1 < arr.length && 'mr-4 mobileExt:mr-8',
                      'relative'
                    )}
                  >
                    <button
                      className="h-14 w-14 rounded bg-yellow-400 text-center align-middle text-xl hover:bg-yellow-500"
                      onClick={() => {
                        selectLevel(task.number)
                      }}
                    >
                      {task.number}
                    </button>
                    {solved.includes(task.number) && (
                      <div className="absolute -right-1 -top-1 text-xl text-green-500">
                        <FaIcon icon={faCheckCircle} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {level.number > unlockedLevel + 1 && (
              <div className="absolute left-0 right-0 top-20 text-center text-7xl text-gray-300">
                <FaIcon icon={faLock} />
              </div>
            )}
            {level.number === unlockedLevel + 1 &&
              (isUnlockAvailable ? (
                <div className="absolute left-0 right-0 top-20 text-center">
                  <button
                    className="rounded bg-green-200 px-3 py-2 font-bold hover:bg-green-300"
                    onClick={(e) => {
                      unlock()
                      e.preventDefault()
                    }}
                  >
                    Level freischalten
                  </button>
                </div>
              ) : (
                <div className="absolute left-0 right-0 top-20 text-center">
                  Löse 2 goldene Aufgaben aus Level {unlockedLevel}
                  <br />
                  um dieses Level freizuschalten
                </div>
              ))}
          </div>
        </div>
      ))}
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
    </div>
  )
}
