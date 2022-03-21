import { CheckoutRevisionInput, RejectRevisionInput } from '@serlo/api'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
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

export function useRevisionAddMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const addRevisionMutation = async function (
    type: UnrevisedEntityData['__typename'],
    input: AddRevisionInputTypes
  ) {
    const mutation =
      type === 'Applet'
        ? addAppletRevisionMutation
        : type === 'Article'
        ? addArticleRevisionMutation
        : type === 'Course'
        ? addCourseRevisionMutation
        : type === 'CoursePage'
        ? addCoursePageRevisionMutation
        : type === 'Event'
        ? addEventRevisionMutation
        : type === 'Exercise'
        ? addExerciseRevisionMutation
        : type === 'ExerciseGroup'
        ? addExerciseGroupRevisionMutation
        : type === 'GroupedExercise'
        ? addGroupedExerciseRevisionMutation
        : type === 'Solution'
        ? addSolutionRevisionMutation
        : type === 'Video'
        ? addVideoRevisionMutation
        : null

    if (!mutation) return false

    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )

    if (success) {
      if (!loggedInData) return
      showToastNotice(loggedInData.strings.mutations.success.save, 'success')
    }
    return success
  }

  return async (
    type: UnrevisedEntityData['__typename'],
    input: AddRevisionInputTypes
  ) => await addRevisionMutation(type, input)
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

// TODO: Replace when new version of api releases

export interface AddAppletRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  metaDescription: string
  metaTitle: string
  title: string
  url: string
}

export interface AddArticleRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  metaDescription: string
  metaTitle: string
  title: string
}

export interface AddCourseRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  metaDescription: string
  title: string
}

export interface AddCoursePageRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  title: string
}

export interface AddEventRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  metaDescription: string
  metaTitle: string
  title: string
}

export interface AddExerciseGroupRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  cohesive: boolean
  content: string
}

export interface AddGenericRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
}

export interface AddVideoRevisionInput {
  changes: string
  entityId: number
  needsReview: boolean
  subscribeThis: boolean
  subscribeThisByEmail: boolean
  content: string
  title: string
  url: string
}
