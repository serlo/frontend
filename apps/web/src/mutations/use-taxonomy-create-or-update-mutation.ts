import { gql } from 'graphql-request'
import { useRouter } from 'next/router'

import { useMutationFetch } from './helper/use-mutation-fetch'
import { useSuccessHandler } from './helper/use-success-handler'
import { TaxonomyCreateOrUpdateMutationData } from './use-set-entity-mutation/types'
import { getRequiredString } from './use-set-entity-mutation/use-set-entity-mutation'
import { showToastNotice } from '../helper/show-toast-notice'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { TaxonomyTypeCreateOptions } from '@/fetcher/graphql-types/operations'

const taxonomySetMutation = gql`
  mutation taxonomyTermSetNameAndDescription(
    $input: TaxonomyTermSetNameAndDescriptionInput!
  ) {
    taxonomyTerm {
      setNameAndDescription(input: $input) {
        success
      }
    }
  }
`

const taxonomyCreateMutation = gql`
  mutation taxonomyCreate($input: TaxonomyTermCreateInput!) {
    taxonomyTerm {
      create(input: $input) {
        success
      }
    }
  }
`

export function useTaxonomyCreateOrUpdateMutation() {
  const loggedInData = useLoggedInData()
  const mutationFetch = useMutationFetch()
  const successHandler = useSuccessHandler()
  const router = useRouter()

  return async (data: TaxonomyCreateOrUpdateMutationData) => {
    if (!loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    const mutationStrings = loggedInData.strings.mutations

    try {
      const input = {
        id: data.id,
        name: getRequiredString(mutationStrings, 'name', data.term.name),
        description: getRequiredString(
          mutationStrings,
          'description',
          data.description
        ),
      }

      // reafactor as soon as we don't rely on legacy any more…
      // only for create
      const [, , , , typeNumberString, parentIdString] =
        router.asPath.split('/') // e.g. taxonomy/term/create/4/1390

      const success = data.id
        ? await mutationFetch(taxonomySetMutation, input)
        : await mutationFetch(taxonomyCreateMutation, {
            ...input,
            parentId: parseInt(parentIdString),
            taxonomyType: getTaxonomyType(typeNumberString),
          })

      return successHandler({
        success,
        toastKey: 'save',
        redirectUrl: `/${data.id ?? parentIdString}`,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('probably missing value?')
      return false
    }
  }
}

function getTaxonomyType(idString?: string) {
  if (!idString || !parseInt(idString))
    throw 'invalid url -> unknown taxonomy type'

  const id = parseInt(idString)

  const topicIds = [4, 16, 33, 42, 48, 53]
  const exerciseFolderIds = [9, 19, 36, 45, 51, 56]

  if (topicIds.includes(id)) return TaxonomyTypeCreateOptions.Topic
  if (exerciseFolderIds.includes(id))
    return TaxonomyTypeCreateOptions.ExerciseFolder

  throw 'unknown taxonomy type'
}
