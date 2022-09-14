import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { TaxonomyTerm, Uuid } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthorToolsData } from '../author-tools'
import { UserToolsItem } from '../user-tools-item'
import type { InviteModalProps } from './invite-modal'
import { useAuthentication } from '@/auth/use-authentication'
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

interface EditOrInviteProps {
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export function EditOrInvite({
  data,
  unrevisedRevisions,
  aboveContent,
}: EditOrInviteProps) {
  const auth = useAuthentication()
  const canDo = useCanDo()
  const { strings } = useInstanceData()
  const [inviteOpen, setInviteOpen] = useState(false)

  if (!data) return null

  const showInvite = ![
    UuidType.Page,
    UuidType.Event,
    UuidType.TaxonomyTerm,
    UuidType.User,
  ].includes(data.type as UuidType)

  const isInvite = !auth.current && showInvite

  const hasUnrevised =
    unrevisedRevisions !== undefined && unrevisedRevisions > 0

  const href = hasUnrevised ? getHistoryUrl(data.id) : getEditHref()
  if (!href && !isInvite) return null

  const title = hasUnrevised
    ? `${strings.edit.unrevised} (${unrevisedRevisions || ''})`
    : strings.edit.button

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
        <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
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
    if (type == UuidType.TaxonomyTerm)
      return canDo(TaxonomyTerm.set) ? url : undefined
    return url
  }
}
