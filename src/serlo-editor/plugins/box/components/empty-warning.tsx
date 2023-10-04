import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function EmptyWarning() {
  const editorStrings = useEditorStrings()

  return (
    <div className="box-warning text-side absolute right-10 -mt-[1.45rem]">
      <span className="bg-editor-primary-100 px-1.5 py-0.5 text-sm">
        ⚠️ {editorStrings.plugins.box.emptyContentWarning}
      </span>
    </div>
  )
}
