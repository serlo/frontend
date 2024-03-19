import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { useState, useEffect } from 'react'

import { DisplayModes } from './display-modes'
import { RevisionHeader } from './revision-header'
import {
  RevisionPreviewBoxes,
  type RevisionPreviewBoxesProps,
} from './revision-preview-boxes'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { type RevisionData } from '@/data-types'
import { removeHash } from '@/helper/remove-hash'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export interface RevisionProps {
  data: RevisionData
}

export function Revision({ data }: RevisionProps) {
  const { strings } = useInstanceData()
  const isCurrentRevision = data.thisRevision.id === data.currentRevision.id
  const hasCurrentRevision = data.currentRevision.id !== undefined
  const isRejected = data.thisRevision.trashed
  const [displayMode, setDisplayMode] = useState<DisplayModes>(
    DisplayModes.This
  )
  editorRenderers.init(createRenderers())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window.location.hash.substring(1) === DisplayModes.SideBySide) {
      setDisplayMode(DisplayModes.SideBySide)
      removeHash()
    }
  })

  return (
    <div className="relative pb-52">
      {renderHeader()}

      {displayMode === DisplayModes.SideBySide && (
        <div className="mt-12 flex">
          <div className="flex-1 bg-brand-50 px-side pb-6">
            <h2 className="serlo-h2 mb-4 mt-12">
              {strings.revisions.currentVersion}
            </h2>
            {renderPreviewBoxes(data.currentRevision)}
          </div>
          <div className="ml-4 mr-side flex-1">
            <h2 className="serlo-h2 mb-4 mt-12">
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
        <MaxWidthDiv>{renderPreviewBoxes(data.thisRevision)}</MaxWidthDiv>
      )}

      {renderUserTools(false)}
    </div>
  )

  function renderHeader() {
    return (
      <RevisionHeader
        data={data}
        isCurrentRevision={isCurrentRevision}
        repositoryAlias={data.repository.alias}
        renderUserTools={renderUserTools}
        isRejected={isRejected}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        hasCurrentRevision={hasCurrentRevision}
      />
    )
  }

  function renderPreviewBoxes(dataSet: RevisionPreviewBoxesProps['dataSet']) {
    return (
      <RevisionPreviewBoxes
        dataSet={dataSet}
        data={data}
        displayMode={displayMode}
      />
    )
  }

  function renderUserTools(above: boolean) {
    return (
      <UserTools
        id={data.thisRevision.id}
        aboveContent={above}
        data={{
          type: data.typename,
          id: data.repository.id,
          revisionId: data.thisRevision.id,
          revisionData: {
            rejected: isRejected,
            current: isCurrentRevision,
          },
        }}
      />
    )
  }
}
