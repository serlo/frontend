// eslint-disable-next-line import/no-internal-modules
import { eqBy, mapObjIndexed } from 'ramda'

import { showToastNotice } from '../../show-toast-notice'
import { mutationFetch } from '../helper'
import { getSetMutation } from './get-set-mutation'
import {
  ChildFieldsData,
  SetEntityMutationData,
  SetEntityMutationRunnerData,
} from './types'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData, UuidType } from '@/data-types'
import {
  CourseSerializedState,
  TextExerciseGroupSerializedState,
  TextExerciseSerializedState,
} from '@/edtr-io/editor-response-to-state'
import { SetGenericEntityInput } from '@/fetcher/graphql-types/operations'
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
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  return async (
    data: SetEntityMutationData,
    needsReview: boolean,
    initialState: {
      plugin: 'text'
      state: unknown
    },
    taxonomyParentId?: number
  ) =>
    await setEntityMutationRunner({
      auth,
      data,
      needsReview,
      loggedInData,
      initialState,
      taxonomyParentId,
    })
}

export const setEntityMutationRunner = async function ({
  auth,
  data,
  needsReview,
  loggedInData,
  isRecursiveCall,
  initialState,
  savedParentId,
  taxonomyParentId,
}: SetEntityMutationRunnerData) {
  if (!auth || !loggedInData) {
    showToastNotice('Please make sure you are logged in!', 'warning')
    return false
  }

  if (!data.__typename) return false

  try {
    const genericInput = getGenericInputData(loggedInData, data, needsReview)
    const additionalInput = getAdditionalInputData(loggedInData, data)
    const input = {
      ...genericInput,
      ...additionalInput,
      parentId: genericInput.entityId
        ? undefined
        : isRecursiveCall
        ? savedParentId
        : taxonomyParentId,
    }

    // while testing
    // eslint-disable-next-line no-console
    console.log(`saving ${input.title ?? '?'} (${data.__typename})`)

    //here we rely on the api not to create an empty revision
    const savedId = await mutationFetch(
      auth,
      getSetMutation(data.__typename),
      input,
      loggedInData?.strings.mutations.errors
    )

    if (!Number.isInteger(savedId)) return false

    // check for children
    const childrenResult = await loopNestedChildren({
      auth,
      data,
      needsReview,
      loggedInData,
      initialState,
      savedParentId: savedId as number,
    })

    if (!isRecursiveCall && childrenResult) {
      showToastNotice(loggedInData.strings.mutations.success.save, 'success')
      const id =
        data.id === 0
          ? savedId === 0
            ? undefined
            : (savedId as number)
          : data.id
      if (id) window.location.href = getHistoryUrl(id)
      else window.location.href = `/${taxonomyParentId as number}`
    }

    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('probably missing value?')
    return false
  }
}

const loopNestedChildren = async ({
  auth,
  data,
  needsReview,
  loggedInData,
  initialState,
  savedParentId,
}: SetEntityMutationRunnerData): Promise<boolean> => {
  if (!data.__typename) return false

  let success = true

  if (data.__typename === UuidType.Course && data['course-page']) {
    success =
      success &&
      (await mapField(
        data['course-page'],
        UuidType.CoursePage,
        (initialState.state as CourseSerializedState)['course-page']
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
        (initialState.state as TextExerciseGroupSerializedState)[
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
        (initialState.state as TextExerciseSerializedState)['text-solution']
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
        if (hasNoChanges(oldVersion, child)) {
          // while testing we rely on the API to not create a new revision
          // eslint-disable-next-line no-console
          console.log('should not create a new revision')
          //return true
        }

        const input = {
          ...child,
          __typename: childrenType,
          changes: data.changes,
          csrf: data.csrf,
          controls: data.controls,
        }

        const success = await setEntityMutationRunner({
          auth,
          data: input as SetEntityMutationData,
          needsReview,
          loggedInData,
          isRecursiveCall: true,
          savedParentId,
          initialState,
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
