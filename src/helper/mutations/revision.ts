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

export function useRevisionAddMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const addRevisionMutation = async function (
    type: UnrevisedEntityData['__typename'],
    data: OnSaveBaseData,
    needsReview: boolean
  ) {
    //TODO: build failsaves (e.g. no empty content&title), improve types, remove legacy hacks

    const input = {
      changes: data.changes ?? 'x',
      entityId: data.id,
      needsReview: needsReview,
      subscribeThis: data.controls.subscription?.subscribe === 1 ? true : false, //can be simplified
      subscribeThisByEmail:
        data.controls.subscription?.mailman === 1 ? true : false,
      content: data.content ?? '', // error instead
      title: data.title ?? 'x', //error instead,
      metaDescription: data.metaDescription ?? 'placeholder', //this will be optional in the next api version
      metaTitle: data.metaTitle ?? 'placeholder', //this will be optional in the next api version
    }

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
