import { TaxonomyTypeCreateOptions } from '@serlo/api'
import { gql } from 'graphql-request'

import { showToastNotice } from '../show-toast-notice'
import { mutationFetch } from './helper'
import { TaxonomyCreateOrUpdateMutationData } from './use-set-entity-mutation/types'
import { getRequiredString } from './use-set-entity-mutation/use-set-entity-mutation'
import { useAuthentication } from '@/auth/use-authentication'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function useTaxonomyCreateOrUpdateMutation() {
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()

  return async (data: TaxonomyCreateOrUpdateMutationData) => {
    if (!auth || !loggedInData) {
      showToastNotice('Please make sure you are logged in!', 'warning')
      return false
    }
    if (!data.__typename || data.__typename !== 'TaxonomyTerm') return false

    try {
      const input = {
        id: data.id,
        name: getRequiredString(loggedInData, 'name', data.term.name),
        description: getRequiredString(
          loggedInData,
          'description',
          data.description
        ),
      }

      //only for create
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_a, _b, c_, _d, typeNumberString, parentIdString] =
        window.location.pathname.split('/') // taxonomy/term/create/4/1390

      // console.log('parent')
      // console.log(parseInt(parentIdString))

      // console.log('getTaxonomyType')
      // console.log(getTaxonomyType(typeNumberString))

      const success = data.id
        ? await mutationFetch(
            auth,
            taxonomySetMutation,
            input,
            loggedInData?.strings.mutations.errors
          )
        : await mutationFetch(
            auth,
            taxonomyCreateMutation,
            {
              ...input,
              parentId: parseInt(parentIdString),
              taxonomyType: getTaxonomyType(typeNumberString),
            },
            loggedInData?.strings.mutations.errors
          )

      if (success) {
        showToastNotice(loggedInData.strings.mutations.success.save, 'success')
        //window.location.href = `/${data.id}` // TODO: if id is undef
        return true
      }
      return false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('probably missing value?')
      return false
    }
  }
}

function getTaxonomyType(idString?: string) {
  if (!idString || !parseInt(idString))
    throw 'invalid url -> unknown taxonomy type'

  const id = parseInt(idString)

  const topicIds = [4, 16, 33, 42, 48, 53]
  const topicFolderIds = [9, 19, 36, 45, 51, 56]

  if (topicIds.includes(id)) return TaxonomyTypeCreateOptions.Topic
  if (topicFolderIds.includes(id)) return TaxonomyTypeCreateOptions.TopicFolder

  throw 'unknown taxonomy type'
}

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
