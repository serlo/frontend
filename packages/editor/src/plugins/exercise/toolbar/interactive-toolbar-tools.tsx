import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

import type { ExerciseProps } from '..'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import {
  focus,
  runChangeDocumentSaga,
  selectChildTreeOfParent,
  store,
  useAppDispatch,
} from '@editor/store'

export const InteractiveToolbarTools = ({ id }: { id: string }) => {
  const exTemplateStrings = useEditorStrings().templatePlugins.exercise

  const dispatch = useAppDispatch()

  const handleRemovePlugin = useCallback(() => {
    const currentState = store.getState()
    const parent = selectChildTreeOfParent(currentState, id)
    if (!parent) return
    dispatch(
      runChangeDocumentSaga({
        id: parent.id,
        state: {
          initial: (previousState) => {
            const exerciseState = previousState as ExerciseProps['state']
            return { ...exerciseState, interactive: { defined: false } }
          },
        },
      })
    )
    dispatch(focus(parent.id))
  }, [dispatch, id])

  return (
    <>
      <DropdownButton
        onClick={handleRemovePlugin}
        label={exTemplateStrings.removeInteractive}
        icon={faTrashAlt}
        dataQa="remove-plugin-button"
      />
    </>
  )
}
