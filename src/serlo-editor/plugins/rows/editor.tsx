import clsx from 'clsx'

import { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { RowEditor } from './components/row-editor'
import { RowSeparator } from './components/row-separator'
import { selectAncestorPluginTypes, useAppSelector } from '@/serlo-editor/store'

export function RowsEditor({ state, config, id, editable }: RowsProps) {
  const pluginTypesOfAncestors = useAppSelector((state) =>
    selectAncestorPluginTypes(state, id)
  )

  function insertRowWithSuggestionsOpen(insertIndex: number) {
    const textPluginWithSuggestions = {
      plugin: 'text',
      state: [{ type: 'p', children: [{ text: '/' }] }],
    }
    setTimeout(() => {
      state.insert(insertIndex, textPluginWithSuggestions)
    })
  }

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

  // Prevent add button being visually emphasized when this RowsEditor is contained within certain plugin types.
  const visuallyEmphasizeLastAddButton =
    pluginTypesOfAncestors !== null &&
    pluginTypesOfAncestors.every((pluginType) => {
      return (
        pluginType !== 'box' &&
        pluginType !== 'spoiler' &&
        pluginType !== 'multimedia' &&
        pluginType !== 'important'
      )
    }) &&
    pluginTypesOfAncestors[pluginTypesOfAncestors.length - 1] !== 'rows'

  const isDocumentEmpty = state.length === 0

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <div
        className={clsx(
          'relative mt-[25px]',
          visuallyEmphasizeLastAddButton ? 'mb-[75px]' : undefined
        )}
      >
        <RowSeparator
          config={config}
          isFirst
          isLast={isDocumentEmpty}
          visuallyEmphasizeAddButton={
            visuallyEmphasizeLastAddButton && isDocumentEmpty
          }
          focused={state.length === 0}
          onClick={(event: React.MouseEvent) => {
            event.preventDefault()
            insertRowWithSuggestionsOpen(0)
          }}
        />
        {state.map((row, index) => {
          const isLastRowEditor = index === state.length - 1
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
              isLast={isLastRowEditor}
              visuallyEmphasizeAddButton={
                visuallyEmphasizeLastAddButton && isLastRowEditor
              }
            />
          )
        })}
      </div>
    </AllowedChildPlugins.Provider>
  )
}
