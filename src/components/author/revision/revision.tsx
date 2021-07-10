import {
  faTimes,
  faCheck,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Entity } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { tint } from 'polished'
import { useState, ReactNode, useEffect } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import styled, { css } from 'styled-components'

import { PageTitle } from '../../content/page-title'
import { UserTools } from '../../user-tools/user-tools'
import type { CheckoutRejectButtonsProps } from './checkout-reject-buttons'
import { RevisionModeSwitcher } from './revision-mode-switcher'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Geogebra } from '@/components/content/geogebra'
import { Injection } from '@/components/content/injection'
import { Link } from '@/components/content/link'
import { Video } from '@/components/content/video'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { TimeAgo } from '@/components/time-ago'
import { removeHash } from '@/components/toast-notice'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import { makePadding, inputFontReset, makeLightButton } from '@/helper/css'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { renderArticle, renderNested } from '@/schema/article-renderer'

export interface RevisionProps {
  data: RevisionData
}

const CheckoutRejectButtons = dynamic<CheckoutRejectButtonsProps>(() =>
  import('@/components/author/revision/checkout-reject-buttons').then(
    (mod) => mod.CheckoutRejectButtons
  )
)
export enum DisplayModes {
  This = 'this',
  SideBySide = 'sidebyside',
  Diff = 'diff',
}

