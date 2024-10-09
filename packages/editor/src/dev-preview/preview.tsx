import { Editor } from '@editor/core'
import { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { StaticStringsProvider } from '@editor/i18n/static-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { staticStrings as staticStringsDe } from '@editor/i18n/strings/de/static'
import { EditorPluginType, defaultPlugins } from '@editor/package'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { useMemo, useState } from 'react'
import { debounce } from 'ts-debounce'

import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

const emptyState = JSON.stringify({
  plugin: EditorPluginType.Rows,
})

export function Preview() {
  const [previewState, setPreviewState] = useState(emptyState)

  const isNotEmpty = previewState !== emptyState

  const debouncedSetState = debounce(
    (state?: string | null) => setPreviewState(state ?? emptyState),
    40
  )

  const editor = useMemo(
    () => {
      const allPlugins = createBasicPlugins(defaultPlugins)
      editorPlugins.init(allPlugins)

      const basicRenderers = createRenderers()
      editorRenderers.init(basicRenderers)

      return (
        <Editor
          initialState={parseDocumentString(previewState)}
          onChange={({ changed, getDocument }) => {
            if (!changed) return
            void debouncedSetState(JSON.stringify(getDocument()))
          }}
        />
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNotEmpty]
  )

  return (
    <EditStringsProvider value={editStringsDe}>
      <StaticStringsProvider value={staticStringsDe}>
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
      </StaticStringsProvider>
    </EditStringsProvider>
  )
}
