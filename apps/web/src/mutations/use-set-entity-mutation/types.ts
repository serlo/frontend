import type {
  AbstractSerializedState,
  TaxonomySerializedState,
} from '@/serlo-editor-integration/convert-editor-response-to-state'

export type SupportedTypesSerializedState = AbstractSerializedState

export type SetEntityMutationData = SupportedTypesSerializedState

export type TaxonomyCreateOrUpdateMutationData = Pick<
  TaxonomySerializedState,
  'id' | 'term' | 'description'
> & {
  __typename?: 'TaxonomyTerm'
  parent?: number
}

export interface SetEntityMutationRunnerData {
  data: SetEntityMutationData
  savedParentId?: number
  taxonomyParentId?: number
}
