import clsx from 'clsx'

import { RowsProps } from '..'
import { useRowsConfig } from '../config'
import { RegistryContext } from '../registry-context'
import { RowEditor } from './row-editor'
import { RowSeparator } from './row-separator'
import { selectAncestorPluginTypes, useAppSelector } from '@/serlo-editor/store'
import { styled } from '@/serlo-editor/ui'

const ReadOnlyRow = styled.div({
  marginBottom: '25px',
  marginTop: '25px',
  paddingLeft: '14px',
})

export function RowsEditor(props: RowsProps) {
  const config = useRowsConfig(props.config)
  const pluginTypesOfAncestors = useAppSelector((state) =>
    selectAncestorPluginTypes(state, props.id)
  )

  function insertRowWithSuggestionsOpen(insertIndex: number) {
    const textPluginWithSuggestions = {
      plugin: 'text',
      state: [{ type: 'p', children: [{ text: '/' }] }],
    }
    setTimeout(() => {
      props.state.insert(insertIndex, textPluginWithSuggestions)
    })
  }

  if (!props.editable) {
    return (
      <>
        {props.state.map((row) => {
          return <ReadOnlyRow key={row.id}>{row.render()}</ReadOnlyRow>
        })}
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

  const isDocumentEmpty = props.state.length === 0

  return (
    <RegistryContext.Provider value={config.plugins}>
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
          focused={props.state.length === 0}
          onClick={(event: React.MouseEvent) => {
            event.preventDefault()
            insertRowWithSuggestionsOpen(0)
          }}
        />
        {props.state.map((row, index) => {
          const isLastRowEditor = index === props.state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              onAddButtonClick={() => {
                insertRowWithSuggestionsOpen(index + 1)
              }}
              index={index}
              rows={props.state}
              row={row}
              isLast={isLastRowEditor}
              visuallyEmphasizeAddButton={
                visuallyEmphasizeLastAddButton && isLastRowEditor
              }
            />
          )
        })}
      </div>
    </RegistryContext.Provider>
  )
}
