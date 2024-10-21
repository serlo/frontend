import type {
  AbstractSerializedState,
  TaxonomySerializedState,
} from '@/serlo-editor-integration/convert-editor-response-to-state'

export interface OnSaveData {
  // this entity needs no Review or user choose to skip review
  noReview: boolean
}

export type SupportedTypesSerializedState = AbstractSerializedState

export type SetEntityMutationData = SupportedTypesSerializedState & OnSaveData

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
