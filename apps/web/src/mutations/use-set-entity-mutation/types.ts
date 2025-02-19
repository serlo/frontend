import type { SerializedAbstractTemplatePluginDocument } from '@/serlo-editor-integration/convert-editor-response-to-state'

export type SetEntityMutationData = SerializedAbstractTemplatePluginDocument & {
  changes?: string
}

export interface TaxonomyCreateOrUpdateMutationData {
  __typename?: 'TaxonomyTerm'
  term: {
    name: string
  }
  description: string
  parent?: number
  content: string
}

export interface SetEntityMutationRunnerData {
  data: SetEntityMutationData
  savedParentId?: number
  taxonomyParentId?: number
}
