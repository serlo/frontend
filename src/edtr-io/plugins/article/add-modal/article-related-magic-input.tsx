import { Icon } from '@edtr-io/ui'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface ArticleRelatedMagicInputProps {
  addEntry: (id: number, typename: string, title?: string) => void
}

export function ArticleRelatedMagicInput({
  addEntry,
}: ArticleRelatedMagicInputProps) {
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
      <div className="text-base italic inline-block ml-3">
        {renderFeedback()}
      </div>
    </div>
  )

  function renderFeedback() {
    if (maybeUuid === null) return null
    if (maybeUuid === false) return modalStrings.invalidInput
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return modalStrings.fetchError
    }
    if (!data) return modalStrings.loading

    const { uuid } = data
    if (!uuid) return modalStrings.notFound

    const [id, title, __typename] =
      uuid.__typename === 'CoursePage'
        ? [
            uuid.course?.id,
            uuid.course?.currentRevision?.title,
            uuid.__typename,
          ]
        : uuid.__typename === 'TaxonomyTerm'
        ? [uuid.id, uuid.name, uuid.__typename]
        : uuid.__typename.includes('Exercise')
        ? [
            uuid.id,
            getTranslatedType(strings, uuid.__typename),
            uuid.__typename,
          ]
        : [uuid.id, uuid.currentRevision?.title, uuid.__typename]

    if (
      ![
        'Article',
        'Course',
        'CoursePage',
        'Video',
        'Exercise',
        'ExerciseGroup',
        'GroupedExercise',
        'TaxonomyTerm',
      ].includes(uuid.__typename)
    )
      return modalStrings.unsupportedType.replace('%type%', uuid.__typename)

    if (hasOwnPropertyTs(uuid, 'type') && uuid.type !== 'topicFolder')
      return modalStrings.unsupportedType.replace('%type%', uuid.type ?? '')

    if (!id) return modalStrings.notFound
    if (!uuid.__typename.includes('Exercise') && !title)
      return modalStrings.notFound

    return (
      <>
        <a
          className="mr-3 not-italic font-bold text-brand"
          href={`/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={getIconByTypename(__typename)} /> {title}
        </a>
        <SerloAddButton
          text=""
          onClick={() => {
            addEntry(id, uuid.__typename, title)
            setTimeout(() => {
              setMaybeUuid(null)
            }, 200)
          }}
        />
      </>
    )
  }
}

const uuidSimpleQuery = gql`
  query uuidSimpleQuery($id: Int!) {
    uuid(id: $id) {
      id
      __typename
      ... on Article {
        currentRevision {
          title
        }
      }
      ... on Course {
        currentRevision {
          title
        }
      }
      ... on CoursePage {
        course {
          id
          currentRevision {
            title
          }
        }
      }
      ... on Video {
        currentRevision {
          title
        }
      }
      ... on TaxonomyTerm {
        name
        type
      }
    }
  }
`

function useSimpleUuidFetch(maybeUuid: null | false | number) {
  return useGraphqlSwr<{
    uuid: {
      id: number
      __typename: string
      currentRevision?: { title?: string }
      course?: { id: number; currentRevision?: { title?: string } }
      name?: string
      type?: string
    }
  }>({
    noKey: maybeUuid === false,
    query: uuidSimpleQuery,
    variables: { id: maybeUuid },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}
