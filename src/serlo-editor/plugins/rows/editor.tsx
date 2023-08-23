import clsx from 'clsx'

import type { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { RowEditor } from './components/row-editor'
import { RowSeparator } from './components/row-separator'
import { selectAncestorPluginTypes, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function RowsEditor({ state, config, id, editable }: RowsProps) {
  const typesOfAncestors = useAppSelector((state) =>
    selectAncestorPluginTypes(state, id)
  )

  function insertRowWithSuggestionsOpen(insertIndex: number) {
    const textPluginWithSuggestions = {
      plugin: EditorPluginType.Text,
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

  const isRootRowsEditor =
    !typesOfAncestors?.some(isPluginWithoutEmphasizedAddButton) &&
    typesOfAncestors?.[typesOfAncestors.length - 1] !== EditorPluginType.Rows

  const isDocumentEmpty = state.length === 0

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <div
        className={clsx(
          'relative mt-[25px]',
          isRootRowsEditor ? 'mb-[75px]' : undefined
        )}
      >
        <RowSeparator
          isFirst
          isLast={isDocumentEmpty}
          visuallyEmphasizeAddButton={isRootRowsEditor && isDocumentEmpty}
          focused={state.length === 0}
          onClick={(event: React.MouseEvent) => {
            event.preventDefault()
            insertRowWithSuggestionsOpen(0)
          }}
        />
        {state.map((row, index) => (
          <RowEditor
            config={config}
            key={row.id}
            index={index}
            rows={state}
            row={row}
          />
        ))}
      </div>
    </AllowedChildPlugins.Provider>
  )
}

const isPluginWithoutEmphasizedAddButton = (pluginType: EditorPluginType) =>
  [
    EditorPluginType.Box,
    EditorPluginType.Spoiler,
    EditorPluginType.Multimedia,
    EditorPluginType.Important,
  ].includes(pluginType)
