import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

import { DisplayModes } from './revision'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

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
    <>
      <style jsx>{`
        .metabar {
          @apply p-side;
          display: flex;
          justify-content: center;
          position: sticky;
          z-index: 50;
          padding-top: 25px;
          padding-bottom: 10px;
          top: 0;
          background-color: #fff;
        }
      `}</style>
      <nav className="metabar">{renderButtons()}</nav>
    </>
  )

  function renderButtons() {
    return (
      <>
        {!isCurrent && renderButton(DisplayModes.Diff, strings.revisions.diff)}
        {!isCurrent &&
          renderButton(DisplayModes.SideBySide, strings.revisions.sidebyside)}
        {isCurrent && previousRevisionId && (
          <Link
            className="serlo-button serlo-make-interactive-transparent-blue ml-1"
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
    //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported
    return (
      <button
        onPointerUp={(e) => e.currentTarget.blur()}
        onClick={() => setDisplayMode(mode)}
        className={clsx(
          'serlo-button serlo-make-interactive-transparent-blue',
          'ml-1',
          displayMode === mode && 'text-white bg-brand'
        )}
      >
        {title}
      </button>
    )
  }
}
