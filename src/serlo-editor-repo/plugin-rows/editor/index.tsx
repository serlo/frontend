import * as React from 'react'

import { RowsPluginConfig, RowsProps, RowsPluginState } from '..'
import { useScopedSelector } from '../../core'
import { StateTypeReturnType } from '../../plugin'
import { getPlugins, isFocused, getPluginTypesOnPathToRoot } from '../../store'
import { styled } from '../../ui'
import { useRowsConfig } from '../config'
import { RegistryContext } from '../registry-context'
import { RowsRenderer } from '../renderer'
import { Menu } from './menu'
import { RowRenderer } from './render'
import { Separator } from './separator'

const DropContainer = styled.div({
  position: 'relative',
  // increase dropZone
  marginLeft: '-50px',
  paddingLeft: '50px',
})

function RowEditor({
  config,
  openMenu,
  index,
  row,
  rows,
  visuallyEmphasizeAddButton = false,
  isLast = false,
}: {
  config: RowsPluginConfig
  openMenu(index: number): void
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  visuallyEmphasizeAddButton?: boolean
  isLast?: boolean
}) {
  const focused = useScopedSelector(isFocused(row.id))
  const plugins = useScopedSelector(getPlugins())
  const dropContainer = React.useRef<HTMLDivElement>(null)

  return (
    <DropContainer key={row.id} ref={dropContainer}>
      <RowRenderer
        config={config}
        row={row}
        rows={rows}
        index={index}
        plugins={plugins}
        dropContainer={dropContainer}
      />
      <Separator
        config={config}
        focused={focused}
        onClick={() => {
          openMenu(index + 1)
        }}
        isLast={isLast}
        visuallyEmphasizeAddButton={visuallyEmphasizeAddButton}
      />
    </DropContainer>
  )
}

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

  function openMenu(insertIndex: number) {
    setMenu({
      index: insertIndex,
      onClose: (pluginState) => {
        props.state.insert(insertIndex, pluginState)
        setMenu(undefined)
      },
    })
  }

  if (!props.editable) return <RowsRenderer {...props} />

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
        <Separator
          config={config}
          isFirst
          isLast={isDocumentEmpty}
          visuallyEmphasizeAddButton={
            visuallyEmphasizeLastAddButton && isDocumentEmpty
          }
          focused={props.state.length === 0}
          onClick={() => {
            openMenu(0)
          }}
        />
        {props.state.map((row, index) => {
          const isLastRowEditor = index === props.state.length - 1
          return (
            <RowEditor
              config={config}
              key={row.id}
              openMenu={() => {
                openMenu(index + 1)
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
