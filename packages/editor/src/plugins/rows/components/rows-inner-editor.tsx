import type { PluginMenuItem } from '@editor/plugins/rows/utils/plugin-menu'
import {
  selectEmptyTextPluginChildrenIndexes,
  selectParentPluginType,
  useStore,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { LazyMotion } from 'motion/react'
import { useContext } from 'react'

import type { RowsProps } from '..'
import { AddRowButtonLarge } from './add-row-button-large'
import { PluginMenuModal } from './plugin-menu-modal'
import { RowEditor } from './row-editor'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '../contexts/plugin-menu'

const loadMotionFeatures = () =>
  import('motion/react').then((res) => res.domMax)

export function RowsInnerEditor({ state, config, id }: RowsProps) {
  const store = useStore()
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

  function handleInsertPlugin(pluginMenuItem: PluginMenuItem) {
    if (pluginMenuState.insertCallback) {
      pluginMenuState.insertCallback(pluginMenuItem.initialState)
    } else {
      state.insert(pluginMenuState.insertIndex, pluginMenuItem.initialState)
      removeEmptyTextPluginChildren()
    }

    pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
  }

  function removeEmptyTextPluginChildren() {
    const indexes = selectEmptyTextPluginChildrenIndexes(store.getState(), id)
    indexes.forEach((index) => {
      if (index !== pluginMenuState.insertIndex) state.remove(index)
    })
  }

  return (
    <>
      <div className="relative mt-6" style={containerCustomStyle}>
        <LazyMotion features={loadMotionFeatures} strict>
          {state.map((row, index) => {
            const hideAddButton =
              showLargeAddButton && index === state.length - 1
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
        </LazyMotion>
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

const containerCustomStyle: React.HTMLAttributes<HTMLDivElement>['style'] = {
  // `overflow-anchor: none` makes sure that the page doesn't jump
  // when moving plugins using the sidebar up/down arrow buttons
  overflowAnchor: 'none',
}
