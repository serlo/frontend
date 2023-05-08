import { faClock, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { TaxonomyTerm, Uuid } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthorToolsData } from '../foldout-author-menus/author-tools'
import { UserToolsItem } from '../user-tools-item'
import type { InviteModalProps } from './invite-modal'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidRevType, UuidType } from '@/data-types'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

const InviteModal = dynamic<InviteModalProps>(() =>
  import('@/components/user-tools/edit-or-invite/invite-modal').then(
    (mod) => mod.InviteModal
  )
)

export interface EditOrInviteProps {
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export function EditOrInvite({
  data,
  unrevisedRevisions,
  aboveContent,
}: EditOrInviteProps) {
  const canDo = useCanDo()
  const { strings } = useInstanceData()
  const [inviteOpen, setInviteOpen] = useState(false)

  if (!data) return null

  const isInvite = false

  const hasUnrevised =
    unrevisedRevisions !== undefined && unrevisedRevisions > 0

  const href = hasUnrevised ? getHistoryUrl(data.id) : getEditHref()
  if (!href && !isInvite) return null

  const title = hasUnrevised
    ? `${strings.editOrAdd.unrevised} (${unrevisedRevisions || ''})`
    : strings.editOrAdd.button

  const icon = hasUnrevised ? faClock : faPencilAlt

  return (
    <>
      <UserToolsItem
        title={title}
        href={isInvite ? undefined : href}
        onClick={isInvite ? () => setInviteOpen(true) : undefined}
        aboveContent={aboveContent}
        icon={icon}
      />
      {isInvite && inviteOpen ? (
        <InviteModal
          type={data.type}
          isOpen={inviteOpen}
          onClose={() => setInviteOpen(false)}
        />
      ) : null}
    </>
  )

  function getEditHref(): string | undefined {
    if (!data) return undefined
    const revisionId = data.revisionId
    const { type, id } = data
    const url = getEditUrl(id, revisionId, type.startsWith('Taxonomy'))

    if (type === UuidType.Page || type === UuidRevType.Page) {
      return canDo(Uuid.create(UuidRevType.Page)) ? url : undefined
    }
    if (type === UuidType.TaxonomyTerm)
      return canDo(TaxonomyTerm.set) ? url : undefined
    return url
  }
}
