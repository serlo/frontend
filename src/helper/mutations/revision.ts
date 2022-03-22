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
import { OnSaveBaseData } from '@/edtr-io/serlo-editor'
import { UnrevisedEntityData } from '@/fetcher/query-types'

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

function getAddMutation(type: UnrevisedEntityData['__typename']) {
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
  data: OnSaveBaseData,
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
  data: OnSaveBaseData,
  type: UnrevisedEntityData['__typename']
) {
  switch (type) {
    case 'Applet':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.url),
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      }
    case 'Article':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data.metaTitle ?? 'x', //TODO: wait for api deploy
        metaDescription: data.metaDescription ?? 'x',
      }
    case 'Course':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaDescription: data.metaDescription,
      }
    case 'CoursePage':
      return { title: getRequiredString(loggedInData, 'title', data.title) }
    case 'Event':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      }
    case 'Exercise':
      return { cohesive: data.cohesive }
    case 'ExerciseGroup':
      return { cohesive: data.cohesive }
    case 'Video':
      return {
        title: getRequiredString(loggedInData, 'title', data.title),
        url: getRequiredString(loggedInData, 'url', data.url),
      }
  }
  return {}
}

export function useRevisionAddMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const addRevisionMutation = async function (
    type: UnrevisedEntityData['__typename'],
    data: OnSaveBaseData,
    needsReview: boolean
  ) {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    try {
      const genericInput = getGenericInputData(loggedInData, data, needsReview)
      const additionalInput = getAdditionalInputData(loggedInData, data, type)
      const input = { ...genericInput, ...additionalInput }

      const success = await mutationFetch(
        auth,
        getAddMutation(type),
        input,
        loggedInData?.strings.mutations.errors
      )

      if (success) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        window.location.href = `/entity/repository/history/${data.id}`
      }
      return success
    } catch (error) {
      console.log('probably missing value')
      return false
    }
  }

  return async (
    type: UnrevisedEntityData['__typename'],
    data: OnSaveBaseData,
    needsReview: boolean
  ) => await addRevisionMutation(type, data, needsReview)
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
