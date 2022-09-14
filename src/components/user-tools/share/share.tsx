import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthorToolsData } from '../more-autor-tools/author-tools-hover-menu'
import { UserToolsItem } from '../user-tools-item'
import type { ShareModalProps } from '@/components/user-tools/share/share-modal'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share/share-modal').then(
    (mod) => mod.ShareModal
  )
)

interface ShareProps {
  data?: AuthorToolsData
  aboveContent?: boolean
}

export function Share({ data, aboveContent }: ShareProps) {
  const { strings } = useInstanceData()
  const [shareOpen, setShareOpen] = useState(false)

  if (!data) return null

  const showPdf = [
    UuidType.Page,
    UuidType.Article,
    UuidType.CoursePage,
    UuidType.ExerciseGroup,
    UuidType.Exercise,
    UuidType.Solution,
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
