import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { StickyHeaderLearner } from '../sticky-header-learner'
import type { ExerciseProps } from '../types'
import { FaIcon } from '@/components/fa-icon'

export function ExerciseWrapper({
  id,
  data,
  onSubmitClick,
  onNextExerciseClick,
  onBackToMapClick,
  children,
}: ExerciseProps & { children: JSX.Element }) {
  if (id === null) return null

  return (
    <div className="flex flex-row">
      <aside className="relative flex-shrink flex-grow basis-0">
        <button
          className="sticky top-0 flex flex-row items-center gap-3 p-7"
          onClick={onBackToMapClick}
        >
          <FaIcon icon={faArrowLeft} />
          <span className="text-lg">Back to Path</span>
        </button>
      </aside>
      {/* To change content width, change both max-w and basis */}
      <main
        id="content"
        className="mb-[50%] max-w-[min(100%,50rem)] flex-shrink flex-grow basis-[50rem]"
      >
        <StickyHeaderLearner />
        {children}
      </main>
      <aside className="flex-shrink flex-grow basis-0">
        {/* <GetAiFeedbackButton /> */}

        <div className="fixed bottom-10 right-10">
          {data.done ? (
            <div className="text-center">
              <p>Exercise done!</p>
              <div className="align-center flex justify-center gap-2">
                {data.nextExercises?.map((nextId) => (
                  <button
                    key={nextId}
                    className="serlo-button-edit-primary"
                    onClick={() => onNextExerciseClick(nextId)}
                  >
                    Go to {nextId}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              className="serlo-button-edit-primary"
              onClick={() => onSubmitClick(id)}
            >
              Submit
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}
