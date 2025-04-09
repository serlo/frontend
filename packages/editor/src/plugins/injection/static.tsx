import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorExerciseGroupDocument,
  EditorInjectionDocument,
  type AnyEditorDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

interface ResponseData {
  content: AnyEditorDocument
  alias: string
  licenseId?: number
}

export function InjectionStaticRenderer({
  state: href,
  errorBox,
}: EditorInjectionDocument & { errorBox?: JSX.Element }) {
  const injectionStrings = useStaticStrings().plugins.injection

  const [data, setData] = useState<ResponseData | 'loading' | 'error'>(
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
      setData('error')
    }

    async function fetchSerloContent() {
      const url = `https://raw.githubusercontent.com/elbotho/serlo-content/refs/heads/main/content/entities/${entityId}.json`

      const res = await fetch(url)
      const responseData = (await res.json()) as {
        contentType: string
        path: string
        title: string
        content: string
        contentUrl: string
        licenseId: number
      }

      if (!res.ok) {
        handleError(responseData)
        return
      }
      if (
        ['Article', 'Course', 'TaxonomyTerm'].includes(responseData.contentType)
      ) {
        setData({
          content: createFallbackBox(responseData.path, responseData.title),
          alias: responseData.path,
          licenseId: responseData.licenseId,
        })
        return
      }

      if (responseData.contentType === 'Exercise') {
        setData({
          content:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            JSON.parse(responseData.content).document as AnyEditorDocument,
          alias: responseData.path,
          licenseId: responseData.licenseId,
        })
        return
      }

      if (responseData.contentType === 'Video') {
        setData({
          content: {
            plugin: EditorPluginType.Video,
            state: {
              src: responseData.contentUrl,
              alt: responseData.title ?? 'video',
            },
          },
          alias: responseData.path,
          licenseId: responseData.licenseId,
        })
        return
      }

      if (responseData.contentType === 'Applet') {
        setData({
          content: {
            plugin: EditorPluginType.Rows,
            state: [
              {
                plugin: EditorPluginType.Geogebra,
                state: responseData.contentUrl,
              },
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              JSON.parse(responseData.content).document,
            ],
          },
          alias: responseData.path,
          licenseId: responseData.licenseId,
        })
        return
      }

      if (responseData.contentType === 'ExerciseGroup') {
        const content = (
          JSON.parse(responseData.content) as {
            document: EditorExerciseGroupDocument
          }
        ).document

        // use id in hash to load one exercise out of the group
        if (hash) {
          const exercise = content.state.exercises.find((exercise) =>
            exercise.id?.startsWith(hash)
          )
          if (exercise) {
            setData({
              content: exercise,
              alias: responseData.path,
              licenseId: responseData.licenseId,
            })
            return
          }
        }

        setData({
          content: content,
          alias: responseData.path,
          licenseId: responseData.licenseId,
        })
        return
      }

      setData({
        content: JSON.parse(responseData.content) as AnyEditorDocument,
        alias: responseData.path,
        licenseId: responseData.licenseId,
      })
    }

    try {
      void fetchSerloContent()
    } catch (error) {
      handleError(error)
    }
  }, [href])

  if (!href) return null

  if (data === 'loading') return <LoadingSpinner />
  if (data === 'error') return errorBox ?? null

  return (
    <div className="pt-4">
      <div className="mx-side border-t-3 border-brand-200 pb-4"></div>
      <StaticRenderer document={data.content} />
      <div className="mx-side border-t-3 border-brand-200 text-right text-gray-400">
        {data.licenseId && data.licenseId > 1 ? (
          <a
            className="serlo-link"
            href={`/license/detail/${data.licenseId}`}
            target="_blank"
            rel="noreferrer"
          >
            {injectionStrings.license}
          </a>
        ) : null}{' '}
        (
        <a
          className="serlo-link"
          target="_blank"
          rel="noreferrer"
          href={data.alias}
        >
          {injectionStrings.injectedContent}
        </a>
        )
      </div>
    </div>
  )
}

function createFallbackBox(alias: string, title: string) {
  return {
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
          {
            type: 'p',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  }
}
