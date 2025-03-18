import type { Dispatch, SetStateAction } from 'react'

import { DisplayModes } from './display-modes'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

export interface RevisionModeSwitcherProps {
  isCurrent: boolean
  previousRevisionId?: number
  repositoryId: number
  displayMode: DisplayModes
  setDisplayMode: Dispatch<SetStateAction<DisplayModes>>
}

export function RevisionModeSwitcher({
  isCurrent,
  previousRevisionId,
  repositoryId,
  displayMode,
  setDisplayMode,
}: RevisionModeSwitcherProps) {
  const { strings } = useInstanceData()

  return (
    <nav className="sticky top-0 z-50 flex justify-center bg-white p-side pb-2.5 pt-6">
      {renderButtons()}
    </nav>
  )

  function renderButtons() {
    return (
      <>
        {!isCurrent && renderButton(DisplayModes.Diff, strings.revisions.diff)}
        {!isCurrent &&
          renderButton(DisplayModes.SideBySide, strings.revisions.sidebyside)}
        {isCurrent && previousRevisionId && (
          <Link
            className="serlo-button-learner-transparent ml-1"
            href={`/entity/repository/compare/${repositoryId}/${previousRevisionId}#${DisplayModes.SideBySide}`}
          >
            Vorherige Bearbeitung ansehen
          </Link>
        )}

        {renderButton(DisplayModes.This, strings.revisions.thisVersion)}
      </>
    )
  }

  function renderButton(mode: DisplayModes, title: string) {
    return (
      <button
        onClick={() => setDisplayMode(mode)}
        className={cn(
          'serlo-button-learner-transparent ml-1',
          displayMode === mode && 'bg-brand text-white'
        )}
      >
        {title}
      </button>
    )
  }
}
