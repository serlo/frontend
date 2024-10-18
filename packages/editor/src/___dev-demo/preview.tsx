import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { EditorPluginType, SerloEditor, SerloRenderer } from '@editor/package'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { useMemo, useState } from 'react'
import { debounce } from 'ts-debounce'

const emptyState = JSON.stringify({ plugin: EditorPluginType.Rows })

export function Preview() {
  const [previewState, setPreviewState] = useState(emptyState)

  const isNotEmpty = previewState !== emptyState

  const debouncedSetState = debounce(
    (state?: string | null) => setPreviewState(state ?? emptyState),
    40
  )

  const editor = useMemo(
    () => {
      return (
        <SerloEditor
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          initialState={JSON.parse(previewState)}
          editorVariant="unknown"
          onChange={(newState) => {
            void debouncedSetState(JSON.stringify(newState.document))
          }}
        >
          {(editor) => <div>{editor.element}</div>}
        </SerloEditor>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNotEmpty]
  )

  return (
    <main id="content" className="flex">
      <section className="min-h-screen w-[50vw] border-4 border-r-0 border-editor-primary">
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
            </button>
          </div>
        </header>
        <div className="px-2">{editor}</div>
      </section>
      <section className="min-h-screen w-[50vw] border-4 border-editor-primary">
        <h2 className="mx-side mb-12 font-bold text-editor-primary">Preview</h2>
        <div className="mt-[3rem]">
          <SerloRenderer
            state={parseDocumentString(previewState)}
            editorVariant="unknown"
          />
        </div>
      </section>
    </main>
  )
}
