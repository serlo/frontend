import {
  AddAppletRevisionInput,
  AddArticleRevisionInput,
  AddCoursePageRevisionInput,
  AddCourseRevisionInput,
  AddEventRevisionInput,
  AddExerciseGroupRevisionInput,
  AddGenericRevisionInput,
  AddVideoRevisionInput,
  CheckoutRevisionInput,
  RejectRevisionInput,
} from '@serlo/api'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import {
  AppletSerializedState,
  ArticleSerializedState,
  CoursePageSerializedState,
  EventSerializedState,
  TextSolutionSerializedState,
  VideoSerializedState,
} from '@/edtr-io/editor-response-to-state'

export type RevisionMutationMode = 'checkout' | 'reject'

const rejectEntityMutation = gql`
  mutation rejectRevision($input: RejectRevisionInput!) {
    entity {
      rejectRevision(input: $input) {
        success
      }
    }
  }
`
const checkoutEntityMutation = gql`
  mutation checkoutRevision($input: CheckoutRevisionInput!) {
    entity {
      checkoutRevision(input: $input) {
        success
      }
    }
  }
`
const checkoutPageMutation = gql`
  mutation checkoutPageRevision($input: CheckoutRevisionInput!) {
    page {
      checkoutRevision(input: $input) {
        success
      }
    }
  }
`

export function useRevisionDecideMutation() {
  const auth = useAuthentication()
  const router = useRouter()
  const loggedInData = useLoggedInData()

  const revisionMutation = async function (
    mode: RevisionMutationMode,
    input: RejectRevisionInput,
    isPage: boolean
  ) {
    const isCheckout = mode === 'checkout'
    const mutation = isPage
      ? checkoutPageMutation
      : isCheckout
      ? checkoutEntityMutation
      : rejectEntityMutation
    NProgress.start()
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      setTimeout(() => {
        if (!loggedInData) return
        showToastNotice(
          loggedInData.strings.mutations.success[
            isCheckout ? 'accept' : 'reject'
          ],
          'success'
        )
        NProgress.done()
        void router.push(
          sessionStorage.getItem('previousPathname') || '/entity/unrevised'
        )
      }, 100)
    }
    return success
  }
  return async (
    mode: RevisionMutationMode,
    input: RejectRevisionInput | CheckoutRevisionInput,
    isPage: boolean
  ) => await revisionMutation(mode, input, isPage)
}

const addAppletRevisionMutation = gql`
  mutation addAppletRevision($input: AddAppletRevisionInput!) {
    entity {
      addAppletRevision(input: $input) {
        success
      }
    }
  }
`
const addArticleRevisionMutation = gql`
  mutation addArticleRevision($input: AddArticleRevisionInput!) {
    entity {
      addArticleRevision(input: $input) {
        success
      }
    }
  }
`
const addCourseRevisionMutation = gql`
  mutation addCourseRevision($input: AddCourseRevisionInput!) {
    entity {
      addCourseRevision(input: $input) {
        success
      }
    }
  }
`
const addCoursePageRevisionMutation = gql`
  mutation addCoursePageRevision($input: AddCoursePageRevisionInput!) {
    entity {
      addCoursePageRevision(input: $input) {
        success
      }
    }
  }
`
const addEventRevisionMutation = gql`
  mutation addEventRevision($input: AddEventRevisionInput!) {
    entity {
      addEventRevision(input: $input) {
        success
      }
    }
  }
`
const addExerciseRevisionMutation = gql`
  mutation addExerciseRevision($input: AddGenericRevisionInput!) {
    entity {
      addExerciseRevision(input: $input) {
        success
      }
    }
  }
`
const addExerciseGroupRevisionMutation = gql`
  mutation addExerciseGroupRevision($input: AddExerciseGroupRevisionInput!) {
    entity {
      addExerciseGroupRevision(input: $input) {
        success
      }
    }
  }
`
const addGroupedExerciseRevisionMutation = gql`
  mutation addGroupedExerciseRevision($input: AddGenericRevisionInput!) {
    entity {
      addGroupedExerciseRevision(input: $input) {
        success
      }
    }
  }
`
const addSolutionRevisionMutation = gql`
  mutation addSolutionRevision($input: AddGenericRevisionInput!) {
    entity {
      addSolutionRevision(input: $input) {
        success
      }
    }
  }
`
const addVideoRevisionMutation = gql`
  mutation addVideoRevision($input: AddVideoRevisionInput!) {
    entity {
      addVideoRevision(input: $input) {
        success
      }
    }
  }
`

