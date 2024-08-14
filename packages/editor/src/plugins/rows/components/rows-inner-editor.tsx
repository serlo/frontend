import { selectParentPluginType, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useContext } from 'react'

import { AddRowButtonLarge } from './add-row-button-large'
import { interactivePluginTypes, PluginMenuModal } from './plugin-menu-modal'
import { RowEditor } from './row-editor'
import type { RowsProps } from '..'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '../contexts/plugin-menu'

export function RowsInnerEditor({ state, config, id }: RowsProps) {
  // since this is only used to check if the current plugin is the child of the
  // root plugin (like a template plugin or article plugin)
  // this should not change – so we don't need to use useAppSelector here
  const parentType = selectParentPluginType(store.getState(), id)

  const isParentTemplatePlugin = parentType?.startsWith('type-')
  const showLargeAddButton =
    parentType === EditorPluginType.Article || isParentTemplatePlugin

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  function handleOpenPluginMenu(insertIndex: number) {
    pluginMenuDispatch({
      type: PluginMenuActionTypes.OPEN,
      payload: { insertIndex },
    })
  }

  function handleInsertPlugin(pluginType: EditorPluginType) {
    const isInteractivePlugin = interactivePluginTypes.has(pluginType)

    const pluginToInsert = isInteractivePlugin
      ? wrapExercisePlugin(pluginType)
      : { plugin: pluginType }

    // TODO: Remove this after confirm with Vito
    // pluginMenuState.onInsertComplete?.()

    state.insert(pluginMenuState.insertIndex, pluginToInsert)

    pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
  }

  return (
    <>
      <div className="relative mt-6">
        {state.map((row, index) => {
          const hideAddButton = showLargeAddButton && index === state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              index={index}
              rows={state}
              row={row}
              isRootRow={parentType === EditorPluginType.Rows}
              hideAddButton={!!hideAddButton}
              onAddButtonClick={handleOpenPluginMenu}
            />
          )
        })}
      </div>
      {showLargeAddButton ? (
        <AddRowButtonLarge
          onClick={() => {
            handleOpenPluginMenu(state.length)
          }}
        />
      ) : null}
      <PluginMenuModal onInsertPlugin={handleInsertPlugin} />
    </>
  )
}

function wrapExercisePlugin(pluginType: EditorPluginType) {
  return {
    plugin: EditorPluginType.Exercise,
    state: {
      content: { plugin: EditorPluginType.Rows },
      interactive: {
        plugin: pluginType,
      },
    },
  }
}
