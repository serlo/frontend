import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import type { MoreAuthorToolsProps } from '../foldout-author-menus/more-author-tools'
import { UserToolsItem } from '../user-tools-item'
import type { ShareModalProps } from '@/components/user-tools/share/share-modal'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share/share-modal').then(
    (mod) => mod.ShareModal
  )
)

export function Share({ data, aboveContent }: MoreAuthorToolsProps) {
  const { strings } = useInstanceData()
  const [shareOpen, setShareOpen] = useState(false)

  const showPdf =
    data &&
    [
      UuidType.Page,
      UuidType.Article,
      UuidType.CoursePage,
      UuidType.ExerciseGroup,
      UuidType.Exercise,
    ].includes(data.type as UuidType)

  return (
    <>
      <UserToolsItem
        title={strings.share.button}
        onClick={() => setShareOpen(true)}
        aboveContent={aboveContent}
        icon={faShareAlt}
      />
      {shareOpen ? (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          showPdf={showPdf}
        />
      ) : null}
    </>
  )
}
