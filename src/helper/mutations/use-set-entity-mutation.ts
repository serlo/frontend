import {
  SetAppletInput,
  SetGenericEntityInput,
  SetArticleInput,
  SetCourseInput,
  SetCoursePageInput,
  SetEventInput,
  SetExerciseGroupInput,
  SetVideoInput,
} from '@serlo/api'
import { gql } from 'graphql-request'
// eslint-disable-next-line import/no-internal-modules
import equals from 'ramda/src/equals'
import { RefObject } from 'react'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import {
  AppletSerializedState,
  ArticleSerializedState,
  CoursePageSerializedState,
  CourseSerializedState,
  EventSerializedState,
  TextExerciseGroupSerializedState,
  TextExerciseSerializedState,
  TextSolutionSerializedState,
  VideoSerializedState,
} from '@/edtr-io/editor-response-to-state'

export interface OnSaveData {
  csrf?: string
  controls: {
    subscription?: {
      subscribe: number
      mailman: number
    }
    checkout?: boolean
  }
}

export type SetEntityInputTypes =
  | SetGenericEntityInput
  | SetAppletInput
  | SetArticleInput
  | SetCourseInput
  | SetCoursePageInput
  | SetEventInput
  | SetExerciseGroupInput
  | SetVideoInput

export type SupportedTypesSerializedState =
  | AppletSerializedState
  | ArticleSerializedState
  | CourseSerializedState
  | CoursePageSerializedState
  | EventSerializedState
  | TextExerciseSerializedState
  | TextExerciseGroupSerializedState
  | TextSolutionSerializedState
  | VideoSerializedState

export type SetEntityMutationData = SupportedTypesSerializedState & OnSaveData

export function useSetEntityMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  return async (
    data: SetEntityMutationData,
    needsReview: boolean,
    initialState: {
      plugin: 'text'
      state: unknown
    }
  ) =>
    await setEntityMutationRunner({
      auth,
      data,
      needsReview,
      loggedInData,
      initialState,
    })
}

interface SetEntityMutationRunnerData {
  auth: RefObject<AuthenticationPayload>
  data: SetEntityMutationData
  needsReview: boolean
  loggedInData: LoggedInData | null
  isRecursiveCall?: boolean
  initialState: {
    plugin: 'text'
    state: unknown
  }
  parentId?: number
}

export const setEntityMutationRunner = async function ({
  auth,
  data,
  needsReview,
  loggedInData,
  isRecursiveCall,
  initialState,
  parentId,
}: SetEntityMutationRunnerData) {
  if (!auth || !loggedInData) {
    showToastNotice('Please make sure you are logged in!', 'warning')
    return false
  }

  if (!data.__typename) return false

  const childrenResult = await loopNestedChildren({
    auth,
    data,
    needsReview,
    loggedInData,
    initialState,
  })

  try {
    const genericInput = getGenericInputData(loggedInData, data, needsReview)
    const additionalInput = getAdditionalInputData(loggedInData, data)
    const input = { ...genericInput, ...additionalInput, parentId }

    const success = await mutationFetch(
      auth,
      getAddMutation(data.__typename),
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success && childrenResult) {
      if (!isRecursiveCall) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        window.location.href = `/entity/repository/history/${data.id}`
      }
      return true
    }
    return false
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('probably missing value?')
    return false
  }
}

