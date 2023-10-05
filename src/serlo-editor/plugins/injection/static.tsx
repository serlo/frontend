import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  AnyEditorPlugin,
  EditorInjectionPlugin,
  EditorRowsPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

export function InjectionStaticRenderer({
  state: href,
}: EditorInjectionPlugin) {
  const [content, setContent] = useState<
    AnyEditorPlugin[] | 'loading' | 'error'
  >('loading')

  const { strings } = useInstanceData()

  useEffect(() => {
    if (!href) return
    const cleanedHref = href.startsWith('/') ? href : `/${href}`

    try {
      void fetch('/api/frontend/localhost-graphql-fetch', {
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
        .then((data: InjectionOnlyContentQuery) => {
          if (!data?.uuid) throw new Error('not found')
          const uuid = data.uuid
          if (
            uuid.__typename === 'GroupedExercise' ||
            uuid.__typename === 'Exercise'
          ) {
            if (!uuid.currentRevision) throw new Error('no accepted revision')

            const solutionContent = uuid.solution?.currentRevision?.content

            setContent([
              JSON.parse(uuid.currentRevision.content),
              solutionContent ? JSON.parse(solutionContent) : null,
            ])
            return
          }

          if (uuid.__typename === 'ExerciseGroup') {
            if (!uuid.currentRevision) throw new Error('no accepted revision')

            const exercisesWithSolutions = uuid.exercises.map((exercise) => {
              const solutionContent =
                exercise.solution?.currentRevision?.content

              return exercise.currentRevision
                ? ([
                    JSON.parse(exercise.currentRevision?.content),
                    solutionContent ? JSON.parse(solutionContent) : null,
                  ] as AnyEditorPlugin[])
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

  return <StaticRenderer state={content} />
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
    currentRevision {
      content
    }
    solution {
      currentRevision {
        content
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
