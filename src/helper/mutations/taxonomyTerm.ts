import { TaxonomyEntityLinksInput, TaxonomyTermSortInput } from '@serlo/api'
import { gql } from 'graphql-request'

import { mutationFetch } from './helper'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useCreateEntityLinkMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation taxonomyTermCreateEntityLink($input: TaxonomyEntityLinksInput!) {
      taxonomyTerm {
        createEntityLinks(input: $input) {
          success
        }
      }
    }
  `
  const taxonomyTermCreateEntityLink = async function (
    input: TaxonomyEntityLinksInput
  ) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )
    return success
  }

  return async (input: TaxonomyEntityLinksInput) =>
    await taxonomyTermCreateEntityLink(input)
}

export function useDeleteEntityLinkMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation taxonomyTermDeleteEntityLink($input: TaxonomyEntityLinksInput!) {
      taxonomyTerm {
        deleteEntityLinks(input: $input) {
          success
        }
      }
    }
  `
  const taxonomyTermDeleteEntityLink = async function (
    input: TaxonomyEntityLinksInput
  ) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )
    return success
  }

  return async (input: TaxonomyEntityLinksInput) =>
    await taxonomyTermDeleteEntityLink(input)
}

export function useEntitySortMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  const mutation = gql`
    mutation taxonomyTermSort($input: TaxonomyTermSortInput!) {
      taxonomyTerm {
        sort(input: $input) {
          success
        }
      }
    }
  `
  const taxonomyTermSort = async function (input: TaxonomyTermSortInput) {
    const success = await mutationFetch(
      auth,
      mutation,
      input,
      loggedInData?.strings.mutations.errors
    )
    return success
  }

  return async (input: TaxonomyTermSortInput) => await taxonomyTermSort(input)
}
