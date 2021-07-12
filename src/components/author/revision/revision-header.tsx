import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

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
import { makeLightButton } from '@/helper/css'
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
      <MaxWidthDiv className="!mb-0">
        <BackButton href={repositoryAlias} className="mt-6 mx-side">
          <FontAwesomeIcon icon={faArrowCircleLeft} />{' '}
          {strings.revisions.toContent}
        </BackButton>
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
        <StyledIcon icon={getIconByTypename(data.type)} />{' '}
      </span>
    )
  }
}

const BackButton = styled(Link)`
  ${makeLightButton}

  > svg {
    font-size: 1rem;
    margin-right: 2px;
    padding-top: 1px;
  }
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
