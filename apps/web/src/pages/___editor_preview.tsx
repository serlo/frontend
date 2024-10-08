import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import NextAdapterPages from 'next-query-params/pages'
import { mergeDeepRight } from 'ramda'
import { useMemo } from 'react'
import { debounce } from 'ts-debounce'
import {
  QueryParamProvider,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

const Editor = dynamic(() => import('@editor/core').then((mod) => mod.Editor), {
  ssr: false,
})

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
  const { lang } = useInstanceData()

  const [previewState, setPreviewState] = useQueryParam(
    'state',
    withDefault(StringParam, emptyState)
  )

  const isNotEmpty = previewState !== emptyState

  const debouncedSetState = debounce(
    (state?: string | null) => setPreviewState(state ?? emptyState),
    40
  )
  const editor = useMemo(
    () => (
      <Editor
        initialState={parseDocumentString(previewState)}
        onChange={({ changed, getDocument }) => {
          if (!changed) return
          void debouncedSetState(JSON.stringify(getDocument()))
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNotEmpty]
  )

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(createPlugins({ lang }))

  editorRenderers.init(createRenderers())

  return (
    <EditStringsProvider
      value={
        lang === 'de'
          ? mergeDeepRight(editStringsEn, editStringsDe)
          : editStringsEn
      }
    >
      <main id="content" className="flex">
        <section className="min-h-screen w-[50vw] border-4 border-r-0 border-editor-primary">
          <header className="mx-side flex justify-between align-middle font-bold">
            <h2 className="mb-12 text-editor-primary">Edit</h2>
            <div>
              <input
                onPaste={({ clipboardData }) => {
                  const pastedString = clipboardData
                    .getData('text/plain')
                    .trim()
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
              </button>
            </div>
          </header>
          <div className="px-2">{editor}</div>
        </section>
        <section className="min-h-screen w-[50vw] border-4 border-editor-primary">
          <h2 className="mx-side mb-12 font-bold text-editor-primary">
            Preview
          </h2>
          <div className="mt-[3rem]">
            <EditorRenderer document={parseDocumentString(previewState)} />
          </div>
        </section>
      </main>
    </EditStringsProvider>
  )
}
