import { EditorPluginType } from '@editor/package'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorExerciseGroupDocument } from '@editor/types/editor-plugins'
import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

import { endpoint } from '@/api/endpoint'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'

/**
 * Allows frontend (and later other) instances to get content of injected entity
 * needs cors to work in other instances
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = decodeURIComponent(String(req.query.path))
  const hash = decodeURIComponent(String(req.query.hash))
  if (!path) {
    return res.status(401).send('no path provided')
  }

  try {
    void fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',

      body: JSON.stringify({
        query,
        variables: { path },
      }),
    })
      .then((res) => res.json())
      .then((data: { data: InjectionOnlyContentQuery }) => {
        if (!data.data?.uuid) {
          return res.status(404).send('not found')
        }

        const uuid = data.data.uuid
        if (
          uuid.__typename === 'Article' ||
          uuid.__typename === 'Course' ||
          uuid.__typename === 'TaxonomyTerm'
        ) {
          if (!uuid.alias) {
            return res.status(404).send('something is wrong with the content')
          }
          respondWithContent([createFallbackBox(uuid.alias, uuid.title)])
          return
        }

        if (!Object.hasOwn(uuid, 'currentRevision') || !uuid.currentRevision) {
          return res.status(404).send('no current revision')
        }

        if (uuid.__typename === 'Exercise') {
          const serloContext = {
            licenseId: uuid.licenseId,
            uuid: uuid.id,
          }
          respondWithContent([
            { ...JSON.parse(uuid.currentRevision.content), serloContext },
          ])
          return
        }

        if (uuid.__typename === 'ExerciseGroup') {
          const content = parseDocumentString(
            uuid.currentRevision.content
          ) as EditorExerciseGroupDocument

          // use id in hash to load one exercise out of the group
          if (hash) {
            const exercise = content.state.exercises.find((exercise) =>
              exercise.id?.startsWith(hash)
            )
            if (exercise) {
              respondWithContent([exercise])
              return
            }
          }
          const contentWithLicenseId = {
            ...content,
            state: {
              ...content.state,
              serloContext: { licenseId: uuid.licenseId },
            },
          }
          respondWithContent([contentWithLicenseId])
          return
        }

        if (uuid.__typename === 'Video') {
          const state = {
            plugin: EditorPluginType.Video,
            state: {
              src: uuid.currentRevision.url,
              alt: uuid.title ?? 'video',
            },
          }
          respondWithContent([state])
          return
        }

        if (uuid.__typename === 'Applet') {
          respondWithContent([
            {
              plugin: EditorPluginType.Geogebra,
              state: uuid.currentRevision.url,
            },
            parseDocumentString(uuid.currentRevision.content),
          ])
          return
        }

        if (uuid.__typename === 'Event') {
          respondWithContent([
            parseDocumentString(uuid.currentRevision.content),
          ])
          return
        }
        return res.status(422).send('unknown entity type')
      })
      .catch((e) => {
        return res.status(500).send(`${String(e)} at ${path}`)
      })
  } catch (e) {
    return res.status(500).send(`${String(e)} at ${path}`)
  }

  function respondWithContent(content: any) {
    const twoDaysInSeconds = 172800
    res.setHeader('Cache-Control', `maxage=${twoDaysInSeconds}`)
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

function createFallbackBox(alias: string, title: string) {
  return {
    plugin: EditorPluginType.Rows,
    state: [
      {
        plugin: EditorPluginType.Box,
        state: {
          type: 'blank',
          title: { plugin: EditorPluginType.Text },
          anchorId: '',
          content: {
            plugin: EditorPluginType.Rows,
            state: [
              {
                plugin: EditorPluginType.Text,
                state: [
                  {
                    type: 'p',
                    children: [
                      {
                        type: 'a',
                        href: alias,
                        children: [{ text: title, strong: true }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  }
}
