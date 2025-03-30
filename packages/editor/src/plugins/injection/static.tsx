import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorExerciseGroupDocument,
  EditorInjectionDocument,
  type AnyEditorDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

export function InjectionStaticRenderer({
  state: href,
  errorBox,
}: EditorInjectionDocument & { errorBox?: JSX.Element }) {
  const [content, setContent] = useState<string | 'loading' | 'error'>(
    'loading'
  )

  useEffect(() => {
    if (!href) return

    const [base, hash] = href.split('#')
    const entityId = parseInt(base.match(/\/(\d+)/)?.[1] ?? '0')

    if (!entityId) return

    function handleError(error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error)
      setContent('error')
    }

    async function fetchSerloContent() {
      const url = `https://raw.githubusercontent.com/elbotho/serlo-content/refs/heads/main/content/entities/${entityId}.json`

      const res = await fetch(url)
      const data = (await res.json()) as {
        contentType: string
        path: string
        title: string
        content: string
        contentUrl: string
        licenseId: number
      }

      if (!res.ok) {
        handleError(data)
        return
      }

      if (['Article', 'Course', 'TaxonomyTerm'].includes(data.contentType)) {
        createFallbackBox(data.path, data.title)
      }

      if (data.contentType === 'Exercise') {
        // TODO: inject context again?
        // const serloContext = {
        //   licenseId: data.licenseId,
        //   uuid: entityId,
        // }
      }

      if (data.contentType === 'Video') {
        setContent(
          JSON.stringify({
            document: {
              plugin: EditorPluginType.Video,
              state: {
                src: data.contentUrl,
                alt: data.title ?? 'video',
              },
            },
          })
        )
        return
      }

      if (data.contentType === 'Applet') {
        setContent(
          JSON.stringify({
            document: [
              {
                plugin: EditorPluginType.Geogebra,
                state: data.contentUrl,
              },
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              JSON.parse(data.content).document,
            ],
          })
        )
        return
      }

      if (data.contentType === 'ExerciseGroup') {
        const content =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          JSON.parse(data.content).document as EditorExerciseGroupDocument

        // use id in hash to load one exercise out of the group
        if (hash) {
          const exercise = content.state.exercises.find((exercise) =>
            exercise.id?.startsWith(hash)
          )
          if (exercise) {
            setContent(JSON.stringify({ document: exercise }))
            return
          }
        }

        // TODO: provide license again somehow
        // const contentWithLicenseId = {
        //   ...content,
        //   state: {
        //     ...content.state,
        //     serloContext: { licenseId: uuid.licenseId },
        //   },
        // }
        setContent(JSON.stringify({ document: content }))
        return
      }

      setContent(data.content)
    }

    try {
      void fetchSerloContent()
    } catch (error) {
      handleError(error)
    }
  }, [href])

  if (!href) return null

  if (content === 'loading') return <LoadingSpinner />
  if (content === 'error') return errorBox ?? null
  return (
    <div className="border-b-3 border-brand-200 py-4 text-gray-900">
      <StaticRenderer
        document={
          (JSON.parse(content) as { document: AnyEditorDocument }).document
        }
      />
    </div>
  )
}

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