function getAddMutation(type: SupportedTypesSerializedState['__typename']) {
  return {
    Applet: addAppletRevisionMutation,
    Article: addArticleRevisionMutation,
    Course: addCourseRevisionMutation,
    CoursePage: addCoursePageRevisionMutation,
    Event: addEventRevisionMutation,
    Exercise: addExerciseRevisionMutation,
    ExerciseGroup: addExerciseGroupRevisionMutation,
    GroupedExercise: addGroupedExerciseRevisionMutation,
    Solution: addSolutionRevisionMutation,
    Video: addVideoRevisionMutation,
  }[type!]
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
  data: RevisionAddMutationData,
  needsReview: boolean
): AddGenericRevisionInput {
  return {
    changes: getRequiredString(loggedInData, 'changes', data.changes),
    content: getRequiredString(loggedInData, 'content', data.content),
    entityId: data.id,
    needsReview: needsReview,
    subscribeThis: data.controls.subscription?.subscribe === 1 ? true : false, //simplify when old code is unused
    subscribeThisByEmail:
      data.controls.subscription?.mailman === 1 ? true : false, //simplify when old code is unused
  }
}

function getAdditionalInputData(
  loggedInData: LoggedInData,
  data: RevisionAddMutationData
) {
  switch (data.__typename) {
    case 'Applet':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.url),
        metaTitle: data['meta_title'] ?? 'x',
        metaDescription: data['meta_description'] ?? 'x',
      }
    case 'Article':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'] ?? 'x', //TODO: wait for api deploy
        metaDescription: data['meta_description'] ?? 'x',
      }
    // case 'Course':
    //   return {
    //     title: getRequiredString(loggedInData, 'title', data.title),
    //     metaDescription: data['meta_description'],
    //   }
    case 'CoursePage':
      return { title: getRequiredString(loggedInData, 'title', data.title) }
    case 'Event':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data['meta_title'],
        metaDescription: data['meta_description'],
      }
    // case 'Exercise':
    //   // TODO: text-solution is ignored atm. api needs to expect it?
    //   return { cohesive: data.cohesive }
    // case 'ExerciseGroup':
    //   return { cohesive: data.cohesive }
    case 'Video':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.content), // url is stored in content for some reason
        content: getRequiredString(loggedInData, 'content', data.description),
      }
  }
  return {}
}

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

export type SupportedTypesSerializedState =
  | AppletSerializedState
  | ArticleSerializedState
  //| CourseSerializedState
  | CoursePageSerializedState
  | EventSerializedState
  // | TextExerciseSerializedState
  // | TextExerciseGroupSerializedState
  | TextSolutionSerializedState
  | VideoSerializedState

export type RevisionAddMutationData = SupportedTypesSerializedState & OnSaveData

export function useRevisionAddMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const addRevisionMutation = async function (
    data: RevisionAddMutationData,
    needsReview: boolean
  ) {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    try {
      console.log('data')
      console.log(data)
      if (!data.__typename) return

      const genericInput = getGenericInputData(loggedInData, data, needsReview)
      const additionalInput = getAdditionalInputData(loggedInData, data)
      const input = { ...genericInput, ...additionalInput }

      console.log(input)

      const success = await mutationFetch(
        auth,
        getAddMutation(data.__typename),
        input,
        loggedInData?.strings.mutations.errors
      )

      if (success) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        window.location.href = `/entity/repository/history/${data.id}`
      }
      return success
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('probably missing value?')
      return false
    }
  }

  return async (data: RevisionAddMutationData, needsReview: boolean) =>
    await addRevisionMutation(data, needsReview)
}

export type AddRevisionInputTypes =
  | AddGenericRevisionInput
  | AddAppletRevisionInput
  | AddArticleRevisionInput
  | AddCourseRevisionInput
  | AddCoursePageRevisionInput
  | AddEventRevisionInput
  | AddExerciseGroupRevisionInput
  | AddVideoRevisionInput