export function Revision({ data }: RevisionProps) {
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const canDo = useCanDo()
  const canCheckoutAndReject =
    canDo(Entity.checkoutRevision) && canDo(Entity.rejectRevision)
  const isCurrentRevision = data.thisRevision.id === data.currentRevision.id
  const hasCurrentRevision = data.currentRevision.id !== undefined

  const isRejected = data.thisRevision.trashed
  const [displayMode, setDisplayMode] = useState<DisplayModes>(
    DisplayModes.This
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window.location.hash.substr(1) === DisplayModes.SideBySide) {
      setDisplayMode(DisplayModes.SideBySide)
      removeHash()
    }
  })

  const notCompare = displayMode !== DisplayModes.Diff
  const icon = renderEntityIcon()
  const repositoryAlias = data.repository.alias ?? `/${data.repository.id}`

  return (
    <div className="relative pb-52">
      {renderHeader()}

      {displayMode === DisplayModes.SideBySide && (
        <div className="flex mt-12">
          <div className="flex-1 px-side pb-6 bg-brand-50">
            <h2 className="serlo-h2 mt-12 mb-4">
              {strings.revisions.currentVersion}
            </h2>
            {renderPreviewBoxes(data.currentRevision)}
          </div>
          <div className="flex-1 ml-4 mr-side">
            <h2 className="serlo-h2 mt-12 mb-4">
              {strings.revisions.thisVersion}
            </h2>
            {renderPreviewBoxes(data.thisRevision)}
          </div>
        </div>
      )}

      {displayMode === DisplayModes.Diff && (
        <div className="mx-side">{renderPreviewBoxes(data.thisRevision)}</div>
      )}

      {displayMode === DisplayModes.This && (
        <>
          <MaxWidthDiv>
            {renderPreviewBoxes(data.thisRevision)}
            {renderExercisePreview()}
          </MaxWidthDiv>
        </>
      )}

      {renderUserTools(false)}
    </div>
  )

  function renderHeader() {
    return (
      <>
        <MaxWidthDiv className="!mb-0">
          <BackButton href={repositoryAlias} className="mt-6 mx-side">
            <FontAwesomeIcon icon={faArrowCircleLeft} />{' '}
            {strings.revisions.toContent}
          </BackButton>

          {renderNotice()}
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
  }

  function renderPreviewBoxes(
    dataSet: RevisionData['thisRevision'] | RevisionData['currentRevision']
  ) {
    return (
      <>
        {dataSet.title !== undefined && (
          <PreviewBox
            title={strings.revisions.title}
            diffType="title"
            changes={dataSet.title !== data.currentRevision.title}
          >
            <h1 className="serlo-h1">{dataSet.title}</h1>
          </PreviewBox>
        )}
        {dataSet.content !== undefined && (
          <PreviewBox
            title={strings.revisions.content}
            diffType="content"
            changes={dataSet.content !== data.currentRevision.content}
          >
            {renderArticle(
              dataSet.content || [],
              `revision${dataSet.id || 'empty'}`
            )}
          </PreviewBox>
        )}
        {renderVideoOrAppletBox(dataSet)}
        {dataSet.metaTitle && (
          <PreviewBox
            title={strings.revisions.metaTitle}
            diffType="metaTitle"
            changes={dataSet.metaTitle !== data.currentRevision.metaTitle}
          >
            {dataSet.metaTitle}
          </PreviewBox>
        )}
        {dataSet.metaDescription && (
          <PreviewBox
            title={strings.revisions.metaDescription}
            diffType="metaDescription"
            changes={
              dataSet.metaDescription !== data.currentRevision.metaDescription
            }
          >
            {dataSet.metaDescription}
          </PreviewBox>
        )}
      </>
    )
  }

  function renderUserTools(above: boolean) {
    return (
      <UserTools
        id={data.thisRevision.id}
        aboveContent={above}
        data={{
          type: 'Revision',
          id: data.repository.id,
          revisionId: data.thisRevision.id,
          checkoutRejectButtons:
            auth.current && canCheckoutAndReject ? (
              <CheckoutRejectButtons
                revisionId={data.thisRevision.id}
                repositoryAlias={repositoryAlias}
                isRejected={isRejected}
                isCurrent={isCurrentRevision}
              />
            ) : undefined,
        }}
      />
    )
  }

  function renderEntityIcon() {
    if (!data.type) return null
    return (
      <span title={strings.entities[data.type]}>
        {' '}
        <StyledIcon icon={getIconByTypename(data.type)} />{' '}
      </span>
    )
  }

  function renderVideoOrAppletBox(dataSet: RevisionData['currentRevision']) {
    if (dataSet.url === undefined) return null
    const isVideo = data.type === 'video'
    return (
      <PreviewBox
        title={isVideo ? strings.entities.video : strings.entities.applet}
        diffType="url"
        changes={dataSet.url !== data.currentRevision.url}
      >
        {isVideo ? <Video src={dataSet.url} /> : <Geogebra id={dataSet.url} />}
        <span className="text-sm px-1 bg-yellow-200">
          <b>url:</b> {dataSet.url}
        </span>
      </PreviewBox>
    )
  }

  function renderExercisePreview() {
    if (
      !['solution', 'exerciseGroup', 'groupedExercise'].includes(data.type) ||
      data.repository.parentId === undefined
    )
      return null
    const { parentId } = data.repository

    if (!hasCurrentRevision) {
      return (
        <p className="serlo-p mt-20">
          <Link href={`/entity/repository/history/${parentId}`}>
            {strings.revisions.parentFallbackLink}
          </Link>
        </p>
      )
    }

    return (
      <div className="serlo-content-with-spacing-fixes">
        <h2 className="serlo-h2 mt-12">{strings.revisions.context}</h2>
        <Injection
          href={`/${parentId}`}
          renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
        />
        )
      </div>
    )
  }

  type DiffViewerTypes =
    | 'content'
    | 'title'
    | 'metaTitle'
    | 'metaDescription'
    | 'url'

  function renderDiffViewer(diffType: DiffViewerTypes) {
    if (diffType === 'content') {
      return (
        <DiffViewerWrapper split>
          <ReactDiffViewer
            leftTitle={strings.revisions.currentVersion}
            rightTitle={strings.revisions.thisVersion}
            oldValue={JSON.stringify(data.currentRevision.content, null, 2)}
            newValue={JSON.stringify(data.thisRevision.content, null, 2)}
            splitView
            hideLineNumbers
            compareMethod={DiffMethod.WORDS}
          />
        </DiffViewerWrapper>
      )
    }
    return (
      <DiffViewerWrapper>
        <ReactDiffViewer
          oldValue={data.currentRevision[diffType]}
          newValue={data.thisRevision[diffType]}
          splitView={false}
          hideLineNumbers
          showDiffOnly={false}
        />
      </DiffViewerWrapper>
    )
  }

  interface PreviewBoxProps {
    title: string
    diffType: DiffViewerTypes
    children: ReactNode
    changes?: boolean
  }

  function PreviewBox({ title, children, diffType, changes }: PreviewBoxProps) {
    const withPadding =
      notCompare && (diffType === 'metaDescription' || diffType === 'metaTitle')

    return (
      <>
        <p className="serlo-p flex justify-between mt-10 mb-1.5">
          <b title={changes ? strings.revisions.hasChanges : undefined}>
            {title}
            {changes && <span className="text-sm">{' 🟠'}</span>}
          </b>
        </p>
        <Box
          withPadding={withPadding}
          className={
            data.type === 'exercise' || data.type === 'groupedExercise'
              ? '!py-2'
              : ''
          }
        >
          {notCompare ? children : renderDiffViewer(diffType)}
        </Box>
      </>
    )
  }

  function renderNotice() {
    if (!hasCurrentRevision) {
      return <Notice success>{strings.revisions.noCurrentNotice}</Notice>
    }
    if (!isRejected && !isCurrentRevision) return null
    return (
      <Notice success={isCurrentRevision}>
        <FontAwesomeIcon icon={isRejected ? faTimes : faCheck} />{' '}
        {isRejected
          ? strings.revisions.rejectedNotice
          : strings.revisions.currentNotice}
      </Notice>
    )
  }
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
const Box = styled.div<{ withPadding?: boolean }>`
  ${(props) => props.withPadding && makePadding}
  font-size: 1.125rem;
  padding-top: 30px;
  padding-bottom: 30px;
  border: 1px solid ${(props) => props.theme.colors.lighterblue};
  border-radius: 15px;

  > h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const BackButton = styled(Link)`
  ${makeLightButton}

  > svg {
    font-size: 1rem;
    margin-right: 2px;
    padding-top: 1px;
  }
`

const DiffViewerWrapper = styled.div<{ split?: boolean }>`
  pre {
    ${(props) => props.split === undefined && inputFontReset}
    font-size: ${(props) => (props.split ? '0.9rem' : '1.125rem !important')};
  }

  ${(props) =>
    props.split &&
    css`
      td {
        max-width: 45vw;
        overflow: scroll;
      }
    `}
`

const Notice = styled.div<{ success?: boolean }>`
  margin: 50px 0;
  padding: 16px;
  border-radius: 20px;
  font-weight: bold;
  background-color: ${(props) =>
    tint(0.7, props.success ? props.theme.colors.brandGreen : '#c56c6c')};
`
