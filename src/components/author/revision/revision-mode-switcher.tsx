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

export function RevisionModeSwitcher(props: RevisionModeSwitcherProps) {
  return (
    <>
      <style jsx>{`
        .metabar {
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
      <nav className="metabar p-side">
        <Buttons {...props} />
      </nav>
    </>
  )
}

type ButtonsProps = RevisionModeSwitcherProps

function Buttons({
  isCurrent,
  previousRevisionId,
  repositoryId,
  displayMode,
  setDisplayMode,
}: ButtonsProps) {
  const { strings } = useInstanceData()

  return (
    <>
      {!isCurrent && (
        <Button
          mode={DisplayModes.Diff}
          title={strings.revisions.diff}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      )}
      {!isCurrent && (
        <Button
          mode={DisplayModes.SideBySide}
          title={strings.revisions.sidebyside}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      )}
      {isCurrent && previousRevisionId && (
        <Link
          className="serlo-button-blue-transparent ml-1"
          href={`/entity/repository/compare/${repositoryId}/${previousRevisionId}#${DisplayModes.SideBySide}`}
        >
          Vorherige Bearbeitung ansehen
        </Link>
      )}
      <Button
        mode={DisplayModes.This}
        title={strings.revisions.thisVersion}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />
    </>
  )
}

type ButtonProps = Pick<
  RevisionModeSwitcherProps,
  'displayMode' | 'setDisplayMode'
> & { mode: DisplayModes; title: string }

function Button({ mode, title, displayMode, setDisplayMode }: ButtonProps) {
  return (
    <button
      onClick={() => setDisplayMode(mode)}
      className={clsx(
        'serlo-button-blue-transparent ml-1',
        displayMode === mode && 'bg-brand text-white'
      )}
    >
      {title}
    </button>
  )
}
