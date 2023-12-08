import { faLock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { LinearEquationData } from '@/data/de/gleichungs-app'
import { cn } from '@/helper/cn'

interface OverviewProps {
  data: LinearEquationData
  unlockedLevel: number
}

export function Overview({ data, unlockedLevel }: OverviewProps) {
  return (
    <div>
      <h2 className="mb-5 mt-8 text-center text-2xl font-bold">
        Lineare Gleichungen
      </h2>
      {data.levels.map((level) => (
        <div key={level.number}>
          <div className="relative mb-10 rounded-xl bg-orange-100 pb-5 pt-2">
            <div className="mx-3 flex items-baseline justify-between">
              <span className="text-lg font-bold">Level {level.number}</span>
              <button
                className={cn(
                  'rounded bg-orange-300 px-1 py-0.5 hover:bg-orange-400',
                  level.number > unlockedLevel && 'hidden'
                )}
              >
                <FaIcon icon={faQuestionCircle} className="mr-1" />
                Info
              </button>
            </div>
            <div
              className={cn(
                'mt-3 flex justify-center',
                level.number > unlockedLevel && 'invisible'
              )}
            >
              {level.tasks
                .filter((t) => !t.isGolden)
                .map((task) => (
                  <div key={task.number} className="mr-4">
                    <button className="h-14 w-14 rounded bg-gray-200 text-center align-middle text-xl hover:bg-gray-300">
                      {task.number}
                    </button>
                  </div>
                ))}
            </div>
            <div
              className={cn(
                'mt-3 flex justify-center',
                level.number > unlockedLevel && 'invisible'
              )}
            >
              {level.tasks
                .filter((t) => t.isGolden)
                .map((task) => (
                  <div key={task.number} className="mr-4">
                    <button className="h-14 w-14 rounded bg-yellow-400 text-center align-middle text-xl hover:bg-yellow-500">
                      {task.number}
                    </button>
                  </div>
                ))}
            </div>
            {level.number > unlockedLevel + 1 && (
              <div className="absolute left-0 right-0 top-16 text-center text-7xl text-gray-300">
                <FaIcon icon={faLock} />
              </div>
            )}
            {level.number === unlockedLevel + 1 && (
              <div className="text- absolute left-0 right-0 top-16 text-center">
                Löse 2 goldene Aufgaben in Level {unlockedLevel}
                <br />
                um dieses Level freizuschalten
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
