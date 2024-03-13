import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { InjectionStaticRenderer } from '@editor/plugins/injection/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useState, useEffect } from 'react'

import { DisplayModes } from './display-modes'
import { RevisionHeader } from './revision-header'
import {
  RevisionPreviewBoxes,
  type RevisionPreviewBoxesProps,
} from './revision-preview-boxes'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { type RevisionData, UuidRevType } from '@/data-types'
import { removeHash } from '@/helper/remove-hash'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
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

  function renderExercisePreview() {
    if (
      ![UuidRevType.ExerciseGroup, UuidRevType.GroupedExercise].includes(
        data.typename
      ) ||
      data.repository.parentId === undefined
    )
      return null

    const { parentId } = data.repository

    if (!hasCurrentRevision) {
      return (
        <p className="serlo-p mt-20">
          <Link href={getHistoryUrl(parentId)}>
            {strings.revisions.parentFallbackLink}
          </Link>
        </p>
      )
    }

    const char =
      data.repository.positionInGroup === undefined
        ? undefined
        : String.fromCharCode(97 + data.repository.positionInGroup)

    return (
      <>
        <div className="serlo-content-with-spacing-fixes">
          <h2 className="serlo-h2 mt-12">{strings.revisions.context}</h2>
          {char && (
            <span className="mx-side mb-10 inline-block bg-editor-primary-100 px-1">
              {replacePlaceholders(strings.revisions.positionForGrouped, {
                exercise: strings.content.exercises.task,
                title: (
                  <b>
                    {strings.entities.groupedExercise} {char}
                  </b>
                ),
              })}{' '}
            </span>
          )}
          <Lazy>
            <InjectionStaticRenderer
              plugin={EditorPluginType.Injection}
              state={parentId.toString()}
            />
          </Lazy>
        </div>
      </>
    )
  }
}
