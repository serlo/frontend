import { Icon } from '@edtr-io/ui'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { ArticleProps } from '.'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface ArticleRelatedMagicInputProps {
  relatedContent: ArticleProps['state']['relatedContent']
}

export function ArticleRelatedMagicInput({
  relatedContent,
}: ArticleRelatedMagicInputProps) {
  const [maybeUuid, setMaybeUuid] = useState<null | false | number>(null)
  const { data, error } = useSimpleUuidFetch(maybeUuid)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  return (
    <div className="flex">
      <input
        className="serlo-input-font-reset outline-none rounded-xl bg-brand-100 p-2 my-2"
        placeholder={articleStrings.placeholder}
        onChange={(event) => {
          const numbers = event.target.value.match(/[1-9]?[0-9]+/)
          const input = numbers ? parseInt(numbers[0]) : false
          event.target.value = input ? input.toString() : ''
          setMaybeUuid(input)
        }}
      />
      <p className="ml-4 mt-4">{renderFeedback()}</p>
    </div>
  )

  function renderFeedback() {
    if (maybeUuid === null) return null
    if (maybeUuid === false) return articleStrings.invalidInput
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return articleStrings.fetchError
    }
    if (!data) return articleStrings.loading

    const { uuid } = data
    if (!uuid) return articleStrings.notFound

    const [id, title, __typename] =
      uuid.__typename === 'CoursePage'
        ? [
            uuid.course?.id,
            uuid.course?.currentRevision?.title,
            uuid.__typename,
          ]
        : [uuid.id, uuid.currentRevision?.title, uuid.__typename]

    if (!['Article', 'Course', 'CoursePage', 'Video'].includes(uuid.__typename))
      return articleStrings.unsupportedType.replace('%type%', uuid.__typename)

    if (!id || !title) return articleStrings.notFound

    return (
      <>
        <a href={`/${id}`} target="_blank" rel="noreferrer">
          <Icon icon={getIconByTypename(__typename)} /> {title}
        </a>
        <button
          className="serlo-button serlo-make-interactive-primary ml-3"
          onClick={() => {
            const category =
              uuid.__typename === 'Article'
                ? 'articles'
                : uuid.__typename === 'Video'
                ? 'videos'
                : 'courses'

            const duplicate = relatedContent[category].some(
              (field) => field.id.value === id.toString()
            )
            if (duplicate) return

            relatedContent[category].insert(relatedContent[category].length, {
              id: id.toString(),
              title,
            })
          }}
        >
          {articleStrings.addLabel}
        </button>
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
