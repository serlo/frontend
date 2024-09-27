import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType, UuidWithRevType } from '@/data-types'
import {
  TaxonomyTermType,
  UuidSimpleQuery,
} from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface UuidUrlInputProps {
  supportedEntityTypes: UuidWithRevType[]
  supportedTaxonomyTypes: TaxonomyTermType[]
  renderButtons: (
    typename: UuidWithRevType,
    id: number,
    title: string,
    taxType?: TaxonomyTermType
  ) => JSX.Element
  unsupportedIds?: number[]
  inlineFeedback?: boolean
}

export function UuidUrlInput({
  supportedEntityTypes,
  supportedTaxonomyTypes,
  renderButtons,
  unsupportedIds,
  inlineFeedback,
}: UuidUrlInputProps) {
  const [maybeUuid, setMaybeUuid] = useState<null | false | number>(null)
  const { data, error } = useSimpleUuidFetch(maybeUuid)

  const { strings } = useInstanceData()
  const modalStrings = useEditStrings().templatePlugins.article.addModal

  return (
    <div className="my-4 border-t-2 pt-5">
      <input
        className="serlo-input-font-reset w-72 rounded-xl bg-editor-primary-200 p-2 font-bold placeholder-almost-black outline-none placeholder:font-normal focus:bg-editor-primary"
        placeholder={modalStrings.placeholder}
        onChange={(event) => {
          if (event.target.value.length === 0) {
            setMaybeUuid(null)
            return
          }
          const numbers = event.target.value.match(/[1-9]?[0-9]+/)
          const input = numbers ? parseInt(numbers[0]) : false
          event.target.value = input ? input.toString() : ''
          setMaybeUuid(input)
        }}
      />
      <div
        className={cn(
          'text-base italic',
          inlineFeedback ? 'ml-3 inline-block' : 'mt-5'
        )}
      >
        {renderFeedback()}
      </div>
    </div>
  )

  function renderFeedback() {
    if (maybeUuid === null) return null
    if (maybeUuid === false) return modalStrings.invalidInput
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return modalStrings.fetchError
    }
    if (!data) return modalStrings.loading

    const { uuid } = data
    if (!uuid) return modalStrings.notFound

    const { __typename: typename, id } = uuid

    const title = typename.includes(UuidType.Exercise)
      ? getTranslatedType(strings, typename)
      : uuid.title

    const taxonomyType =
      Object.hasOwn(uuid, 'type') && uuid.type ? uuid.type : undefined

    if (!supportedEntityTypes.includes(typename as UuidWithRevType))
      return modalStrings.unsupportedType.replace('%type%', typename)

    if (taxonomyType && !supportedTaxonomyTypes.includes(taxonomyType))
      return modalStrings.unsupportedType.replace('%type%', taxonomyType ?? '')

    if (unsupportedIds && unsupportedIds.includes(id))
      return modalStrings.unsupportedId

    if (!id) return modalStrings.notFound

    if (!typename.includes(UuidType.Exercise) && !title)
      return modalStrings.notFound

    return (
      <>
        <a
          className="mr-3 font-bold not-italic text-brand"
          href={`/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaIcon icon={getIconByTypename(typename as UuidType)} /> {title}
        </a>
        {renderButtons(
          typename as UuidWithRevType,
          id,
          title ?? getTranslatedType(strings, typename),
          taxonomyType
        )}
      </>
    )
  }
}

const uuidSimpleQuery = gql`
  query uuidSimple($id: Int!) {
    uuid(id: $id) {
      id
      __typename
      title
      ... on TaxonomyTerm {
        type
      }
    }
  }
`

function useSimpleUuidFetch(maybeUuid: null | false | number) {
  return useGraphqlSwr<UuidSimpleQuery>({
    noKey: !maybeUuid,
    query: uuidSimpleQuery,
    variables: { id: maybeUuid },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}
