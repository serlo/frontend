import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

import { Blocks } from './blocks'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

// Schüly Ansicht
export function TextAreaExerciseRenderer({
  isInEditor,
}: {
  isInEditor: boolean
}) {
  const {
    solutionStrategy,
    allowShowSolutionStrategy,
    allowShowEvaluationCriteria,
    evaluationCriteria,
  } = useTextAreaPluginStateValues()
  const [showStrategy, setShowStrategy] = useState(false)

  return (
    <>
      {!isInEditor && allowShowEvaluationCriteria && evaluationCriteria ? (
        <div className="my-5 whitespace-pre-wrap rounded-xl bg-brand-100 p-5">
          <div className="mb-3 text-xl font-bold">Remember</div>
          <div className="flex flex-col gap-2">
            {evaluationCriteria.split('\n').map((elem, index) => (
              <div className="ml-3" key={index}>
                <FaIcon className="mr-3" icon={faLightbulb} />
                {elem}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      Write your answer:
      <Blocks />
      {!isInEditor && allowShowSolutionStrategy ? (
        <>
          <button
            className={cn(
              'serlo-button-learner-transparent mb-4 ml-side mr-auto pr-2 text-base hover:bg-brand-100 hover:text-brand-700',
              showStrategy && 'bg-brand text-white'
            )}
            onClick={() => {
              setShowStrategy((previousValue) => !previousValue)
            }}
          >
            <span className="mr-1 w-3.5">
              <span
                className={cn(
                  'inline-block transition-transform duration-300',
                  showStrategy && 'translate-y-[1px] rotate-180'
                )}
              >
                ▾
              </span>
              &nbsp;
            </span>
            Lösungsstrategie
          </button>
          {showStrategy ? (
            <div className="serlo-solution-box p-3">
              <div className="solution whitespace-pre-wrap">
                {solutionStrategy}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}
