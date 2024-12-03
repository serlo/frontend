import {
  insertPluginChildBefore,
  removePluginChild,
  selectChildTreeOfParent,
  useAppDispatch,
  useStore,
} from '@editor/store'
import { SearchModal } from '@serlo/frontend/src/components/datenraum/search-modal'
import { Dialog, DialogContent } from '@serlo/frontend/src/components/ui/dialog'
import { useState } from 'react'

import { type DatenraumIntegrationProps } from '.'

export function DatenraumIntegrationEditor(props: DatenraumIntegrationProps) {
  const [showSearch, setShowSearch] = useState(true)

  const dispatch = useAppDispatch()
  const store = useStore()

  return (
    <Dialog
      open={showSearch}
      defaultOpen={showSearch}
      onOpenChange={setShowSearch}
    >
      <DialogContent className="top-[45%] w-[900px] max-w-[90vw]">
        <div className="px-3">
          <SearchModal noNew onImport={handleImport} />
        </div>
      </DialogContent>
    </Dialog>
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
