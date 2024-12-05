import {
  faArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { StickyHeaderLearner } from '../sticky-header-learner'
import type { ExerciseProps } from '../types'
import { FaIcon } from '@/components/fa-icon'

export function ExerciseWrapper({
  id,
  onSubmitClick,
  onBackToMapClick,
  children,
  noHeader,
}: ExerciseProps & { children: JSX.Element; noHeader?: boolean }) {
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
        {noHeader ? <div>&nbsp;</div> : <StickyHeaderLearner />}
        {children}

        <button
          className="serlo-button-learner-secondary rounded-lg px-4 py-2 text-2xl"
          onClick={() => onSubmitClick(id)}
        >
          Go on <FaIcon icon={faCircleArrowRight} />
        </button>
      </main>
      <aside className="flex-shrink flex-grow basis-0">
        {/* <GetAiFeedbackButton /> */}

        <div className="fixed bottom-10 right-10"></div>
      </aside>
    </div>
  )
}
