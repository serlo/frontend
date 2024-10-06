import { useEditStrings } from '@editor/i18n/edit-strings-provider'

export function EmptyWarning() {
  const warningString = useEditStrings().plugins.box.emptyContentWarning

  return (
    <div
      className="box-warning text-side absolute right-10 -mt-[1.45rem]"
      data-qa="plugin-box-empty-content-warning"
    >
      <span className="bg-editor-primary-100 px-1.5 py-0.5 text-sm">
        ⚠️ {warningString}
      </span>
    </div>
  )
}
