import * as React from 'react'

import { RowsProps } from '..'
import { useScopedSelector } from '../../core'
import { getPluginTypesOnPathToRoot } from '../../store'
import { styled } from '../../ui'
import { useRowsConfig } from '../config'
import { RegistryContext } from '../registry-context'
import { Menu } from './menu'
import { RowEditor } from './row-editor'
import { RowSeparator } from './row-separator'

const ReadOnlyRow = styled.div({
  marginBottom: '25px',
})

export function RowsEditor(props: RowsProps) {
  const config = useRowsConfig(props.config)
  const pluginTypesOfAncestors = useScopedSelector(
    getPluginTypesOnPathToRoot(props.id)
  )
  const [menu, setMenu] = React.useState<
    | {
        index: number
        onClose: (pluginState: { plugin: string; state?: unknown }) => void
      }
    | undefined
  >(undefined)

  function addNewRow(insertIndex: number) {
    const pluginState = {
      plugin: 'text',
      state: [{ type: 'p', children: [{ text: '/' }] }],
    }
    setTimeout(() => {
      props.state.insert(insertIndex, pluginState)
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
        style={{
          position: 'relative',
          marginTop: '25px',
          marginBottom: visuallyEmphasizeLastAddButton ? '75px' : undefined,
        }}
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
            addNewRow(0)
          }}
        />
        {props.state.map((row, index) => {
          const isLastRowEditor = index === props.state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              openMenu={() => {
                addNewRow(index + 1)
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
        {menu ? <Menu menu={menu} setMenu={setMenu} config={config} /> : null}
      </div>
    </RegistryContext.Provider>
  )
}
