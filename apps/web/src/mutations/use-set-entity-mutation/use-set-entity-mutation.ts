import { useRouter } from 'next/router'
import { useContext } from 'react'

import { setAbstractEntityMutation } from './set-abstract-entity-mutation'
import { SetEntityMutationData, SetEntityMutationRunnerData } from './types'
import { showToastNotice } from '../../helper/show-toast-notice'
import { getAliasById, revalidatePath } from '../helper/revalidate-path'
import { useMutationFetchAuthed } from '../helper/use-mutation-fetch'
import { EntityMetaContext } from '@/contexts/entity-meta-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData, UuidType } from '@/data-types'
import { SetAbstractEntityInput } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { successHash } from '@/helper/use-leave-confirm'

export function useSetEntityMutation() {
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetchAuthed()
  const router = useRouter()

  const entityMeta = useContext(EntityMetaContext)
  const entityId = entityMeta?.entityId
  const metaTitle = entityMeta?.metaTitle
  const metaDescription = entityMeta?.metaDescription

  if (!loggedInData) return false
  const mutationStrings = loggedInData.strings.mutations

  return async (data: SetEntityMutationData, taxonomyParentId?: number) => {
    return await setEntityMutationRunner({
      data,
      taxonomyParentId,
    })

    async function setEntityMutationRunner({
      data,
      taxonomyParentId,
    }: SetEntityMutationRunnerData) {
      if (!data.__typename) {
        // eslint-disable-next-line no-console
        console.error('no typename')
        return false
      }
      if (!entityId) {
        // eslint-disable-next-line no-console
        console.error('no entityId')
        return false
      }

      // persist current alias here since it might change on mutation
      const oldAlias = await getAliasById(entityId)

      let input = {}
      try {
        const genericInput = getGenericInputData(mutationStrings, data)
        if (!genericInput) {
          // eslint-disable-next-line no-console
          console.error('no generic input data')
          return false
        }
        const additionalInput = getAdditionalInputData(mutationStrings, data)

        input = {
          entityId,
          ...genericInput,
          ...additionalInput,
          metaTitle,
          metaDescription,
          parentId: genericInput.entityId ? undefined : taxonomyParentId,
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error collecting data, probably missing value?', error)
        return false
      }

      let savedId = undefined
      try {
        //here we rely on the api not to create an empty revision
        savedId = await mutationFetch(setAbstractEntityMutation, input)
        if (!Number.isInteger(savedId)) {
          // eslint-disable-next-line no-console
          console.error('no valid savedId returned')
          return false
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error saving main uuid', error)
        return false
      }

      showToastNotice(mutationStrings.success.saveNeedsReview, 'success', 7000)

      const idFallback = savedId === 0 ? undefined : (savedId as number)
      const id = entityId || idFallback

      const redirectHref = id
        ? getHistoryUrl(id)
        : `/${taxonomyParentId as number}`

      if (oldAlias) await revalidatePath(oldAlias)

      setTimeout(() => {
        void router.push(redirectHref + successHash)
      }, 200)

      return true
    }
  }
}

export function getRequiredString(
  mutationStrings: LoggedInData['strings']['mutations'],
  name: string,
  value?: string
) {
  if (!value || !value.trim()) {
    const msg = `${mutationStrings.errors.valueMissing} ("${name}")`
    showToastNotice(msg, 'warning')
    throw new Error(msg)
  }
  return value
}

function getGenericInputData(
  mutationStrings: LoggedInData['strings']['mutations'],
  data: SetEntityMutationData
): SetAbstractEntityInput | undefined {
  const { __typename, changes, content } = data
  if (!__typename) return

  const changesOrFallback =
    __typename === UuidType.Page
      ? 'Page'
      : getRequiredString(mutationStrings, 'changes', changes)

  return {
    entityType: __typename,
    changes: changesOrFallback,
    content: getRequiredString(mutationStrings, 'content', content),
    needsReview: true,
    subscribeThis: true,
    subscribeThisByEmail: false,
  }
}

function getAdditionalInputData(
  mutationStrings: LoggedInData['strings']['mutations'],
  data: SetEntityMutationData
) {
  const { title, url, content, description } = data
  switch (data.__typename) {
    case UuidType.Course:
    case UuidType.Article:
    case UuidType.Event:
    case UuidType.Page:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
      }

    case UuidType.Exercise:
    case UuidType.ExerciseGroup:
      return {}
    case UuidType.Video:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        // url is stored in content for some reason
        url: getRequiredString(mutationStrings, 'url', content),
        content: getRequiredString(mutationStrings, 'content', description),
      }
    case UuidType.Applet:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        url: getRequiredString(mutationStrings, 'url', url),
      }
  }
  return {}
}
