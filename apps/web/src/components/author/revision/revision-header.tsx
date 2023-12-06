import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import type { Dispatch, SetStateAction } from 'react'

import type { DisplayModes } from './display-modes'
import { RevisionModeSwitcher } from './revision-mode-switcher'
import { RevisionNotice } from './revision-notice'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { TimeAgo } from '@/components/time-ago'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import type { RevisionData } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'
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
          className="serlo-button-light mx-side mt-6"
        >
          <FaIcon icon={faArrowCircleLeft} className="mr-0.5 text-base" />{' '}
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
    return (
      <span title={getTranslatedType(strings, data.typename)}>
        {' '}
        <FaIcon
          className="text-2.5xl text-brand-400"
          icon={getIconByTypename(data.typename)}
        />{' '}
      </span>
    )
  }
}
