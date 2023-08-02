import * as R from 'ramda'
import React, { useRef, useState, useMemo } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { RowsPluginConfig, RowsPluginState } from '.'
import { useCanDrop } from './components/use-can-drop'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { edtrDragHandle, EdtrIcon } from '@/serlo-editor/editor-ui'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
import { PluginsWithData } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'
import {
  DocumentState,
  selectSerializedDocument,
  store,
} from '@/serlo-editor/store'

interface RowDragObject {
  id: string
  serialized: DocumentState
  onDrop(): void
}

const validFileTypes = [NativeTypes.FILE, NativeTypes.URL]

export function EditorRowRenderer({
  config,
  row,
  rows,
  index,
  plugins,
  dropContainer,
}: {
  config: RowsPluginConfig
  row: StateTypeReturnType<RowsPluginState>[0]
  rows: StateTypeReturnType<RowsPluginState>
  index: number
  plugins: PluginsWithData
  dropContainer: React.RefObject<HTMLDivElement>
}) {
  const editorStrings = useEditorStrings()

  const container = useRef<HTMLDivElement>(null)
  const [draggingAbove, setDraggingAbove] = useState(true)

  const allowedPlugins = useMemo(() => {
    return config.allowedPlugins ? config.allowedPlugins : undefined
  }, [config])
  const canDrop = useCanDrop(row.id, draggingAbove, allowedPlugins)

  const [collectedDragProps, drag, dragPreview] = useDrag({
    type: 'row',
    item: () => {
      return {
        id: row.id,
        serialized: selectSerializedDocument(store.getState(), row.id),
        onDrop() {
          rows.set((list) => {
            const index = list.findIndex((id) => id === row.id)
            return R.remove(index, 1, list)
          })
        },
      }
    },
    collect(monitor) {
      return { isDragging: !!monitor.isDragging() }
    },
  })
  const [collectedDropProps, drop] = useDrop<
    RowDragObject,
    unknown,
    { isDragging: boolean; isFile?: boolean; id?: string }
  >({
    accept: ['row', ...validFileTypes],
    collect(monitor): { isDragging: boolean; isFile?: boolean; id?: string } {
      const type = monitor.getItemType()
      const isDragging = monitor.canDrop() && monitor.isOver({ shallow: true })

      if (isFileType(type)) return { isDragging, isFile: true }

      if (type === 'row') {
        const { id } = monitor.getItem<RowDragObject>()
        return { isDragging, id }
      }

      return { isDragging: false }
    },
    hover(_item: RowDragObject, monitor) {
      if (
        monitor.getItemType() === 'row' &&
        monitor.canDrop() &&
        monitor.isOver({ shallow: true })
      ) {
        setDraggingAbove(isDraggingAbove(monitor))
      }
    },
    drop(item: RowDragObject, monitor) {
      const type = monitor.getItemType()
      // handled in nested drop zone
      if (monitor.didDrop()) return

      if (!isFileType(type)) {
        if (!canDrop(item.id)) return

        const draggingAbove = isDraggingAbove(monitor)
        rows.set((list, deserializer) => {
          const index =
            list.findIndex((id) => id === row.id) + (draggingAbove ? 0 : 1)
          return R.insert(index, deserializer(item.serialized), list)
        })
        item.onDrop()
        return
      }

      const dropIndex = index

      switch (type) {
        case NativeTypes.FILE: {
          const files: File[] = monitor.getItem<{ files: File[] }>().files
          plugins.find(({ type, plugin }) => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { onFiles } = plugin
            if (typeof onFiles === 'function') {
              const result = onFiles(files)
              if (result !== undefined) {
                handleResult(type, result)
                return true
              }
            }
          })
          break
        }
        case NativeTypes.URL: {
          const urls: string[] = monitor.getItem<{ urls: string[] }>().urls
          const text = urls[0]
          plugins.find(({ type, plugin }) => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { onText } = plugin
            if (typeof onText === 'function') {
              const result = onText(text)
              if (result !== undefined) {
                handleResult(type, result)
                return true
              }
            }
          })
          break
        }
      }

      function handleResult(key: string, result: { state?: unknown }) {
        if (isDraggingAbove(monitor)) {
          rows.insert(dropIndex, { plugin: key, state: result.state })
        } else {
          rows.insert(dropIndex + 1, {
            plugin: key,
            state: result.state,
          })
        }
      }
    },
  })

  const pluginProps = React.useMemo(() => {
    return {
      renderSideToolbar(children: React.ReactNode) {
        return (
          <>
            <PluginToolbarButton
              ref={drag}
              icon={<EdtrIcon icon={edtrDragHandle} />}
              label={editorStrings.plugins.rows.dragElement}
              className="-mt-[3px] mb-1.5 cursor-grab select-none active:cursor-grabbing"
            />
            {children}
          </>
        )
      },
    }
  }, [editorStrings, drag])

  setTimeout(() => {
    dragPreview(drop(dropContainer))
  })
  const dropPreview =
    collectedDropProps.isDragging &&
    (collectedDropProps.isFile || canDrop(collectedDropProps.id)) ? (
      <hr className="m-0 border-2 border-editor-primary p-0" />
    ) : null

  return (
    <>
      {draggingAbove ? dropPreview : null}
      <div ref={container}>
        <div
          className={collectedDragProps.isDragging ? 'opacity-30' : undefined}
        >
          {row.render(pluginProps)}
        </div>
      </div>
      {!draggingAbove ? dropPreview : null}
    </>
  )

  function isDraggingAbove(monitor: DropTargetMonitor) {
    if (!container.current) {
      return false
    }
    const domBoundingRect = container.current.getBoundingClientRect()

    const domMiddleY = (domBoundingRect.bottom - domBoundingRect.top) / 2
    const dropClientOffset = monitor.getClientOffset()
    const dragClientY = dropClientOffset
      ? dropClientOffset.y - domBoundingRect.top
      : 0

    return dragClientY < domMiddleY
  }
}

function isFileType(
  type: ReturnType<DropTargetMonitor['getItemType']>
): type is typeof NativeTypes.FILE | typeof NativeTypes.URL {
  return validFileTypes.includes(type as string)
}
