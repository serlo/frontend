import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import { sharedLicenseFragments } from '@/fetcher/query-fragments'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  AnyEditorDocument,
  EditorInjectionPlugin,
  EditorRowsPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

export function InjectionStaticRenderer({
  state: href,
}: EditorInjectionPlugin) {
  const [content, setContent] = useState<
    AnyEditorDocument[] | 'loading' | 'error'
  >('loading')

  const { strings } = useInstanceData()

  useEffect(() => {
    if (!href) return
    const cleanedHref = href.startsWith('/') ? href : `/${href}`

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
            uuid.__typename === 'GroupedExercise' ||
            uuid.__typename === 'Exercise'
          ) {
            if (!uuid.currentRevision) throw new Error('no accepted revision')

            const exerciseContext = {
              serloContext: {
                license:
                  uuid.license && !uuid.license.default
                    ? uuid.license
                    : undefined,
              },
            }
            const solutionContent = uuid.solution?.currentRevision?.content
            const solutionContext = {
              serloContext: {
                license:
                  uuid.solution?.license && !uuid.solution?.license.default
                    ? uuid.solution?.license
                    : undefined,
              },
            }

            setContent([
              { ...JSON.parse(uuid.currentRevision.content), exerciseContext },
              solutionContent
                ? { ...JSON.parse(solutionContent), solutionContext }
                : null,
            ])
            return
          }

          if (uuid.__typename === 'ExerciseGroup') {
            if (!uuid.currentRevision) throw new Error('no accepted revision')

            const exercisesWithSolutions = uuid.exercises.map((exercise) => {
              if (!exercise.currentRevision?.content) return []

              const exerciseContentAndContext = {
                ...JSON.parse(exercise.currentRevision?.content),
                serloContext: {
                  license:
                    uuid.license && !uuid.license.default
                      ? uuid.license
                      : undefined,
                },
              } as AnyEditorDocument

              const solutionContentAndContext = exercise.solution
                ?.currentRevision?.content
                ? {
                    ...(JSON.parse(
                      exercise.solution?.currentRevision?.content
                    ) as AnyEditorDocument),
                    serloContext: {
                      license:
                        exercise.solution?.license &&
                        !exercise.solution?.license.default
                          ? exercise.solution?.license
                          : undefined,
                    },
                  }
                : null

              return exercise.currentRevision
                ? [exerciseContentAndContext, solutionContentAndContext]
                : []
            })

            setContent([
              {
                plugin: TemplatePluginType.TextExerciseGroup,
                id: undefined,
                state: {
                  content: JSON.parse(
                    uuid.currentRevision.content
                  ) as EditorRowsPlugin,
                  // solutions are not really part of the state at this point, but cleaner this way
                  exercisesWithSolutions,
                },
              },
            ])
            return
          }

          if (uuid.__typename === 'Video') {
            if (!uuid.currentRevision) throw new Error('no accepted revision')
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
            if (!uuid.currentRevision) throw new Error('no accepted revision')
            setContent([
              {
                plugin: EditorPluginType.Geogebra,
                state: uuid.currentRevision.url,
              },
              JSON.parse(uuid.currentRevision.content),
            ])
            return
          }

          if (uuid.__typename === 'Event') {
            if (!uuid.currentRevision) throw new Error('no accepted revision')
            setContent([JSON.parse(uuid.currentRevision.content)])
            return
          }

          if (
            uuid.__typename === 'Article' ||
            uuid.__typename === 'TaxonomyTerm' ||
            uuid.__typename === 'CoursePage' ||
            uuid.__typename === 'Solution'
          ) {
            if (!uuid.alias) setContent([])
            setContent([createFallbackBox(uuid.alias, uuid.title)])
            return
          }

          setContent('error')
        })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      setContent('error')
    }
  }, [href])

  if (!href) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error')
    return (
      <StaticInfoPanel>
        {strings.errors.defaultMessage}{' '}
        <small className="float-right mt-0.5">
          <a className="serlo-link" href={href}>
            Link
          </a>
        </small>
      </StaticInfoPanel>
    )

  return (
    <div className="mb-4 border-b-4 border-brand-300 text-gray-900">
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
        ...license
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
      ... on Solution {
        alias
        title
      }
    }
  }

  fragment injectionExercise on AbstractExercise {
    ...license
    currentRevision {
      content
    }
    solution {
      ...license
      currentRevision {
        content
      }
    }
  }

  ${sharedLicenseFragments}
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
