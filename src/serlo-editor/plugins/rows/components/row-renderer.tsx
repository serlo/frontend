import { faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import * as R from 'ramda'
import React, { useRef, useState, useMemo } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { RowsPluginConfig, RowsPluginState } from '..'
import { useCanDrop } from './use-can-drop'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { legacyEditorTheme } from '@/helper/colors'
import { OverlayButton, PluginToolbarButton } from '@/serlo-editor/core'
import { EditorPlugins } from '@/serlo-editor/core/editor'
import { edtrDragHandle, EdtrIcon, styled } from '@/serlo-editor/editor-ui'
import { StateTypeReturnType } from '@/serlo-editor/plugin'
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

const DragToolbarButton = styled(PluginToolbarButton)({
  marginBottom: '5px',
  marginTop: '-3px',
  cursor: 'grab',
  userSelect: 'none',
  '&:active': {
    cursor: 'grabbing',
  },
})

const BorderlessOverlayButton = styled(OverlayButton)({
  border: 'none !important',
  padding: '0 !important',
  minWidth: '0 !important',
})

const Inserted = styled.hr({
  margin: 0,
  padding: 0,
  border: `1px solid ${legacyEditorTheme.primary.background}`,
})

const validFileTypes = [NativeTypes.FILE, NativeTypes.URL]

export function RowRenderer({
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
  plugins: EditorPlugins
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
          for (const key in plugins) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { onFiles } = plugins[key]
            if (typeof onFiles === 'function') {
              const result = onFiles(files)
              if (result !== undefined) {
                handleResult(key, result)
                return
              }
            }
          }
          break
        }
        case NativeTypes.URL: {
          const urls: string[] = monitor.getItem<{ urls: string[] }>().urls
          const text = urls[0]
          for (const key in plugins) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { onText } = plugins[key]
            if (typeof onText === 'function') {
              const result = onText(text)
              if (result !== undefined) {
                handleResult(key, result)
                return
              }
            }
          }
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
                <BorderlessOverlayButton
                  onClick={() => {
                    const document = selectSerializedDocument(
                      store.getState(),
                      row.id
                    )
                    if (!document) return
                    rows.insert(index, document)
                    close()
                  }}
                  label={editorStrings.rows.duplicate}
                >
                  <FaIcon icon={faCopy} /> {editorStrings.rows.duplicate}
                </BorderlessOverlayButton>
                <BorderlessOverlayButton
                  onClick={() => {
                    rows.remove(index)
                    close()
                  }}
                  label={editorStrings.rows.remove}
                >
                  <FaIcon icon={faTrashAlt} /> {editorStrings.rows.remove}
                </BorderlessOverlayButton>
              </div>
              <div>
                <BorderlessOverlayButton
                  onClick={() => {
                    close()
                  }}
                  label={editorStrings.rows.close}
                />
              </div>
            </div>
          </>
        )
      },
      renderToolbar(children: React.ReactNode) {
        return (
          <>
            <DragToolbarButton
              ref={drag}
              icon={<EdtrIcon icon={edtrDragHandle} />}
              label={editorStrings.rows.dragElement}
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
      <Inserted />
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
