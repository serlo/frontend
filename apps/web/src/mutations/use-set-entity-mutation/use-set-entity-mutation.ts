// eslint-disable-next-line import/no-internal-modules
import { useRouter } from 'next/router'

import { setAbstractEntityMutation } from './set-abstract-entity-mutation'
import { SetEntityMutationData, SetEntityMutationRunnerData } from './types'
import { showToastNotice } from '../../helper/show-toast-notice'
import { getAliasById, revalidatePath } from '../helper/revalidate-path'
import { useMutationFetch } from '../helper/use-mutation-fetch'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData, UuidType } from '@/data-types'
import { SetAbstractEntityInput } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { successHash } from '@/helper/use-leave-confirm'

export function useSetEntityMutation() {
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()
  const router = useRouter()

  if (!loggedInData) return false
  const mutationStrings = loggedInData.strings.mutations

  return async (
    data: SetEntityMutationData,
    needsReview: boolean,
    taxonomyParentId?: number
  ) => {
    return await setEntityMutationRunner({
      data,
      taxonomyParentId,
    })

    async function setEntityMutationRunner({
      data,
      isRecursiveCall,
      savedParentId,
      taxonomyParentId,
    }: SetEntityMutationRunnerData) {
      if (!data.__typename) {
        // eslint-disable-next-line no-console
        console.error('no typename')
        return false
      }

      // persist current alias here since it might change on mutation
      const oldAlias = await getAliasById(data.id)

      let input = {}
      try {
        const genericInput = getGenericInputData(
          mutationStrings,
          data,
          needsReview
        )
        if (!genericInput) {
          // eslint-disable-next-line no-console
          console.error('no generic input data')
          return false
        }
        const additionalInput = getAdditionalInputData(mutationStrings, data)

        input = {
          ...genericInput,
          ...additionalInput,
          parentId: genericInput.entityId
            ? undefined
            : isRecursiveCall
              ? savedParentId
              : taxonomyParentId,
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

      if (!isRecursiveCall) {
        showToastNotice(
          needsReview
            ? mutationStrings.success.saveNeedsReview
            : mutationStrings.success.save,
          'success',
          7000
        )
        const id =
          data.id === 0
            ? savedId === 0
              ? undefined
              : (savedId as number)
            : data.id
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
}

export function getRequiredString(
  mutationStrings: LoggedInData['strings']['mutations'],
  name: string,
  value?: string
) {
  if (!value || !value.trim()) {
    const msg = `${mutationStrings.errors.valueMissing} ("${name}")`
    showToastNotice(msg, 'warning')
    throw msg
  }
  return value
}

function getGenericInputData(
  mutationStrings: LoggedInData['strings']['mutations'],
  data: SetEntityMutationData,
  needsReview: boolean
): SetAbstractEntityInput | undefined {
  const { __typename, changes, content, controls, id } = data
  if (!__typename) return

  const changesOrFallback =
    __typename === UuidType.Page
      ? 'Page'
      : getRequiredString(mutationStrings, 'changes', changes)

  return {
    entityType: __typename,
    changes: changesOrFallback,
    content: getRequiredString(mutationStrings, 'content', content),
    entityId: id ? id : undefined,
    needsReview,
    subscribeThis: controls.notificationSubscription ?? false,
    subscribeThisByEmail: controls.emailSubscription ?? false,
  }
}

function getAdditionalInputData(
  mutationStrings: LoggedInData['strings']['mutations'],
  data: SetEntityMutationData
) {
  const {
    title,
    url,
    meta_title: metaTitle,
    meta_description: metaDescription,
    content,
    description,
  } = data
  switch (data.__typename) {
    case UuidType.Applet:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        url: getRequiredString(mutationStrings, 'url', url),
        metaTitle,
        metaDescription,
      }
    case UuidType.Article:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        metaTitle,
        metaDescription,
      }
    case UuidType.Course:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        metaDescription,
      }
    case UuidType.Event:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        metaTitle,
        metaDescription,
      }
    case UuidType.Page:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        metaTitle,
        metaDescription,
      }
    case UuidType.Exercise:
      return {}
    case UuidType.ExerciseGroup:
      return {}
    case UuidType.Video:
      return {
        title: getRequiredString(mutationStrings, 'title', title),
        // url is stored in content for some reason
        url: getRequiredString(mutationStrings, 'url', content),
        content: getRequiredString(mutationStrings, 'content', description),
      }
  }
  return {}
}
