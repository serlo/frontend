import type { EditorCanvasDocument } from '@editor/types/editor-plugins'
import { Tldraw, TLEditorSnapshot } from 'tldraw'

// eslint-disable-next-line import/no-unassigned-import
import 'tldraw/tldraw.css'

interface CanvasRendererProps {
  document: EditorCanvasDocument['state']['document']
}

export function CanvasRenderer({ document }: CanvasRendererProps) {
  if (!document) return null

  let snapshot: TLEditorSnapshot | undefined
  try {
    snapshot = JSON.parse(document) as TLEditorSnapshot
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse canvas document:', e)
    return null
  }

  return (
    <div className="serlo-canvas-renderer relative h-[600px] w-full rounded border">
      <div className="h-full w-full">
        <Tldraw
          className="h-full w-full"
          snapshot={snapshot}
          components={{
            TopPanel: () => null,
            Toolbar: () => null,
          }}
          onMount={(editor) => {
            editor.updateInstanceState({ isReadonly: true })
          }}
        />
      </div>
    </div>
  )
}
