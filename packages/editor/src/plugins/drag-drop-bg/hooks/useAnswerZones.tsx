import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useCallback, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'

import type { DragDropBgProps } from '..'
import type {
  AnswerZoneSettings,
  answerZoneType,
  wrongAnswerType,
} from '../types'

export function useAnswerZones({ state, id }: DragDropBgProps) {
  const { answerZones, extraDraggableAnswers } = state

  const [currentAnswerZone, setCurrentAnswerZone] = useState<answerZoneType>(
    answerZones[0]
  )

  const [currentWrongAnswer, setCurrentWrongAnswer] = useState<wrongAnswerType>(
    extraDraggableAnswers[0]
  )

  const selectAnswerZone = (id: string) => {
    const answerZone = answerZones.find((zone) => zone.id.get() === id)
    if (answerZone) {
      setCurrentAnswerZone(answerZone)
    }
  }

  const selectWrongAnswer = (id: string) => {
    const wrongAnswer = extraDraggableAnswers.find(
      (answer) => answer.id.get() === id
    )
    if (wrongAnswer) {
      setCurrentWrongAnswer(wrongAnswer)
    }
  }

  const onChangeAnswerZone = (id: string, settings: AnswerZoneSettings) => {
    const answerZone = answerZones.find((zone) => zone.id.get() === id)
    if (!answerZone) return

    settings?.visible && answerZone.layout.visible.set(settings?.visible)
    answerZone.layout.height.set(settings?.height)
    answerZone.layout.width.set(settings?.width)
    answerZone.layout.lockedAspectRatio.set(settings?.lockedAspectRatio)
  }

  const onChangeDimensions = useCallback(
    (id: string, dimensions: { width: number; height: number }) => {
      const answerZone = answerZones.find((zone) => zone.id.get() === id)
      if (!answerZone) return

      answerZone.layout.width.set(dimensions.width)
      answerZone.layout.height.set(dimensions.height)
    },
    [answerZones]
  )

  const getAnswerZoneAtIndex = (index: number) => answerZones[index]

  const moveAnswerZone = useCallback(
    (answerZone: answerZoneType, left: number, top: number) => {
      answerZone.position.left.set(left)
      answerZone.position.top.set(top)
    },
    []
  )

  const insertAnswerZone = () => {
    answerZones.insert(answerZones.length, {
      id: `${id}-${answerZones.length}`,
      position: { left: 20, top: 20 },
      layout: {
        width: 200,
        height: 70,
        lockedAspectRatio: true,
        visible: true,
      },
      answer: {
        image: { plugin: EditorPluginType.Image },
        text: { plugin: EditorPluginType.Text },
      },
    })
  }

  const [, drop] = useDrop(
    () => ({
      accept: 'all',
      drop(answerZone: answerZoneType, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        const delta = change || ({ x: 0, y: 0 } as XYCoord)
        const left = Math.round(answerZone.position.left.get() + delta.x)
        const top = Math.round(answerZone.position.top.get() + delta.y)
        moveAnswerZone(answerZone, left, top)
      },
    }),
    [answerZones]
  )

  const createWrongAnswer = () => {
    const newId = `${id}-${extraDraggableAnswers.length}`
    extraDraggableAnswers.insert(extraDraggableAnswers.length, {
      id: newId,
      answer: {
        image: { plugin: EditorPluginType.Image },
        text: { plugin: EditorPluginType.Text },
      },
    })
  }

  return {
    currentAnswerZone,
    currentWrongAnswer,
    selectWrongAnswer,
    selectAnswerZone,
    insertAnswerZone,
    getAnswerZoneAtIndex,
    moveAnswerZone,
    onChangeAnswerZone,
    drop,
    createWrongAnswer,
    onChangeDimensions,
  }
}
