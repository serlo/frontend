import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'

type DiffViewerTypes =
  | 'content'
  | 'title'
  | 'metaTitle'
  | 'metaDescription'
  | 'url'

export interface RevisionDiffViewerProps {
  data: RevisionData
  type: DiffViewerTypes
}

export function RevisionDiffViewer({ data, type }: RevisionDiffViewerProps) {
  const { strings } = useInstanceData()
  return (
    <>
      <style jsx>{`
        .wrapper-split {
          :global(td) {
            max-width: 45vw;
            overflow: scroll;
          }
          :global(pre) {
            font-size: 0.9rem;
          }
        }

        .wrapper-single {
          :global(pre) {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
      {type == 'content' ? (
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
        <div className="wrapper-single">
          <ReactDiffViewer
            oldValue={data.currentRevision[type]}
            newValue={data.thisRevision[type]}
            splitView={false}
            hideLineNumbers
            showDiffOnly={false}
          />
        </div>
      )}
    </>
  )
}
