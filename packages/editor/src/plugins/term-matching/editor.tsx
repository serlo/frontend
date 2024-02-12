import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import React, { useCallback, useEffect, useRef } from 'react'
import { XYCoord, useDrop } from 'react-dnd'
import { v4 as uuid } from 'uuid'

import type { TermMatchingProps } from '.'
import { DragItem } from './interfaces'
import { ItemTypes } from './itemTypes'
import { Target } from './target'

export function TermMatchingEditor(props: TermMatchingProps) {
  const { state, id, focused } = props
  // const editorStrings = useEditorStrings()

  console.log({ state })

  const [currentlyFocusedTarget, setCurrentlyFocusedTarget] = React.useState<
    string | undefined
  >()

  const newTargetIdToFocus = useRef<string | undefined>()

  function handleAddTarget(event: React.MouseEvent<HTMLDivElement>) {
    console.log('handleAddTarget', currentlyFocusedTarget)

    if (currentlyFocusedTarget) {
      setCurrentlyFocusedTarget(undefined)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const id = uuid()
    state.targets.insert(undefined, {
      id,
      name: '',
      position: { x, y },
    })
    newTargetIdToFocus.current = id
  }

  useEffect(() => {
    if (newTargetIdToFocus.current) {
      const input = document.querySelector(
        `input[data-target-id="${newTargetIdToFocus.current}"]`
      ) as HTMLInputElement
      input?.focus()
      newTargetIdToFocus.current = undefined
    }
  })

  const moveBox = useCallback(
    (id: string, x: number, y: number) => {
      console.log({ id, x, y })

      const { targets } = state
      const target = targets.find((target) => target.id.value === id)
      if (!target) return

      target.position.x.set(x)
      target.position.y.set(y)
    },
    [state]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TARGET,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord

        const left = Math.round(item.x + delta.x)
        const top = Math.round(item.y + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox]
  )

  return (
    <>
      {renderPluginToolbar()}
      <div
        className="relative w-full aspect-video cursor-crosshair bg-slate-400"
        onClick={handleAddTarget}
        ref={drop}
      >
        <img
          src="http://placekitten.com/800/600"
          className="absolute inset-0 object-cover w-full h-full"
          draggable={false}
        />
        {state.targets.map((target) => (
          <Target
            key={target.id.value}
            onFocus={() => setCurrentlyFocusedTarget(target.id.value)}
            {...target}
          />
        ))}
      </div>
      Klicke auf das Bild, um einen neuen Begriff hinzuzufügen
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginType={EditorPluginType.TermMatchingExercise}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        // className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
      />
    )
  }
}
