import type { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { AddRowButtonLarge } from './components/add-row-button-large'
import { RowEditor } from './components/row-editor'
import { selectParentPluginType, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export function RowsEditor({ state, config, id }: RowsProps) {
  // since this is only used to check if the current plugin is the child of the
  // root plugin (like a template plugin or article plugin)
  // this should not change – so we don't need to use useAppSelector here
  const parentType = selectParentPluginType(store.getState(), id)
  const isParentTemplatePlugin = parentType?.startsWith('type-')
  const showLargeAddButton =
    parentType === EditorPluginType.Article || isParentTemplatePlugin

  function insertRowWithSuggestionsOpen(insertIndex: number) {
    const textPluginWithSuggestions = {
      plugin: EditorPluginType.Text,
      state: [{ type: 'p', children: [{ text: '/' }] }],
    }
    setTimeout(() => {
      state.insert(insertIndex, textPluginWithSuggestions)
    })
  }

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <div className="relative mt-6">
        {state.map((row, index) => {
          const hideAddButton = showLargeAddButton && index === state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              onAddButtonClick={() => {
                insertRowWithSuggestionsOpen(index + 1)
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
            insertRowWithSuggestionsOpen(state.length)
          }}
        />
      ) : null}
    </AllowedChildPlugins.Provider>
  )
}
