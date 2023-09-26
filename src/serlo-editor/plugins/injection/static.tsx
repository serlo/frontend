import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'

import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { InjectionOnlyContentQuery } from '@/fetcher/graphql-types/operations'
import {
  AnyEditorPlugin,
  StaticRenderer,
} from '@/serlo-editor/static-renderer/static-renderer'
import { EditorInjectionPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// Proof of concept for reworked injection plugin

export function InjectionStaticRenderer({
  state: href,
}: EditorInjectionPlugin) {
  const [content, setContent] = useState<
    AnyEditorPlugin[] | 'loading' | 'error'
  >('loading')

  const { strings } = useInstanceData()

  useEffect(() => {
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
            uuid.__typename !== 'GroupedExercise' &&
            uuid.__typename !== 'Exercise'
          ) {
            throw new Error('unsupported uuid')
          }
          if (!uuid.currentRevision) throw new Error('no accepted revision')

          const solutionContent = uuid.solution?.currentRevision?.content
          setContent([
            JSON.parse(uuid.currentRevision.content),
            solutionContent ? JSON.parse(solutionContent) : null,
          ])
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
    return <StaticInfoPanel>{strings.errors.defaultMessage}</StaticInfoPanel>

  return <StaticRenderer state={content} />
}

const query = gql`
  query injectionOnlyContent($path: String!) {
    uuid(alias: { path: $path, instance: de }) {
      __typename
      ... on GroupedExercise {
        currentRevision {
          content
        }
        solution {
          currentRevision {
            content
          }
        }
      }
      ... on Exercise {
        currentRevision {
          content
        }
        solution {
          currentRevision {
            content
          }
        }
      }
    }
  }
`
