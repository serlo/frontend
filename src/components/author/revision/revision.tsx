import { Entity } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import type { CheckoutRejectButtonsProps } from './checkout-reject-buttons'
import { RevisionHeader } from './revision-header'
import {
  RevisionPreviewBoxes,
  RevisionPreviewBoxesProps,
} from './revision-preview-boxes'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Injection } from '@/components/content/injection'
import { Link } from '@/components/content/link'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionData } from '@/data-types'
import { removeHash } from '@/helper/remove-hash'
import { renderNested } from '@/schema/article-renderer'

export interface RevisionProps {
  data: RevisionData
}

const CheckoutRejectButtons = dynamic<CheckoutRejectButtonsProps>(() =>
  import('@/components/author/revision/checkout-reject-buttons').then(
    (mod) => mod.CheckoutRejectButtons
  )
)
export enum DisplayModes {
  This = 'this',
  SideBySide = 'sidebyside',
  Diff = 'diff',
}

export function Revision({ data }: RevisionProps) {
  const auth = useAuthentication()
  const { strings } = useInstanceData()
  const canDo = useCanDo()
  const canCheckoutAndReject =
    canDo(Entity.checkoutRevision) && canDo(Entity.rejectRevision)
  const isCurrentRevision = data.thisRevision.id === data.currentRevision.id
  const hasCurrentRevision = data.currentRevision.id !== undefined
  const isRejected = data.thisRevision.trashed
  const [displayMode, setDisplayMode] = useState<DisplayModes>(
    DisplayModes.This
  )
  const repositoryAlias = data.repository.alias ?? `/${data.repository.id}`

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window.location.hash.substr(1) === DisplayModes.SideBySide) {
      setDisplayMode(DisplayModes.SideBySide)
      removeHash()
    }
  })

  return (
    <div className="relative pb-52">
      {renderHeader()}

      {displayMode === DisplayModes.SideBySide && (
        <div className="flex mt-12">
          <div className="flex-1 px-side pb-6 bg-brand-50">
            <h2 className="serlo-h2 mt-12 mb-4">
              {strings.revisions.currentVersion}
            </h2>
            {renderPreviewBoxes(data.currentRevision)}
          </div>
          <div className="flex-1 ml-4 mr-side">
            <h2 className="serlo-h2 mt-12 mb-4">
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
        repositoryAlias={repositoryAlias}
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
          type: 'Revision',
          id: data.repository.id,
          revisionId: data.thisRevision.id,
          checkoutRejectButtons:
            auth.current && canCheckoutAndReject ? (
              <CheckoutRejectButtons
                revisionId={data.thisRevision.id}
                repositoryAlias={repositoryAlias}
                isRejected={isRejected}
                isCurrent={isCurrentRevision}
              />
            ) : undefined,
        }}
      />
    )
  }

  function renderExercisePreview() {
    if (
      !['solution', 'exerciseGroup', 'groupedExercise'].includes(data.type) ||
      data.repository.parentId === undefined
    )
      return null
    const { parentId } = data.repository

    if (!hasCurrentRevision) {
      return (
        <p className="serlo-p mt-20">
          <Link href={`/entity/repository/history/${parentId}`}>
            {strings.revisions.parentFallbackLink}
          </Link>
        </p>
      )
    }

    return (
      <div className="serlo-content-with-spacing-fixes">
        <h2 className="serlo-h2 mt-12">{strings.revisions.context}</h2>
        <Injection
          href={`/${parentId}`}
          renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
        />
        )
      </div>
    )
  }
}
