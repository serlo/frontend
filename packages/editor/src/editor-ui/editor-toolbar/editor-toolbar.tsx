import { UndoRedoButtons } from './undo-redo-buttons'

export function EditorToolbar() {
  return (
    <nav className="pointer-events-none sticky top-0 z-[90] flex h-14 w-full justify-between pl-5 pr-3 pt-2 md:bg-transparent">
      <div className="pointer-events-auto -ml-2 flex gap-2 rounded-lg bg-white p-2 md:-ml-28 md:bg-transparent lg:-ml-40">
        <UndoRedoButtons />
      </div>
      <div className="editor-toolbar-right pointer-events-auto mr-2 rounded-lg bg-white p-2 md:mr-[-11.5vw] lg:-mr-52 xl:-mr-64" />
    </nav>
  )
}
