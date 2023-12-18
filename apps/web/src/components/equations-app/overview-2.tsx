import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { applicationTasks } from '@/data/de/gleichungs-app'

interface Overview2Props {
  selectLevel: (n: number) => void
  solved: number[]
}

export function Overview2({ selectLevel, solved }: Overview2Props) {
  return (
    <div>
      <h2 className="mb-6 mt-8 text-center text-2xl font-bold mobileExt:mb-8 mobileExt:mt-12">
        Anwendungsaufgaben
      </h2>
      {applicationTasks.map((task) => (
        <div key={task.id} className="my-6">
          <button
            className="text-brand hover:underline"
            onClick={() => {
              selectLevel(task.id)
            }}
          >
            {task.title}
          </button>
          {solved.includes(task.id) && (
            <span className="ml-2 text-green-500">
              <FaIcon icon={faCheck} />
            </span>
          )}
        </div>
      ))}
      <div className="mb-96 h-96"></div>

      {/*linearEquationData.levels.map((level) => (
        <div key={level.number}>
          <h3 className="mb-4 mt-8 text-xl font-bold">
            Level {level.number} - {level.heading}
          </h3>
          {level.tasks.map((t) => (
            <div
              key={t.number}
              className="my-5 flex items-baseline justify-start"
            >
              <span
                className={cn(
                  'mr-3 inline-block flex h-6 w-6 items-center justify-center rounded-full',
                  t.isGolden ? 'bg-yellow-400' : 'bg-gray-200'
                )}
              >
                <span>{t.number}</span>
              </span>
              <span className="text-lg">
                <StaticMath src={t.latex} inline type="math" />
              </span>
              {solved.includes(t.number) && (
                <span className="ml-2 text-green-500">
                  <FaIcon icon={faCheck} />
                </span>
              )}
              <span className="flex-grow"></span>
              <span>
                <button
                  className="rounded bg-green-200 bg-green-300 px-3 py-1"
                  onClick={() => {
                    selectLevel(t.number)
                  }}
                >
                  <FaIcon icon={faPlay} />
                </button>
              </span>
            </div>
          ))}
        </div>
                ))*/}
    </div>
  )
}
