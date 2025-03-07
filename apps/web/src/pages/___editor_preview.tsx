import { type AnyEditorDocument, EditorPluginType } from '@editor/package'
import dynamic from 'next/dynamic'
import NextAdapterPages from 'next-query-params/pages'
import { useMemo } from 'react'
import { debounce } from 'ts-debounce'
import {
  BooleanParam,
  QueryParamProvider,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { cn } from '@/helper/cn'
import { parseDocumentString } from '@/helper/parse-document-string'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'
import { extraSerloPlugins } from '@/serlo-editor-integration/extra-serlo-plugins'
import { extraSerloRenderers } from '@/serlo-editor-integration/extra-serlo-renderers'

const Editor = dynamic(
  () => import('@editor/package').then((mod) => mod.SerloEditor),
  {
    ssr: false,
  }
)

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      loadLoggedInData /* warn: enables preview editor without login */
      serloEntityData={{ entityId: props.id }}
    >
      <div className="relative">
        <QueryParamProvider adapter={NextAdapterPages}>
          <Content />
        </QueryParamProvider>
      </div>
    </FrontendClientBase>
  )
})

const emptyState = JSON.stringify({
  plugin: EditorPluginType.Rows,
  state: [
    {
      plugin: EditorPluginType.Text,
      state: [],
    },
  ],
})

function Content() {
  const [previewState, setPreviewState] = useQueryParam(
    'state',
    withDefault(StringParam, emptyState)
  )

  const [showPreview, setShowPreview] = useQueryParam(
    'preview',
    withDefault(BooleanParam, false)
  )

  const { lang } = useInstanceData()

  const isNotEmpty = previewState !== emptyState

  const debouncedSetState = debounce(
    (state?: string | null) => setPreviewState(state ?? emptyState),
    40
  )
  const editor = useMemo(
    () => (
      <Editor
        editorVariant="serlo-org"
        language={lang === 'de' ? 'de' : 'en'}
        userId="serlo-preview-user"
        initialState={parseDocumentString(previewState)}
        styleReset={false}
        onChange={(newState) => {
          const stringifiedNewState = JSON.stringify(newState.document)
          if (stringifiedNewState === previewState) return
          void debouncedSetState(stringifiedNewState)
        }}
        extraSerloPlugins={extraSerloPlugins}
        extraSerloRenderers={extraSerloRenderers}
      >
        {({ element }) => element}
      </Editor>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNotEmpty]
  )

  return (
    <main id="content" className="flex">
      <section
        className={cn(
          'min-h-screen border-4 border-editor-primary',
          showPreview ? 'w-1/2' : 'w-full'
        )}
      >
        <header className="mx-side flex justify-between align-middle font-bold">
          <h2 className="mb-12 text-editor-primary">Edit</h2>
          <div>
            <input
              onPaste={({ clipboardData }) => {
                const pastedString = clipboardData.getData('text/plain').trim()
                const cleanJsonString = pastedString
                  .replace(/'/g, '')
                  .replace(/\\"/g, '"')

                try {
                  const jsonObject = JSON.parse(
                    cleanJsonString
                  ) as AnyEditorDocument
                  setPreviewState(JSON.stringify(jsonObject))
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error('Error parsing JSON:', error)
                  showToastNotice('sorry, invalid json', 'warning')
                }
              }}
              className="mt-0.5 w-20 bg-gray-100 text-sm"
              placeholder="paste json"
            />
            {' | '}
            <button
              onClick={() => {
                void navigator.clipboard.writeText(previewState)
                showToastNotice('state copied to clipboard', 'success')
              }}
              className="mt-0.5 text-sm"
            >
              copy
            </button>{' '}
            |{' '}
            <button
              onClick={() => setPreviewState(emptyState)}
              className="mt-0.5 text-sm"
            >
              reset
            </button>{' '}
            |{' '}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="mt-0.5 text-sm"
            >
              {showPreview ? 'hide' : 'show'} preview
            </button>
          </div>
        </header>
        <div className="px-2">{editor}</div>
      </section>
      {showPreview ? (
        <section className="min-h-screen w-1/2 border-4 border-l-0 border-editor-primary">
          <h2 className="mx-side mb-12 font-bold text-editor-primary">
            Preview
          </h2>
          <div className="mt-[3rem]">
            <EditorRenderer document={parseDocumentString(previewState)} />
          </div>
        </section>
      ) : null}
    </main>
  )
}
