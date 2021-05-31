import { faList, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Entity } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { tint } from 'polished'
import * as React from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import styled, { css } from 'styled-components'

import { PageTitle } from '../content/page-title'
import { UserTools } from '../user-tools/user-tools'
import type { CheckoutRejectButtonsProps } from './checkout-reject-buttons'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Geogebra } from '@/components/content/geogebra'
import { HSpace } from '@/components/content/h-space'
import { Link } from '@/components/content/link'
import { Video } from '@/components/content/video'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { TimeAgo } from '@/components/time-ago'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import {
  makePadding,
  makeTransparentButton,
  inputFontReset,
  makeLightButton,
} from '@/helper/css'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { renderArticle } from '@/schema/article-renderer'

const CheckoutRejectButtons = dynamic<CheckoutRejectButtonsProps>(() =>
  import('@/components/author/checkout-reject-buttons').then(
    (mod) => mod.CheckoutRejectButtons
  )
)

export interface RevisionProps {
  data: RevisionData
}

//current is the checked out revision
type DisplayMode = 'this' | 'current' | 'compare'

export function Revision({ data }: RevisionProps) {
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const canDo = useCanDo()
  const canCheckoutAndReject =
    canDo(Entity.checkoutRevision) && canDo(Entity.rejectRevision)
  const isCurrentRevision = data.thisRevision.id === data.currentRevision.id
  const isRejected = data.thisRevision.trashed
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>(
    isCurrentRevision ? 'current' : 'this'
  )
  const dataSet =
    displayMode === 'current' ? data.currentRevision : data.thisRevision

  const notCompare = displayMode !== 'compare'
  const icon = renderEntityIcon()

  return (
    <>
      <MetaBar>
        <BackButton href={`/entity/repository/history/${data.repositoryId}`}>
          <FontAwesomeIcon icon={faList} /> {strings.revisions.toOverview}
        </BackButton>
        <div>{renderButtons()}</div>
      </MetaBar>
      <HSpace amount={5} />
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
      {data.changes && (
        <StyledP>
          <b>{strings.revisions.changes}:</b> {data.changes}
          <br />
          <br />
        </StyledP>
      )}
      <FlexWrapper>
        <StyledP>
          {strings.revisions.by} <UserLink user={data.user} />{' '}
          <TimeAgo datetime={new Date(data.date)} dateAsTitle />
        </StyledP>
        {auth.current && canCheckoutAndReject && (
          <CheckoutRejectButtons
            revisionId={data.thisRevision.id}
            repositoryId={data.repositoryId}
            isRejected={isRejected}
            isCurrent={isCurrentRevision}
          />
        )}
      </FlexWrapper>
      {dataSet.title !== undefined && (
        <PreviewBox title={strings.revisions.title} diffType="title">
          <StyledH1>{dataSet.title}</StyledH1>
        </PreviewBox>
      )}
      {dataSet.content !== undefined && (
        <PreviewBox title={strings.revisions.content} diffType="content">
          {renderArticle(
            dataSet.content || [],
            `revision${dataSet.id || 'empty'}`
          )}
        </PreviewBox>
      )}
      {renderVideoOrAppletBox()}
      {dataSet.metaTitle && (
        <PreviewBox title={strings.revisions.metaTitle} diffType="metaTitle">
          {dataSet.metaTitle}
        </PreviewBox>
      )}
      {dataSet.metaDescription && (
        <PreviewBox
          title={strings.revisions.metaDescription}
          diffType="metaDescription"
        >
          {dataSet.metaDescription}
        </PreviewBox>
      )}
      <UserTools
        id={data.thisRevision.id}
        data={{
          type: 'Revision',
          id: data.repositoryId,
          revisionId: data.thisRevision.id,
        }}
      />
    </>
  )

  function renderButtons() {
    return (
      <span>
        {!isCurrentRevision &&
          renderButton('compare', strings.revisions.compare)}
        {renderButton('current', strings.revisions.currentVersion)}
        {!isCurrentRevision &&
          renderButton('this', strings.revisions.thisVersion)}
      </span>
    )
  }

  function renderButton(mode: DisplayMode, title: string) {
    //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported
    return (
      <Button
        onPointerUp={(e) => e.currentTarget.blur()}
        onClick={() => setDisplayMode(mode)}
        current={displayMode === mode}
      >
        {title}
      </Button>
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

  function renderVideoOrAppletBox() {
    if (dataSet.url === undefined) return null
    const isVideo = data.type === 'video'
    return (
      <PreviewBox
        title={isVideo ? strings.entities.video : strings.entities.applet}
        diffType="url"
      >
        {isVideo ? <Video src={dataSet.url} /> : <Geogebra id={dataSet.url} />}
      </PreviewBox>
    )
  }

  type DiffViewerTypes =
    | 'content'
    | 'title'
    | 'metaTitle'
    | 'metaDescription'
    | 'url'

  interface PreviewBoxProps {
    title: string
    diffType: DiffViewerTypes
    children: React.ReactNode
  }
  function renderDiffViewer(diffType: DiffViewerTypes) {
    if (diffType === 'content') {
      return (
        <ReactDiffViewer
          oldValue={JSON.stringify(data.thisRevision.content, null, 2)}
          newValue={JSON.stringify(data.currentRevision.content, null, 2)}
          splitView
          hideLineNumbers
        />
      )
    }
    return (
      <DiffViewerWrapper>
        <ReactDiffViewer
          oldValue={data.thisRevision[diffType]}
          newValue={data.currentRevision[diffType]}
          splitView={false}
          hideLineNumbers
          showDiffOnly={false}
        />
      </DiffViewerWrapper>
    )
  }

  function PreviewBox({ title, children, diffType }: PreviewBoxProps) {
    const withPadding =
      notCompare && (diffType === 'metaDescription' || diffType === 'metaTitle')

    return (
      <>
        <BoxHeader>
          <b>{title}:</b>
        </BoxHeader>
        <Box withPadding={withPadding}>
          {notCompare ? children : renderDiffViewer(diffType)}
        </Box>
      </>
    )
  }

  function renderNotice() {
    if (!isRejected && !isCurrentRevision) return null
    /* TODO: Remove check once this is solved: https://github.com/serlo/serlo.org-database-layer/issues/102 */
    const rejected = !isCurrentRevision && isRejected
    return (
      <Notice success={isCurrentRevision}>
        <FontAwesomeIcon icon={rejected ? faTimes : faCheck} />{' '}
        {rejected
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

const BoxHeader = styled(StyledP)`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 5px;
`

const Button = styled.button<{ current?: boolean }>`
  ${makeTransparentButton};
  margin-left: 5px;

  ${(props) =>
    props.current &&
    css`
      &,
      &:hover {
        background-color: ${(props) => props.theme.colors.brand};
        color: #fff;
      }
    `}
`

const BackButton = styled(Link)`
  ${makeLightButton}

  > svg {
    font-size: 1rem;
    margin-right: 2px;
    padding-top: 1px;
  }
`

const MetaBar = styled.div`
  ${makePadding};
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 50;
  padding-top: 25px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  top: 0;
  background-color: #fff;
`

const DiffViewerWrapper = styled.div`
  pre {
    ${inputFontReset};
    font-size: 1.125rem !important;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Notice = styled.div<{ success?: boolean }>`
  margin: 50px 0;
  padding: 16px;
  border-radius: 20px;
  font-weight: bold;
  background-color: ${(props) =>
    tint(0.7, props.success ? props.theme.colors.brandGreen : '#c56c6c')};
`
