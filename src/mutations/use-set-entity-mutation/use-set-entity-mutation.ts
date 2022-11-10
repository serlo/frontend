// eslint-disable-next-line import/no-internal-modules
import { useRouter } from 'next/router'
import { eqBy, mapObjIndexed } from 'ramda'

import { showToastNotice } from '../../helper/show-toast-notice'
import { useMutationFetch } from '../helper/use-mutation-fetch'
import { getSetMutation } from './get-set-mutation'
import {
  ChildFieldsData,
  SetEntityMutationData,
  SetEntityMutationRunnerData,
} from './types'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData, UuidType } from '@/data-types'
import {
  CourseSerializedState,
  TextExerciseGroupSerializedState,
  TextExerciseSerializedState,
} from '@/edtr-io/editor-response-to-state'
import { SetGenericEntityInput } from '@/fetcher/graphql-types/operations'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

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

  return async (
    data: SetEntityMutationData,
    needsReview: boolean,
    initialState: {
      plugin: string
      state?: unknown
    },
    taxonomyParentId?: number
  ) =>
    await setEntityMutationRunner({
      mutationFetch,
      data,
      needsReview,
      loggedInData,
      initialState,
      taxonomyParentId,
      router,
    })
}

export const setEntityMutationRunner = async function ({
  mutationFetch,
  data,
  needsReview,
  loggedInData,
  isRecursiveCall,
  initialState,
  savedParentId,
  taxonomyParentId,
  router,
}: SetEntityMutationRunnerData) {
  if (!loggedInData) {
    showToastNotice('Please make sure you are logged in!', 'warning')
    return false
  }

  if (!data.__typename) return false

  let input = {}
  try {
    const genericInput = getGenericInputData(loggedInData, data, needsReview)
    const additionalInput = getAdditionalInputData(loggedInData, data)
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
      mutationFetch,
      data,
      needsReview,
      loggedInData,
      initialState,
      savedParentId: savedId as number,
      router,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`error saving children of ${savedId as number}`)
    return false
  }

  if (!isRecursiveCall && childrenResult) {
    showToastNotice(
      needsReview
        ? loggedInData.strings.mutations.success.saveNeedsReview
        : loggedInData.strings.mutations.success.save,
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
    void router.push(redirectHref)
  }

  return true
}

const loopNestedChildren = async ({
  mutationFetch,
  data,
  needsReview,
  loggedInData,
  initialState,
  savedParentId,
  router,
}: SetEntityMutationRunnerData): Promise<boolean> => {
  if (!data.__typename) return false

  let success = true

  const initialStateState = hasOwnPropertyTs(initialState, 'state')
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
  if (
    (data.__typename === UuidType.Exercise ||
      data.__typename === UuidType.GroupedExercise) &&
    data['text-solution']
  ) {
    success =
      success &&
      (await mapField(
        data['text-solution'],
        UuidType.Solution,
        (initialStateState as TextExerciseSerializedState)?.['text-solution']
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
          mutationFetch,
          data: input as SetEntityMutationData,
          needsReview,
          loggedInData,
          isRecursiveCall: true,
          savedParentId,
          initialState,
          router,
        })
        if (!success) throw 'revision of one child could not be saved'
      }
      return true
    }

    try {
      const result = await syncLoop()
      return result
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return false
    }
  }
}

export function getRequiredString(
  loggedInData: LoggedInData,
  name: string,
  value?: string
) {
  if (!value || !value.trim()) {
    const msg = `${loggedInData.strings.mutations.errors.valueMissing} ("${name}")`
    showToastNotice(msg, 'warning')
    throw msg
  }
  return value
}

function getGenericInputData(
  loggedInData: LoggedInData,
  data: SetEntityMutationData,
  needsReview: boolean
): SetGenericEntityInput {
  const content =
    data.__typename === UuidType.Course ? data.description : data.content

  return {
    changes: getRequiredString(loggedInData, 'changes', data.changes),
    content: getRequiredString(loggedInData, 'content', content),
    entityId: data.id ? data.id : undefined,
    needsReview: needsReview,
    subscribeThis: data.controls.subscription?.subscribe === 1 ? true : false, //simplify when old code is removed
    subscribeThisByEmail:
      data.controls.subscription?.mailman === 1 ? true : false, //simplify when old code is removed
  }
}

function getAdditionalInputData(
  loggedInData: LoggedInData,
  data: SetEntityMutationData
) {
  switch (data.__typename) {
    case UuidType.Applet:
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.url),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Article:
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Course:
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaDescription: data['meta_description'],
      }
    case UuidType.CoursePage:
      return { title: getRequiredString(loggedInData, 'title', data.title) }
    case UuidType.Event:
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case UuidType.Exercise:
      return {}
    case UuidType.ExerciseGroup:
      return { cohesive: data.cohesive === 'true' }
    case UuidType.Video:
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.content), // url is stored in content for some reason
        content: getRequiredString(loggedInData, 'content', data.description),
      }
  }
  return {}
}