const loopNestedChildren = async ({
  auth,
  data,
  needsReview,
  loggedInData,
  initialState,
}: SetEntityMutationRunnerData): Promise<boolean> => {
  if (!data.__typename) return false

  let success = true

  if (data.__typename === 'Course' && data['course-page']) {
    success =
      success &&
      (await mapField(
        data['course-page'],
        'CoursePage',
        (initialState.state as CourseSerializedState)['course-page']
      ))
  }
  if (data.__typename === 'ExerciseGroup' && data['grouped-text-exercise']) {
    success =
      success &&
      (await mapField(
        data['grouped-text-exercise'],
        'Exercise',
        (initialState.state as TextExerciseGroupSerializedState)[
          'grouped-text-exercise'
        ]
      ))
  }
  if (data.__typename === 'Exercise' && data['text-solution']) {
    success =
      success &&
      (await mapField(
        data['text-solution'],
        'Solution',
        (initialState.state as TextExerciseSerializedState)['text-solution']
      ))
  }

  return success

  type ChildFieldsData =
    | CoursePageSerializedState
    | TextSolutionSerializedState
    | TextExerciseSerializedState

  async function mapField(
    childrenData: ChildFieldsData | ChildFieldsData[],
    childrenType: ChildFieldsData['__typename'],
    childrenInitialData?: ChildFieldsData | ChildFieldsData[]
  ) {
    //bonus points if we check if they were changed at all
    const childrenArray = Array.isArray(childrenData)
      ? childrenData
      : [childrenData]

    const childrenInitialArray = Array.isArray(childrenInitialData)
      ? childrenInitialData
      : [childrenInitialData]

    const results = await Promise.all(
      childrenArray.map(async (child) => {
        const oldVersion = childrenInitialArray.find(
          (oldChild) => oldChild?.id === child.id
        )

        if (equals(oldVersion, child)) return true // no changes

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
          parentId: oldVersion ? undefined : data.id, //only needed for creating new entity
          initialState,
        })
        return success
      })
    )
    return results.every((result) => result === true)
  }
}

const setAppletMutation = gql`
  mutation setApplet($input: SetAppletInput!) {
    entity {
      setApplet(input: $input) {
        success
      }
    }
  }
`
const setArticleMutation = gql`
  mutation setArticle($input: SetArticleInput!) {
    entity {
      setArticle(input: $input) {
        success
      }
    }
  }
`
const setCourseMutation = gql`
  mutation setCourse($input: SetCourseInput!) {
    entity {
      setCourse(input: $input) {
        success
      }
    }
  }
`
const setCoursePageMutation = gql`
  mutation setCoursePage($input: SetCoursePageInput!) {
    entity {
      setCoursePage(input: $input) {
        success
      }
    }
  }
`
const setEventMutation = gql`
  mutation setEvent($input: SetEventInput!) {
    entity {
      setEvent(input: $input) {
        success
      }
    }
  }
`
const setExerciseMutation = gql`
  mutation setExercise($input: SetGenericEntityInput!) {
    entity {
      setExercise(input: $input) {
        success
      }
    }
  }
`
const setExerciseGroupMutation = gql`
  mutation setExerciseGroup($input: SetExerciseGroupInput!) {
    entity {
      setExerciseGroup(input: $input) {
        success
      }
    }
  }
`
const setGroupedExerciseMutation = gql`
  mutation setGroupedExercise($input: SetGenericEntityInput!) {
    entity {
      setGroupedExercise(input: $input) {
        success
      }
    }
  }
`
const setSolutionMutation = gql`
  mutation setSolution($input: SetGenericEntityInput!) {
    entity {
      setSolution(input: $input) {
        success
      }
    }
  }
`
const setVideoMutation = gql`
  mutation setVideo($input: SetVideoInput!) {
    entity {
      setVideo(input: $input) {
        success
      }
    }
  }
`

function getAddMutation(
  type: Exclude<SupportedTypesSerializedState['__typename'], undefined>
) {
  return {
    Applet: setAppletMutation,
    Article: setArticleMutation,
    Course: setCourseMutation,
    CoursePage: setCoursePageMutation,
    Event: setEventMutation,
    Exercise: setExerciseMutation,
    ExerciseGroup: setExerciseGroupMutation,
    GroupedExercise: setGroupedExerciseMutation,
    Solution: setSolutionMutation,
    Video: setVideoMutation,
  }[type]
}

function getRequiredString(
  loggedInData: LoggedInData,
  name: string,
  value?: string
) {
  if (!value) {
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
  const content = data.__typename === 'Course' ? data.description : data.content

  return {
    changes: getRequiredString(loggedInData, 'changes', data.changes),
    content: getRequiredString(loggedInData, 'content', content),
    entityId: data.id,
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
    case 'Applet':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.url),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case 'Article':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case 'Course':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaDescription: data['meta_description'],
      }
    case 'CoursePage':
      return { title: getRequiredString(loggedInData, 'title', data.title) }
    case 'Event':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    case 'Exercise':
      return {}
    case 'ExerciseGroup':
      return { cohesive: data.cohesive === 'true' }
    case 'Video':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.content), // url is stored in content for some reason
        content: getRequiredString(loggedInData, 'content', data.description),
      }
  }
  return {}
}
