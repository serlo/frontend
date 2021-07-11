import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import styled, { css } from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import { inputFontReset } from '@/helper/css'

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
  if (type === 'content') {
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
        oldValue={data.currentRevision[type]}
        newValue={data.thisRevision[type]}
        splitView={false}
        hideLineNumbers
        showDiffOnly={false}
      />
    </DiffViewerWrapper>
  )
}

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
