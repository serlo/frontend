import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'

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
      <style jsx>{`
        .wrapper-split :global(td) {
          max-width: 45vw;
          overflow: scroll;
        }
        .wrapper-split :global(pre) {
          font-size: 0.9rem;
        }

        .wrapper-single :global(pre) {
          font-size: 1.125rem !important;
        }
      `}</style>
      {mode === DiffViewerMode.content ? (
        <div className="wrapper-split">
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
        <div className="wrapper-single [&_pre]:font-serlo">
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
