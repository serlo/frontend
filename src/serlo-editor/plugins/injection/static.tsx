import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { InfoPanel } from '@/components/info-panel'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import { triggerSentry } from '@/helper/trigger-sentry'
import { parseDocumentString } from '@/serlo-editor/static-renderer/helper/parse-document-string'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import {
  AnyEditorDocument,
  EditorInjectionDocument,
  EditorRowsDocument,
} from '@/serlo-editor/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor/types/template-plugin-type'

export function InjectionStaticRenderer({
  state: href,
}: EditorInjectionDocument) {
  const [content, setContent] = useState<
    AnyEditorDocument[] | 'loading' | 'error'
  >('loading')
  const { strings } = useInstanceData()
  const cleanedHref = href?.startsWith('/') ? href : `/${href}`

  useEffect(() => {
    if (!href) return

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
            uuid.__typename === 'TaxonomyTerm' ||
            uuid.__typename === 'CoursePage'
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

          if (
            uuid.__typename === 'GroupedExercise' ||
            uuid.__typename === 'Exercise'
          ) {
            const exerciseContext = {
              serloContext: {
                licenseId: uuid.license.id,
              },
            }

            setContent([
              { ...JSON.parse(uuid.currentRevision.content), exerciseContext },
            ])
            return
          }

          if (uuid.__typename === 'ExerciseGroup') {
            const exercises = uuid.exercises.map((exercise) => {
              if (!exercise.currentRevision?.content) return []

              const exerciseContentAndContext = {
                ...parseDocumentString(exercise.currentRevision?.content),
                serloContext: {
                  licenseId: uuid.license.id,
                },
              }

              return exercise.currentRevision ? [exerciseContentAndContext] : []
            })

            setContent([
              {
                plugin: TemplatePluginType.TextExerciseGroup,
                id: undefined,
                state: {
                  content: parseDocumentString(
                    uuid.currentRevision.content
                  ) as EditorRowsDocument,
                  exercises,
                },
              },
            ])
            return
          }

          if (uuid.__typename === 'Video') {
            const state = {
              plugin: EditorPluginType.Video,
              state: {
                src: uuid.currentRevision.url,
                alt: uuid.currentRevision.title ?? 'video',
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
          triggerSentry({ message: String(e), data: { href } })
          setContent('error')
        })
    } catch (e) {
      triggerSentry({ message: String(e), data: { href } })
      setContent('error')
    }
  }, [cleanedHref, href])

  if (!href) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error') {
    return (
      <InfoPanel>
        {strings.errors.defaultMessage}{' '}
        <small className="float-right mt-0.5">
          <a className="serlo-link" href={cleanedHref}>
            Link
          </a>
        </small>
      </InfoPanel>
    )
  }

  return (
    <div className="border-b-3 border-brand-200 pb-4 text-gray-900">
      <StaticRenderer document={content} />
    </div>
  )
}

const query = gql`
  query injectionOnlyContent($path: String!) {
    uuid(alias: { path: $path, instance: de }) {
      __typename
      ... on Exercise {
        ...injectionExercise
      }
      ... on GroupedExercise {
        ...injectionExercise
      }
      ... on ExerciseGroup {
        ...injectionLicense
        currentRevision {
          content
        }
        exercises {
          ...injectionExercise
        }
      }
      ... on Video {
        currentRevision {
          url
          title
        }
      }
      ... on Applet {
        currentRevision {
          url
          content
        }
      }
      ... on Event {
        currentRevision {
          content
        }
      }
      ### fallbacks
      ... on Article {
        alias
        title
      }
      ... on TaxonomyTerm {
        alias
        title
      }
      ... on CoursePage {
        alias
        title
      }
    }
  }

  fragment injectionExercise on AbstractExercise {
    ...injectionLicense
    currentRevision {
      content
    }
  }

  fragment injectionLicense on AbstractRepository {
    license {
      id
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
