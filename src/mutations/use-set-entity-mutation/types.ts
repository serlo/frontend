import { LoggedInData } from '@/data-types'
import {
  AppletSerializedState,
  ArticleSerializedState,
  CoursePageSerializedState,
  CourseSerializedState,
  EventSerializedState,
  PageSerializedState,
  TaxonomySerializedState,
  TextExerciseGroupSerializedState,
  TextExerciseSerializedState,
  TextSolutionSerializedState,
  VideoSerializedState,
} from '@/edtr-io/editor-response-to-state'
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
  mutationFetch: (
    query: string,
    input: unknown,
    isRetry?: boolean
  ) => Promise<boolean | number>
  data: SetEntityMutationData
  needsReview: boolean
  loggedInData: LoggedInData | null
  isRecursiveCall?: boolean
  initialState: {
    plugin: 'text'
    state: unknown
  }
  savedParentId?: number
  taxonomyParentId?: number
}

export type ChildFieldsData =
  | CoursePageSerializedState
  | TextSolutionSerializedState
  | TextExerciseGroupSerializedState
  | TextExerciseSerializedState
  | TextGroupedExerciseSerilizedState
