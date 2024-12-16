import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import type {
  EditorArticleDocument,
  EditorExerciseDocument,
  EditorExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

import { endpoint } from '@/api/endpoint'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import { isProduction } from '@/helper/is-production'

/**
 * Allows frontend to copy Serlo content to the clipboard.
 * The content is unpacked for consistent pasting in the Editor.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const href = decodeURIComponent(String(req.query.href))

  const [base] = href.split('#')
  const path = base.startsWith('/') ? base : `/${base}`

  if (!path) {
    return res.status(401).json('no path provided')
  }

  try {
    void fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables: { path } }),
    })
      .then((res) => res.json())
      .then((data: { data: InjectionOnlyContentQuery }) => {
        if (!data.data?.uuid) {
          return res.status(404).json('not found')
        }

        const uuid = data.data.uuid

        if (!Object.hasOwn(uuid, 'currentRevision') || !uuid.currentRevision) {
          return res.status(404).json('no current revision')
        }

        if (uuid.__typename === 'Article') {
          const articleDocument = parseDocumentString(
            uuid.currentRevision.content
          ) as EditorArticleDocument
          const articleContent = articleDocument.state.content
          respondWithContent(articleContent)
          return
        }

        if (uuid.__typename === 'Exercise') {
          const exercise = parseDocumentString(
            uuid.currentRevision.content
          ) as EditorExerciseDocument
          respondWithContent({ plugin: 'rows', state: [exercise] })
          return
        }

        if (uuid.__typename === 'ExerciseGroup') {
          const exerciseGroup = parseDocumentString(
            uuid.currentRevision.content
          ) as EditorExerciseGroupDocument
          respondWithContent({ plugin: 'rows', state: [exerciseGroup] })
          return
        }

        return res.status(422).json('unknown entity type')
      })
      .catch((e) => {
        return res.status(500).json(`${String(e)} at ${path}`)
      })
  } catch (e) {
    return res.status(500).json(`${String(e)} at ${path}`)
  }

  function respondWithContent(content: any) {
    const twoDaysInSeconds = 172800
    res.setHeader('Cache-Control', `maxage=${twoDaysInSeconds}`)
    if (!isProduction) res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(content)
  }
}

const query = gql`
  query injectionOnlyContent($path: String!) {
    uuid(alias: { path: $path, instance: de }) {
      __typename
      alias
      title

      ... on AbstractEntity {
        id
        currentRevision {
          content
        }
        licenseId
      }

      ... on Video {
        currentRevision {
          url
        }
      }
      ... on Applet {
        currentRevision {
          url
        }
      }
    }
  }
`
