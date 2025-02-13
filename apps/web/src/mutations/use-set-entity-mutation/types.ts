import type {
  AbstractSerializedState,
  TaxonomySerializedState,
} from '@/serlo-editor-integration/convert-editor-response-to-state'

export type SetEntityMutationData = AbstractSerializedState & {
  changes?: string
}

export type TaxonomyCreateOrUpdateMutationData = Pick<
  TaxonomySerializedState,
  'term' | 'description'
> & {
  __typename?: 'TaxonomyTerm'
  parent?: number
}

export interface SetEntityMutationRunnerData {
  data: SetEntityMutationData
  savedParentId?: number
  taxonomyParentId?: number
}
