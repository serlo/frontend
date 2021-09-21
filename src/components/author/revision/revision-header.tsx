import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

import { DisplayModes } from './revision'
import { RevisionModeSwitcher } from './revision-mode-switcher'
import { RevisionNotice } from './revision-notice'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { TimeAgo } from '@/components/time-ago'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

export interface RevisionHeaderProps {
  data: RevisionData
  repositoryAlias: string
  isCurrentRevision: boolean
  isRejected: boolean
  hasCurrentRevision: boolean
  renderUserTools: (above: boolean) => JSX.Element
  displayMode: DisplayModes
  setDisplayMode: Dispatch<SetStateAction<DisplayModes>>
}

export function RevisionHeader({
  data,
  repositoryAlias,
  isCurrentRevision,
  isRejected,
  hasCurrentRevision,
  renderUserTools,
  displayMode,
  setDisplayMode,
}: RevisionHeaderProps) {
  const { strings } = useInstanceData()

  const icon = renderEntityIcon()
  return (
    <>
      <MaxWidthDiv noMarginBottom>
        <Link
          href={repositoryAlias}
          className="mt-6 mx-side serlo-button serlo-make-interactive-light"
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            className="text-base mr-0.5 pt-0.25"
          />{' '}
          {strings.revisions.toContent}
        </Link>
        <RevisionNotice
          hasCurrentRevision={hasCurrentRevision}
          isCurrentRevision={isCurrentRevision}
          isRejected={isRejected}
        />
        <PageTitle
          title={
            data.currentRevision.metaTitle ||
            data.currentRevision.title ||
            strings.entities.revision
          }
          headTitle
          icon={icon ? icon : undefined}
        />
        {renderUserTools(true)}
        <p className="serlo-p leading-7">
          {data.changes && (
            <>
              <b>{strings.revisions.changes}:</b> {data.changes}
            </>
          )}
          <br />
          {strings.revisions.by} <UserLink user={data.user} />{' '}
          <TimeAgo datetime={new Date(data.date)} dateAsTitle />
        </p>
      </MaxWidthDiv>
      {hasCurrentRevision && (
        <RevisionModeSwitcher
          isCurrent={isCurrentRevision}
          previousRevisionId={data.repository.previousRevisionId}
          repositoryId={data.repository.id}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
      )}
    </>
  )

  function renderEntityIcon() {
    if (!data.type) return null
    return (
      <span title={strings.entities[data.type]}>
        {' '}
        <FontAwesomeIcon
          className="text-brand-lighter text-2.5xl"
          icon={getIconByTypename(data.type)}
        />{' '}
      </span>
    )
  }
}
