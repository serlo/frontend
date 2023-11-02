import {
  SetAppletInput,
  SetGenericEntityInput,
  SetArticleInput,
  SetCourseInput,
  SetCoursePageInput,
  SetEventInput,
  SetExerciseGroupInput,
  SetVideoInput,
} from '@/fetcher/graphql-types/operations'
import type {
  AppletSerializedState,
  ArticleSerializedState,
  CoursePageSerializedState,
  CourseSerializedState,
  EventSerializedState,
  PageSerializedState,
  TaxonomySerializedState,
  TextExerciseGroupSerializedState,
  TextExerciseSerializedState,
  VideoSerializedState,
} from '@/serlo-editor-integration/convert-editor-response-to-state'

export interface OnSaveData {
  controls: {
    notificationSubscription?: boolean
    emailSubscription?: boolean
    noReview: boolean // this entity needs no Review or user choose to skip review
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
  | VideoSerializedState
  | TextGroupedExerciseSerilizedState

export type SetEntityMutationData = SupportedTypesSerializedState & OnSaveData
export type AddPageRevisionMutationData = PageSerializedState & {
  __typename?: 'Page'
}
export type TaxonomyCreateOrUpdateMutationData = Pick<
  TaxonomySerializedState,
  'id' | 'term' | 'description'
> & {
  __typename?: 'TaxonomyTerm'
  parent?: number
}

export interface SetEntityMutationRunnerData {
  data: SetEntityMutationData
  isRecursiveCall?: boolean
  savedParentId?: number
  taxonomyParentId?: number
}

export type ChildFieldsData =
  | CoursePageSerializedState
  | TextExerciseGroupSerializedState
  | TextExerciseSerializedState
  | TextGroupedExerciseSerilizedState
