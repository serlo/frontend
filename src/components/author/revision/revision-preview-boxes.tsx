import clsx from 'clsx'
import { ReactNode } from 'react'

import { DisplayModes } from './revision'
import {
  DiffViewerMode,
  RevisionDiffViewer,
  RevisionDiffViewerProps,
} from './revision-diff-viewer'
import { Geogebra } from '@/components/content/geogebra'
import { Video } from '@/components/content/video'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData, UuidRevType } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface RevisionPreviewBoxesProps {
  dataSet: RevisionData['thisRevision'] | RevisionData['currentRevision']
  displayMode: DisplayModes
  data: RevisionData
}

export function RevisionPreviewBoxes({
  dataSet,
  data,
  displayMode,
}: RevisionPreviewBoxesProps) {
  const { strings } = useInstanceData()

  return (
    <>
      {dataSet.title !== undefined && (
        <PreviewBox
          title={strings.revisions.title}
          diffMode={DiffViewerMode.title}
          changes={dataSet.title !== data.currentRevision.title}
          displayMode={displayMode}
          data={data}
        >
          <h1 className="serlo-h1">{dataSet.title}</h1>
        </PreviewBox>
      )}
      {dataSet.content !== undefined && (
        <PreviewBox
          title={strings.revisions.content}
          diffMode={DiffViewerMode.content}
          changes={dataSet.content !== data.currentRevision.content}
          displayMode={displayMode}
          data={data}
        >
          {renderArticle(
            dataSet.content || [],
            `revision${dataSet.id || 'empty'}`
          )}
        </PreviewBox>
      )}
      <VideoOrAppletBox
        dataSet={dataSet}
        data={data}
        displayMode={displayMode}
      />
      {dataSet.metaTitle && (
        <PreviewBox
          title={strings.revisions.metaTitle}
          diffMode={DiffViewerMode.metaTitle}
          changes={dataSet.metaTitle !== data.currentRevision.metaTitle}
          displayMode={displayMode}
          data={data}
        >
          {dataSet.metaTitle}
        </PreviewBox>
      )}
      {dataSet.metaDescription && (
        <PreviewBox
          title={strings.revisions.metaDescription}
          diffMode={DiffViewerMode.metaDescription}
          changes={
            dataSet.metaDescription !== data.currentRevision.metaDescription
          }
          displayMode={displayMode}
          data={data}
        >
          {dataSet.metaDescription}
        </PreviewBox>
      )}
    </>
  )
}

interface VideoOrAppletBoxProps {
  dataSet: RevisionData['currentRevision']
  data: RevisionData
  displayMode: DisplayModes
}

function VideoOrAppletBox({
  dataSet,
  data,
  displayMode,
}: VideoOrAppletBoxProps) {
  const { strings } = useInstanceData()
  if (dataSet.url === undefined) return null
  const isVideo = data.typename === UuidRevType.Video
  return (
    <PreviewBox
      title={isVideo ? strings.entities.video : strings.entities.applet}
      diffMode={DiffViewerMode.url}
      changes={dataSet.url !== data.currentRevision.url}
      data={data}
      displayMode={displayMode}
    >
      {isVideo ? <Video src={dataSet.url} /> : <Geogebra id={dataSet.url} />}
      <span className="bg-editor-primary-100 px-1 text-sm">
        <b>url:</b> {dataSet.url}
      </span>
    </PreviewBox>
  )
}

interface PreviewBoxProps {
  title: string
  diffMode: RevisionDiffViewerProps['mode']
  children: ReactNode
  changes?: boolean
  displayMode: DisplayModes
  data: RevisionData
}

function PreviewBox({
  title,
  children,
  diffMode,
  displayMode,
  changes,
  data,
}: PreviewBoxProps) {
  const { strings } = useInstanceData()
  const notDiff = displayMode !== DisplayModes.Diff

  const withPadding =
    notDiff &&
    (diffMode === DiffViewerMode.metaDescription ||
      diffMode === DiffViewerMode.metaTitle)

  return (
    <>
      <style jsx>{`
        .fixH1 :global(h1) {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
      <p className="serlo-p mb-1.5 mt-10 flex justify-between">
        <b title={changes ? strings.revisions.hasChanges : undefined}>
          {title}
          {changes && <span className="text-sm">{' 🟠'}</span>}
        </b>
      </p>
      <div
        className={clsx(
          (data.typename === UuidRevType.Exercise ||
            data.typename === UuidRevType.GroupedExercise) &&
            '!py-2',
          withPadding && 'p-side',
          'fixH1 rounded-2xl border border-brand-400 py-7 text-lg'
        )}
      >
        {notDiff ? (
          children
        ) : (
          <RevisionDiffViewer data={data} mode={diffMode} />
        )}
      </div>
    </>
  )
}
