import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'
import { Icon } from 'test-edtr-io/ui'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType, UuidWithRevType } from '@/data-types'
import {
  TaxonomyTermType,
  UuidSimpleQuery,
} from '@/fetcher/graphql-types/operations'
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
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const modalStrings = loggedInData.strings.editor.article.addModal

  return (
    <div className="my-4 pt-5 border-t-2">
      <input
        className="serlo-input-font-reset outline-none rounded-xl bg-amber-200 p-2 focus:bg-amber-300 w-72"
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
        className={clsx(
          'text-base italic',
          inlineFeedback ? 'inline-block ml-3' : 'mt-5'
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

    const title = uuid.__typename.includes(UuidType.Exercise)
      ? getTranslatedType(strings, uuid.__typename)
      : uuid.title

    const id =
      uuid.__typename === UuidType.CoursePage ? uuid.course?.id : uuid.id

    if (!supportedEntityTypes.includes(uuid.__typename as UuidWithRevType))
      return modalStrings.unsupportedType.replace('%type%', uuid.__typename)

    if (
      Object.hasOwn(uuid, 'type') &&
      uuid.type &&
      !supportedTaxonomyTypes.includes(uuid.type)
    )
      return modalStrings.unsupportedType.replace('%type%', uuid.type ?? '')

    if (unsupportedIds && unsupportedIds.includes(uuid.id))
      return modalStrings.unsupportedId

    if (!id) return modalStrings.notFound
    if (!uuid.__typename.includes(UuidType.Exercise) && !title)
      return modalStrings.notFound

    return (
      <>
        <a
          className="mr-3 not-italic font-bold text-brand"
          href={`/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={getIconByTypename(uuid.__typename as UuidType)} /> {title}
        </a>
        {renderButtons(
          uuid.__typename as UuidWithRevType,
          id,
          title ?? getTranslatedType(strings, uuid.__typename),
          Object.hasOwn(uuid, 'type') ? uuid.type : undefined
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
      ... on CoursePage {
        course {
          id
        }
      }
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
