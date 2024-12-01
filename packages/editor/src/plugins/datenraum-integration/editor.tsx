import { EditorModal } from '@editor/editor-ui/editor-modal'
import {
  insertPluginChildBefore,
  removePluginChild,
  selectChildTreeOfParent,
  useAppDispatch,
  useStore,
} from '@editor/store'
import { SearchModal } from '@serlo/frontend/src/components/datenraum/search-modal'
import { useState } from 'react'

import { type DatenraumIntegrationProps } from '.'

export function DatenraumIntegrationEditor(props: DatenraumIntegrationProps) {
  const [showSearch, setShowSearch] = useState(true)

  const dispatch = useAppDispatch()
  const store = useStore()

  return (
    <EditorModal
      title=""
      isOpen={showSearch}
      className="top-1/2 max-h-[80vh] min-h-[60vh] w-[900px] max-w-[90vw] -translate-x-1/2 overflow-y-auto"
      setIsOpen={setShowSearch}
    >
      <div className="px-3">
        <SearchModal noNew onImport={handleImport} />
      </div>
    </EditorModal>
  )

  function handleImport(state?: unknown) {
    const parentPlugin = selectChildTreeOfParent(store.getState(), props.id)

    if (!parentPlugin) return null

    dispatch(
      insertPluginChildBefore({
        parent: parentPlugin.id,
        sibling: props.id,
        //@ts-expect-error 123
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        document: state[0],
      })
    )

    dispatch(removePluginChild({ parent: parentPlugin.id, child: props.id }))

    setShowSearch(false)
  }
}
