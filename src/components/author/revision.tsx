import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import styled, { css } from 'styled-components'

import { PageTitle } from '../content/page-title'
import { Geogebra } from '@/components/content/geogebra'
import { HSpace } from '@/components/content/h-space'
import { Video } from '@/components/content/video'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { TimeAgo } from '@/components/time-ago'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import {
  makePadding,
  // makeTransparentButton,
  makeTransparentButton,
  inputFontReset,
  makeLightButton,
} from '@/helper/css'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { renderArticle } from '@/schema/article-renderer'

export interface RevisionProps {
  data: RevisionData
}

//current is currently accepted revision
type DisplayMode = 'this' | 'current' | 'compare'

export function Revision({ data }: RevisionProps) {
  const { strings } = useInstanceData()
  const isCurrentRevision = data.thisRevision.id === data.currentRevision.id
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
        <BackButton
          as="a"
          href={`/entity/repository/history/${data.repositoryId}`}
        >
          <FontAwesomeIcon icon={faList} /> {strings.revisions.toOverview}
        </BackButton>
        <div>{renderButtons()}</div>
      </MetaBar>
      <HSpace amount={5} />
      <PageTitle
        title={
          data.currentRevision.metaTitle ||
          data.currentRevision.title ||
          strings.entities.revision
        }
        headTitle
        icon={icon ? icon : undefined}
      />
      {isCurrentRevision && (
        <StyledP>
          <i>{strings.revisions.thisIsCurrentVersion}</i>
        </StyledP>
      )}
      <StyledP>
        {data.changes !== undefined && (
          <>
            <b>{strings.revisions.changes}:</b> {data.changes}
            <br />
            <br />
          </>
        )}
        {strings.revisions.by} <UserLink user={data.user} />{' '}
        <TimeAgo datetime={new Date(data.date)} dateAsTitle />
      </StyledP>
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
      <HSpace amount={20} />
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
        <StyledIcon icon={entityIconMapping[data.type]} />{' '}
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
  ${makeTransparentButton}
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

const BackButton = styled(Button)`
  ${makeLightButton}

  > svg {
    font-size: 1rem;
    margin-right: 2px;
    padding-top: 1px;
  }
`

const MetaBar = styled.div`
  ${makePadding}
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
    ${inputFontReset}
    font-size: 1.125rem !important;
  }
`
