import { AddPluginModal } from '@editor/core/components/add-plugin-modal/add-plugin-modal'
import {
  PluginSelectionMenuContext,
  insertNewPluginCallback,
  interactivePluginTypes,
} from '@editor/core/contexts/plugins-context'
import { selectParentPluginType, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useContext } from 'react'

import type { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { AddRowButtonLarge } from './components/add-row-button-large'
import { RowEditor } from './components/row-editor'

export function RowsEditor({ state, config, id }: RowsProps) {
  // since this is only used to check if the current plugin is the child of the
  // root plugin (like a template plugin or article plugin)
  // this should not change – so we don't need to use useAppSelector here
  const parentType = selectParentPluginType(store.getState(), id)
  const isParentTemplatePlugin = parentType?.startsWith('type-')
  const showLargeAddButton =
    parentType === EditorPluginType.Article || isParentTemplatePlugin

  const insertPluginCallback: insertNewPluginCallback = (
    pluginType: string,
    insertIndex?: number
  ) => {
    const isInteractivePlugin = interactivePluginTypes.has(
      pluginType as EditorPluginType
    )

    const pluginToInsert = isInteractivePlugin
      ? {
          plugin: EditorPluginType.Exercise,
          state: {
            content: { plugin: EditorPluginType.Rows },
            interactive: {
              plugin: pluginType,
            },
          },
        }
      : {
          plugin: pluginType,
        }

    setTimeout(() => {
      state.insert(insertIndex ?? state.length, pluginToInsert)
    })
  }

  const pContext = useContext(PluginSelectionMenuContext)

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <AddPluginModal />
      <div className="relative mt-6">
        {state.map((row, index) => {
          const hideAddButton = showLargeAddButton && index === state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              onAddButtonClick={(insertIndex: number) => {
                pContext.openSuggestions(insertPluginCallback, insertIndex)
              }}
              index={index}
              rows={state}
              row={row}
              hideAddButton={hideAddButton}
            />
          )
        })}
      </div>
      {showLargeAddButton ? (
        <AddRowButtonLarge
          onClick={() => {
            pContext.openSuggestions(insertPluginCallback, state.length)
          }}
        />
      ) : null}
    </AllowedChildPlugins.Provider>
  )
}
