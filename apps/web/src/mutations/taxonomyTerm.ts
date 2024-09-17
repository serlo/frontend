import { gql } from 'graphql-request'

import { useMutationFetchAuthed } from './helper/use-mutation-fetch'
import {
  TaxonomyEntityLinksInput,
  TaxonomyTermSortInput,
} from '@/fetcher/graphql-types/operations'

const createEntityLinkMutation = gql`
  mutation taxonomyTermCreateEntityLink($input: TaxonomyEntityLinksInput!) {
    taxonomyTerm {
      createEntityLinks(input: $input) {
        success
      }
    }
  }
`

export function useCreateEntityLinkMutation() {
  const mutationFetch = useMutationFetchAuthed()

  return async function (input: TaxonomyEntityLinksInput) {
    return await mutationFetch(createEntityLinkMutation, input)
  }
}

const deleteEntityLink = gql`
  mutation taxonomyTermDeleteEntityLink($input: TaxonomyEntityLinksInput!) {
    taxonomyTerm {
      deleteEntityLinks(input: $input) {
        success
      }
    }
  }
`

export function useDeleteEntityLinkMutation() {
  const mutationFetch = useMutationFetchAuthed()

  return async function (input: TaxonomyEntityLinksInput) {
    const success = await mutationFetch(deleteEntityLink, input)
    return success
  }
}

const sortMutation = gql`
  mutation taxonomyTermSort($input: TaxonomyTermSortInput!) {
    taxonomyTerm {
      sort(input: $input) {
        success
      }
    }
  }
`

export function useTaxonomyTermSortMutation() {
  const mutationFetch = useMutationFetchAuthed()

  return async function (input: TaxonomyTermSortInput) {
    const success = await mutationFetch(sortMutation, input)
    return success
  }
}
