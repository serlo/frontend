// eslint-disable-next-line import/no-internal-modules
import { useRouter } from 'next/router'
import { eqBy, mapObjIndexed } from 'ramda'

import { getSetMutation } from './get-set-mutation'
import {
  ChildFieldsData,
  SetEntityMutationData,
  SetEntityMutationRunnerData,
} from './types'
import { showToastNotice } from '../../helper/show-toast-notice'
import { useMutationFetch } from '../helper/use-mutation-fetch'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData, UuidType } from '@/data-types'
import { SetGenericEntityInput } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { successHash } from '@/helper/use-leave-confirm'
import type {
  CourseSerializedState,
  TextExerciseGroupSerializedState,
} from '@/serlo-editor-integration/convert-editor-response-to-state'

const equalsWithEmptyStringIsNull = eqBy(
  mapObjIndexed((v) => (v === '' || v === undefined ? null : v))
)

const hasNoChanges = (
  oldVersion?: ChildFieldsData | Record<string, unknown>,
  currentVersion?: ChildFieldsData | Record<string, unknown>
) => {
  return (
    oldVersion &&
    currentVersion &&
    equalsWithEmptyStringIsNull(
      oldVersion as Record<string, unknown>,
      currentVersion as Record<string, unknown>
    )
  )
}

export function useSetEntityMutation() {
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()
  const router = useRouter()

  if (!loggedInData) return false
  const mutationStrings = loggedInData.strings.mutations

  return async (
    data: SetEntityMutationData,
    needsReview: boolean,
    initialState: {
      plugin: string
      state?: unknown
    },
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
      if (!data.__typename) return

      let input = {}
      try {
        const genericInput = getGenericInputData(
          mutationStrings,
          data,
          needsReview
        )
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
        console.error('error collecting data, probably missing value?')
        return false
      }

      let savedId = undefined
      try {
        //here we rely on the api not to create an empty revision
        savedId = await mutationFetch(getSetMutation(data.__typename), input)
        if (!Number.isInteger(savedId)) return false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error saving main uuid')
        return false
      }

      // check for children and save them
      let childrenResult = undefined
      try {
        childrenResult = await loopNestedChildren({
          data,
          savedParentId: savedId as number,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`error saving children of ${savedId as number}`)
        return false
      }

      if (!isRecursiveCall && childrenResult) {
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
        void router.push(redirectHref + successHash)
      }

      return true
    }

    async function loopNestedChildren({
      data,
      savedParentId,
    }: SetEntityMutationRunnerData): Promise<boolean> {
      if (!data.__typename) return false

      let success = true

      const initialStateState = Object.hasOwn(initialState, 'state')
        ? initialState.state
        : undefined

      if (data.__typename === UuidType.Course && data['course-page']) {
        success =
          success &&
          (await mapField(
            data['course-page'],
            UuidType.CoursePage,
            (initialStateState as CourseSerializedState)?.['course-page']
          ))
      }
      if (
        data.__typename === UuidType.ExerciseGroup &&
        data['grouped-text-exercise']
      ) {
        success =
          success &&
          (await mapField(
            data['grouped-text-exercise'],
            UuidType.GroupedExercise,
            (initialStateState as TextExerciseGroupSerializedState)?.[
              'grouped-text-exercise'
            ]
          ))
      }

      return success

      async function mapField(
        childrenData: ChildFieldsData | ChildFieldsData[],
        childrenType: ChildFieldsData['__typename'],
        childrenInitialData?: ChildFieldsData | ChildFieldsData[]
      ) {
        const childrenArray = Array.isArray(childrenData)
          ? childrenData
          : [childrenData]

        const childrenInitialArray = Array.isArray(childrenInitialData)
          ? childrenInitialData
          : [childrenInitialData]

        async function syncLoop() {
          for (const child of childrenArray) {
            const oldVersion = childrenInitialArray.find(
              (oldChild) => oldChild?.id === child.id
            )

            // only request new revision when entity changed
            if (hasNoChanges(oldVersion, child)) continue

            const input = {
              ...child,
              __typename: childrenType,
              changes: data.changes,
              controls: data.controls,
            }

            const success = await setEntityMutationRunner({
              data: input as SetEntityMutationData,
              isRecursiveCall: true,
              savedParentId,
            })
            if (!success) throw 'revision of one child could not be saved'
          }
          return true
        }

        try {
          return await syncLoop()
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
          return false
        }
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
): SetGenericEntityInput {
  const content =
    data.__typename === UuidType.Course ? data.description : data.content

  return {
    changes: getRequiredString(mutationStrings, 'changes', data.changes),
    content: getRequiredString(mutationStrings, 'content', content),
    entityId: data.id ? data.id : undefined,
    needsReview,
    subscribeThis: data.controls.notificationSubscription ?? false,
    subscribeThisByEmail: data.controls.emailSubscription ?? false,
  }
}

function getAdditionalInputData(
  mutationStrings: LoggedInData['strings']['mutations'],
  data: SetEntityMutationData
) {
  switch (data.__typename) {
    case UuidType.Applet:
      return {
        title: getRequiredString(mutationStrings, 'title', data.title),
        url: getRequiredString(mutationStrings, 'url', data.url),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Article:
      return {
        title: getRequiredString(mutationStrings, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Course:
      return {
        title: getRequiredString(mutationStrings, 'title', data.title),
        metaDescription: data['meta_description'],
      }
    case UuidType.CoursePage:
      return { title: getRequiredString(mutationStrings, 'title', data.title) }
    case UuidType.Event:
      return {
        title: getRequiredString(mutationStrings, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Exercise:
      return {}
    case UuidType.ExerciseGroup:
      return { cohesive: data.cohesive === 'true' }
    case UuidType.Video:
      return {
        title: getRequiredString(mutationStrings, 'title', data.title),
        url: getRequiredString(mutationStrings, 'url', data.content), // url is stored in content for some reason
        content: getRequiredString(
          mutationStrings,
          'content',
          data.description
        ),
      }
  }
  return {}
}
