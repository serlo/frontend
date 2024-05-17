import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  AnyEditorDocument,
  EditorExerciseGroupDocument,
  EditorInjectionDocument,
} from '@editor/types/editor-plugins'
import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { InfoPanel } from '@/components/info-panel'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import { triggerSentry } from '@/helper/trigger-sentry'

export function InjectionSerloStaticRenderer({
  state: href,
}: EditorInjectionDocument) {
  const [content, setContent] = useState<
    AnyEditorDocument[] | 'loading' | 'error'
  >('loading')
  const { strings } = useInstanceData()
  const [base, hash] = href.split('#')

  const cleanedHref = base.startsWith('/') ? base : `/${base}`

  useEffect(() => {
    if (!cleanedHref) return

    try {
      void fetch(endpoint, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',

        body: JSON.stringify({
          query,
          variables: { path: cleanedHref },
        }),
      })
        .then((res) => res.json())
        .then((data: { data: InjectionOnlyContentQuery }) => {
          if (!data.data?.uuid) throw new Error('not found')
          const uuid = data.data.uuid
          if (
            uuid.__typename === 'Article' ||
            uuid.__typename === 'TaxonomyTerm'
          ) {
            if (!uuid.alias) setContent([])
            setContent([createFallbackBox(uuid.alias, uuid.title)])
            return
          }

          if (
            !Object.hasOwn(uuid, 'currentRevision') ||
            !uuid.currentRevision
          ) {
            throw new Error('no accepted revision')
          }

          if (uuid.__typename === 'Exercise') {
            const serloContext = {
              licenseId: uuid.licenseId,
              uuid: uuid.id,
            }
            setContent([
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
                setContent([exercise])
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
            setContent([contentWithLicenseId])
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
            setContent([state])
            return
          }

          if (uuid.__typename === 'Applet') {
            setContent([
              {
                plugin: EditorPluginType.Geogebra,
                state: uuid.currentRevision.url,
              },
              parseDocumentString(uuid.currentRevision.content),
            ])
            return
          }

          if (uuid.__typename === 'Event') {
            setContent([parseDocumentString(uuid.currentRevision.content)])
            return
          }

          throw new Error('unknown entity type')
        })
        .catch((e) => {
          triggerSentry({ message: String(e), data: { cleanedHref } })
          setContent('error')
        })
    } catch (e) {
      triggerSentry({ message: String(e), data: { cleanedHref } })
      setContent('error')
    }
  }, [cleanedHref, hash])

  if (!href) return null
  if (!cleanedHref) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error') {
    return (
      <InfoPanel>
        {strings.errors.defaultMessage}{' '}
        <small className="float-right mt-0.5">
          <a
            className="serlo-link"
            href={`${cleanedHref}${hash ? `#${hash}` : ''}`}
          >
            Link
          </a>
        </small>
      </InfoPanel>
    )
  }

  return (
    <div className="border-b-3 border-brand-200 py-4 text-gray-900">
      <StaticRenderer document={content} />
    </div>
  )
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
