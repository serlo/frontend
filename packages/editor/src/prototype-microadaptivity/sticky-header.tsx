import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export function StickyHeader({ allowEdit }: { allowEdit: boolean }) {
  return (
    <div className="sticky top-2 z-50 m-5 flex w-full flex-col items-center">
      <div className="mb-5 rounded-lg bg-white p-2 shadow-plugin-focus">
        Titel des Lernschritts | 20 Minuten Bearbeitungszeit | 3 Wiederholungen
        {allowEdit ? <FaIcon className="mx-2" icon={faCog} /> : null}
      </div>
    </div>
  )
}
