import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { TaxonomyTerm } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import type { InviteModalProps } from './invite-modal'
import { AuthorToolsData } from '../foldout-author-menus/author-tools'
import type { MoreAuthorToolsProps } from '../foldout-author-menus/more-author-tools'
import { UserToolsItem } from '../user-tools-item'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { getEditUrl } from '@/helper/urls/get-edit-url'

const InviteModal = dynamic<InviteModalProps>(() =>
  import('@/components/user-tools/edit-or-invite/invite-modal').then(
    (mod) => mod.InviteModal
  )
)

const MoreAuthorTools = dynamic<MoreAuthorToolsProps>(() =>
  import('@/components/user-tools/foldout-author-menus/more-author-tools').then(
    (mod) => mod.MoreAuthorTools
  )
)

export interface TaxAddOrInviteProps {
  data?: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export function TaxAddOrInvite({ data, aboveContent }: TaxAddOrInviteProps) {
  const auth = useAuthentication()
  const canDo = useCanDo()
  const { strings } = useInstanceData()
  const [inviteOpen, setInviteOpen] = useState<string | false>(false)

  if (!data || data.typename !== UuidType.TaxonomyTerm) return null

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isInvite = !auth

  const href = getEditHref()
  const showEditAction = href || isInvite

  const title = isExerciseFolder
    ? strings.editOrAdd.addNewExercises
    : strings.editOrAdd.addNewEntities

  return (
    <>
      {isInvite ? (
        <>
          {isExerciseFolder && showEditAction ? (
            <UserToolsItem
              title={strings.editOrAdd.editExercises}
              onClick={() => setInviteOpen('edit')}
              aboveContent={aboveContent}
              icon={faPencilAlt}
            />
          ) : null}
          <UserToolsItem
            title={title}
            onClick={() => setInviteOpen('add')}
            aboveContent={aboveContent}
            icon={faPlusCircle}
          />
          {isInvite && inviteOpen ? (
            <InviteModal
              type={`${data.taxonomyType ?? ''}-${inviteOpen}`}
              isOpen={!!inviteOpen}
              onClose={() => setInviteOpen(false)}
            />
          ) : null}
        </>
      ) : (
        <MoreAuthorTools
          data={data}
          aboveContent={aboveContent}
          taxNewItems
          title={title}
        />
      )}
    </>
  )

  function getEditHref(): string | undefined {
    if (!data) return undefined
    const revisionId = data.revisionId
    const url = getEditUrl(data.id, revisionId, true)
    return canDo(TaxonomyTerm.set) ? url : undefined
  }
}
