import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { useInstanceData } from '@/contexts/instance-context'
import type { RevisionData } from '@/data-types'

export enum DiffViewerMode {
  content = 'content',
  title = 'title',
  metaTitle = 'metaTitle',
  metaDescription = 'metaDescription',
  url = 'url',
}

export interface RevisionDiffViewerProps {
  data: RevisionData
  mode: DiffViewerMode
}

export function RevisionDiffViewer({ data, mode }: RevisionDiffViewerProps) {
  const { strings } = useInstanceData()
  return (
    <>
      {mode === DiffViewerMode.content ? (
        <div className="[&_pre]:text-sm [&_td]:max-w-[45vw] [&_td]:overflow-scroll">
          <ReactDiffViewer
            leftTitle={strings.revisions.currentVersion}
            rightTitle={strings.revisions.thisVersion}
            oldValue={JSON.stringify(data.currentRevision.content, null, 2)}
            newValue={JSON.stringify(data.thisRevision.content, null, 2)}
            splitView
            hideLineNumbers
            compareMethod={DiffMethod.WORDS}
          />{' '}
        </div>
      ) : (
        <div className="[&_pre]:!font-serlo [&_pre]:!text-lg">
          <ReactDiffViewer
            oldValue={data.currentRevision[mode]}
            newValue={data.thisRevision[mode]}
            splitView={false}
            hideLineNumbers
            showDiffOnly={false}
          />
        </div>
      )}
    </>
  )
}
