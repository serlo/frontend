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
          <span className="text-lg">Zum Lernpfad</span>
        </button>

        {noHeader ? null : (
          <div className="fixed top-2 z-50 m-5 w-full">
            <StickyHeaderLearner
              time={data.time}
              helpActive={data.isMacroadaptive}
            />
          </div>
        )}
      </header>
      {/* To change content width, change both max-w and basis */}
      <main
        id="content"
        className="mx-auto mb-40 mt-40 max-w-[min(100%,50rem)] flex-shrink flex-grow basis-[50rem]"
      >
        {children}

        <button
          className="serlo-button-learner-secondary rounded-lg px-4 py-2 text-2xl"
          onClick={() => onSubmitClick(id)}
        >
          Weiter <FaIcon icon={faCircleArrowRight} />
        </button>
      </main>
      {data.isMacroadaptive ? (
        <button className="z-1000 fixed bottom-3 right-7 flex flex-row items-center gap-2 rounded-md bg-purple-100 px-4 py-2 text-sm font-bold hover:cursor-pointer hover:bg-purple-200">
          Sprich mit
          <img src="/_assets/img/birdie.svg" className="max-w-6" />
        </button>
      ) : null}
    </>
  )
}
