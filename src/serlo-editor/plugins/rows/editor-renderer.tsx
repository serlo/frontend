import { faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import * as R from 'ramda'
import React, { useRef, useState, useMemo } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { RowsPluginConfig, RowsPluginState } from '.'
import { useCanDrop } from './components/use-can-drop'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { edtrDragHandle, EdtrIcon } from '@/serlo-editor/editor-ui'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
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
  plugins: PluginsContextPlugins
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
            const i = R.findIndex((id) => id === row.id, list)
            return R.remove(i, 1, list)
          })
        },
      }
    },
    collect(monitor) {
      return {
        isDragging: !!monitor.isDragging(),
      }
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
      if (isFileType(type)) {
        return {
          isDragging,
          isFile: true,
        }
      }

      if (type === 'row') {
        return {
          isDragging,
          id: monitor.getItem<RowDragObject>().id,
        }
      }

      return {
        isDragging: false,
      }
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
          const i = R.findIndex((id) => id === row.id, list)
          return R.insert(
            draggingAbove ? i : i + 1,
            deserializer(item.serialized),
            list
          )
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
      renderSettings(children: React.ReactNode, { close }: { close(): void }) {
        return (
          <>
            {children}
            <hr />
            <div className="flex">
              <div className="flex-[1]">
                <button
                  className="serlo-button-editor-secondary mr-2 mt-4"
                  onClick={() => {
                    const document = selectSerializedDocument(
                      store.getState(),
                      row.id
                    )
                    if (!document) return
                    rows.insert(index, document)
                    close()
                  }}
                >
                  <FaIcon icon={faCopy} />{' '}
                  {editorStrings.plugins.rows.duplicate}
                </button>
                <button
                  className="serlo-button-editor-secondary mr-2 mt-4"
                  onClick={() => {
                    rows.remove(index)
                    close()
                  }}
                >
                  <FaIcon icon={faTrashAlt} />{' '}
                  {editorStrings.plugins.rows.remove}
                </button>
              </div>
            </div>
          </>
        )
      },
      renderToolbar(children: React.ReactNode) {
        return (
          <>
            <PluginToolbarButton
              ref={drag}
              icon={<EdtrIcon icon={edtrDragHandle} />}
              label={editorStrings.plugins.rows.dragElement}
              className="mb-1.5 -mt-[3px] cursor-grab select-none active:cursor-grabbing"
            />
            {children}
          </>
        )
      },
    }
  }, [editorStrings, rows, row.id, index, drag])

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
