import { StateTypeReturnType } from '@editor/plugin'
import { PluginsWithData } from '@editor/plugin/helpers/editor-plugins'
import {
  DocumentState,
  selectDocumentPluginType,
  selectStaticDocument,
  useStore,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'
import * as R from 'ramda'
import React, { useRef, useState, useMemo } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import type { RowsPluginConfig, RowsPluginState } from '.'
import { RowDragButton } from './components/row-drag-button'
import { useCanDrop } from './hooks/use-can-drop'

interface RowDragObject {
  id: string
  static: DocumentState
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
  const container = useRef<HTMLDivElement>(null)
  const [draggingAbove, setDraggingAbove] = useState(true)

  const store = useStore()

  const allowedPlugins = useMemo(() => {
    return config.allowedPlugins ? config.allowedPlugins : undefined
  }, [config])
  const canDrop = useCanDrop(row.id, draggingAbove, allowedPlugins)

  const [collectedDragProps, dragPreview] = useDrag({
    type: 'row',
    item: () => {
      return {
        id: row.id,
        static: selectStaticDocument(store.getState(), row.id),
        onDrop() {
          // Remove the dragged plugin from its original rows plugin
          rows.set((list) => {
            const index = list.findIndex((id) => id === row.id)
            return R.remove(index, 1, list)
          })

          // If the dragged plugin was the only plugin in the current rows plugin,
          // add an empty text plugin to replace it
          if (rows.length <= 1) {
            rows.insert(0, { plugin: EditorPluginType.Text })
          }
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
        item.onDrop()
        rows.set((list, staticToStore) => {
          const index =
            list.findIndex((id) => id === row.id) + (draggingAbove ? 0 : 1)
          return R.insert(index, staticToStore(item.static), list)
        })
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
          plugins.forEach(async ({ type, plugin }) => {
            if (typeof plugin.onText === 'function') {
              const result = await plugin.onText(text)
              if (result !== undefined) handleResult(type, result)
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

  setTimeout(() => {
    dragPreview(drop(dropContainer))
  })
  const dropPreview =
    collectedDropProps.isDragging &&
    (collectedDropProps.isFile || canDrop(collectedDropProps.id)) ? (
      <hr className="m-0 border-2 border-editor-primary p-0" />
    ) : null

  const rowPluginType = selectDocumentPluginType(store.getState(), row.id)

  const isMultimediaPlugin = rowPluginType === EditorPluginType.Multimedia

  return (
    <>
      {draggingAbove ? dropPreview : null}
      <div
        id={row.id}
        ref={container}
        className={cn(
          // Base class, used for nested selectors and DOM querying
          'rows-editor-renderer-container',
          // Hover and focus indicator styles
          'rounded-b-lg pt-2',
          'hover:shadow-plugin-hover',
          'focus-within:shadow-plugin-focus',
          'hover:focus-within:!shadow-plugin-focus',
          // Left sidebar styles
          '[&:focus-within>.rows-tools]:opacity-100',
          '[&:has(.rows-editor-renderer-container:focus-within)>.rows-tools]:opacity-0',
          '[&:hover>.rows-tools]:!opacity-100',
          isMultimediaPlugin &&
            '[&>.rows-tools]:!-left-1 [&>.rows-tools]:!-top-9'
        )}
      >
        <RowDragButton rows={rows} index={index} />
        <div
          className={collectedDragProps.isDragging ? 'opacity-30' : undefined}
        >
          {row.render({
            config: {
              placeholder: config.textPluginPlaceholder,
            },
          })}
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
