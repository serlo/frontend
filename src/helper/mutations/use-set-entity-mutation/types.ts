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
import { RefObject } from 'react'

import { AuthenticationPayload } from '@/auth/auth-provider'
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

type TextGroupedExerciseSerilizedState = Omit<
  TextExerciseSerializedState,
  '__typename'
> & {
  __typename: 'GroupedExercise'
}

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
  | TextGroupedExerciseSerilizedState

export type SetEntityMutationData = SupportedTypesSerializedState & OnSaveData

export interface SetEntityMutationRunnerData {
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

export type ChildFieldsData =
  | CoursePageSerializedState
  | TextSolutionSerializedState
  | TextExerciseGroupSerializedState
  | TextExerciseSerializedState
  | TextGroupedExerciseSerilizedState
