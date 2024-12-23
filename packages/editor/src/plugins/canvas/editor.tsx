import { useRef } from 'react'
import { Tldraw, TLEditorSnapshot } from 'tldraw'

// eslint-disable-next-line import/no-unassigned-import
import 'tldraw/tldraw.css'
import { type CanvasProps } from '.'
import { CanvasToolbar } from './toolbar'

export function CanvasEditor({ state, ...props }: CanvasProps) {
  const { focused } = props
  const initialSnapshot = useRef<TLEditorSnapshot | undefined>(
    state.document.value
      ? (JSON.parse(state.document.value) as TLEditorSnapshot)
      : undefined
  )
  return (
    <div className="serlo-canvas-editor relative h-[600px] w-full rounded border">
      {focused && <CanvasToolbar id={props.id} />}
      <div className="h-full w-full">
        <Tldraw
          className="h-full w-full"
          snapshot={initialSnapshot.current}
          onMount={(editor) => {
            if (!state.document.value) {
              editor.updateInstanceState({ isReadonly: false })
            }

            editor.store.listen(() => {
              const snapshot = editor.getSnapshot()
              state.document.set(JSON.stringify(snapshot))
              state.metadata.lastModified.set(Date.now())
            })
          }}
        />
      </div>
    </div>
  )
}
