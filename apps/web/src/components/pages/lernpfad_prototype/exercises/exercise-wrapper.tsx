import {
  faArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { StickyHeaderLearner } from '../sticky-header-learner'
import type { ExerciseProps } from '../types'
import { FaIcon } from '@/components/fa-icon'

export function ExerciseWrapper({
  id,
  data,
  onSubmitClick,
  onBackToMapClick,
  children,
  noHeader,
}: ExerciseProps & { children: JSX.Element; noHeader?: boolean }) {
  if (id === null) return null

  return (
    <>
      <header>
        <button
          className="fixed top-2 z-[51] flex flex-row items-center gap-3 p-7"
          onClick={onBackToMapClick}
        >
          <FaIcon icon={faArrowLeft} />
          <span className="text-lg">Back to Path</span>
        </button>

        {noHeader ? null : (
          <div className="fixed top-2 z-50 m-5 w-full">
            <StickyHeaderLearner time={data.time} />
          </div>
        )}
      </header>

      {/* To change content width, change both max-w and basis */}
      <main
        id="content"
        className="mx-auto mb-[50%] mt-40 max-w-[min(100%,50rem)] flex-shrink flex-grow basis-[50rem]"
      >
        {children}

        <button
          className="serlo-button-learner-secondary rounded-lg px-4 py-2 text-2xl"
          onClick={() => onSubmitClick(id)}
        >
          Go on <FaIcon icon={faCircleArrowRight} />
        </button>
      </main>
    </>
  )
}
