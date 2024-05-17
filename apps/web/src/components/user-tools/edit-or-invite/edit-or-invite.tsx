import { faClock, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { TaxonomyTerm, Uuid } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

import type { InviteModalProps } from './invite-modal'
import { AuthorToolsData } from '../foldout-author-menus/author-tools'
import { UserToolsItem } from '../user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidRevType, UuidType } from '@/data-types'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { getCourseIdFromPath } from '@editor/plugins/course/helper/get-course-id-from-path'

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
  const auth = useAuthentication()
  const canDo = useCanDo()
  const router = useRouter()
  const { strings } = useInstanceData()
  const [inviteOpen, setInviteOpen] = useState(false)

  if (!data) return null

  const showInvite = ![
    UuidType.Page,
    UuidType.Event,
    UuidType.TaxonomyTerm,
  ].includes(data.typename as UuidType)

  const isInvite = !auth && showInvite

  const hasUnrevised =
    unrevisedRevisions !== undefined && unrevisedRevisions > 0

  const isCourse = data.typename === UuidType.Course

  const href = isCourse
    ? data.unrevisedCourseRevisions && data.unrevisedCourseRevisions > 0
      ? getHistoryUrl(data.courseId ?? data.id)
      : getEditHref()
    : hasUnrevised
      ? getHistoryUrl(data.id)
      : getEditHref()
  if (!href && !isInvite) return null

  const title = hasUnrevised
    ? `${strings.editOrAdd.unrevised} (${unrevisedRevisions || ''})`
    : strings.editOrAdd.button

  const icon = hasUnrevised ? faClock : faPencilAlt

  return (
    <>
      <UserToolsItem
        title={title}
        href={href}
        onClick={isInvite ? () => setInviteOpen(true) : undefined}
        aboveContent={aboveContent}
        icon={icon}
      />
      {isInvite && inviteOpen ? (
        <InviteModal
          type={data.typename}
          isOpen={inviteOpen}
          onClose={() => setInviteOpen(false)}
        />
      ) : null}
    </>
  )

  function getEditHref(): string | undefined {
    if (!data) return undefined
    const revisionId = data.revisionId
    const { typename, id } = data

    const coursePageId = getCourseIdFromPath(router.asPath)

    const url = isCourse
      ? getEditUrl(data.courseId ?? id, undefined, false) + '#' + coursePageId
      : getEditUrl(id, revisionId, typename.startsWith('Taxonomy'))

    if (typename === UuidType.Page || typename === UuidRevType.Page) {
      return canDo(Uuid.create(UuidRevType.Page)) ? url : undefined
    }
    if (typename === UuidType.TaxonomyTerm)
      return canDo(TaxonomyTerm.set) ? url : undefined

    return url
  }
}
