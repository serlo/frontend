import { ReactNode } from 'react'
import styled from 'styled-components'

import { DisplayModes } from './revision'
import {
  RevisionDiffViewer,
  RevisionDiffViewerProps,
} from './revision-diff-viewer'
import { Geogebra } from '@/components/content/geogebra'
import { Video } from '@/components/content/video'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import { makePadding } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export interface RevisionPreviewBoxesProps {
  dataSet: RevisionData['thisRevision'] | RevisionData['currentRevision']
  displayMode: DisplayModes
  data: RevisionData
}

interface PreviewBoxProps {
  title: string
  diffType: RevisionDiffViewerProps['type']
  children: ReactNode
  changes?: boolean
}

export function RevisionPreviewBoxes({
  dataSet,
  data,
  displayMode,
}: RevisionPreviewBoxesProps) {
  const { strings } = useInstanceData()
  const notDiff = displayMode !== DisplayModes.Diff

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

  function PreviewBox({ title, children, diffType, changes }: PreviewBoxProps) {
    const withPadding =
      notDiff && (diffType === 'metaDescription' || diffType === 'metaTitle')

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
          {notDiff ? (
            children
          ) : (
            <RevisionDiffViewer data={data} type={diffType} />
          )}
        </Box>
      </>
    )
  }
}

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
