import type { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { AddRowButtonLarge } from './components/add-row-button-large'
import { RowEditor } from './components/row-editor'
import { selectParentType, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function RowsEditor({ state, config, id, editable }: RowsProps) {
  const parentType = useAppSelector((state) => selectParentType(state, id))

  function insertRowWithSuggestionsOpen(insertIndex: number) {
    const textPluginWithSuggestions = {
      plugin: EditorPluginType.Text,
      state: [{ type: 'p', children: [{ text: '/' }] }],
    }
    setTimeout(() => {
      state.insert(insertIndex, textPluginWithSuggestions)
    })
  }

  const showLargeAddButton =
    parentType === EditorPluginType.Article || parentType?.startsWith('type-')

  if (!editable) {
    return (
      <>
        {state.map((row) => (
          <div key={row.id} className="my-block pl-[14px]">
            {row.render()}
          </div>
        ))}
      </>
    )
  }

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <div className="relative mt-[25px]">
        {state.map((row, index) => {
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
              hideAddButton={showLargeAddButton && index === state.length - 1}
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
