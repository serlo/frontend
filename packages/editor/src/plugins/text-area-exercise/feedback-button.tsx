import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { createFeedbackBlock } from './feedback-block'
import { StateContext } from './state-context'
import { createTextBlock } from './text-block'
import { Block } from './types'
import { PrototypeStateStore } from './prototype-state'

export interface AiFeedback {
  isCorrect: boolean
  generalFeedback: string
}

export function FeedbackButton({
  id,
  exercise,
  solution,
  studentSolution,
}: {
  id: string
  exercise: string
  solution: string
  studentSolution: string
}) {
  async function fetchFeedback() {
    const url = new URL('/api/ai/student-feedback', window.location.href)

    url.searchParams.append('exercise', exercise)
    url.searchParams.append('solution', solution)
    // Maybe do it per paragraph like in the original prototype?
    url.searchParams.append('studentSolution', studentSolution)

    const response = await fetch(url.toString(), { method: 'POST' })

    if (!response.ok) {
      console.error('Network response was not ok')
      return null
    }

    return (await response.json()) as AiFeedback
  }

  async function handleKiButtonClick() {
    const feedback = await fetchFeedback()

    PrototypeStateStore.update((s) => {
      const index = s.textAreaBlocks.findIndex((block) => block.id === id)
      const nextBlock = s.textAreaBlocks.at(index + 1)
      if (!nextBlock || nextBlock.type !== 'feedback') {
        s.textAreaBlocks.splice(index + 1, 0, createFeedbackBlock(feedback))
        //const endSlice = blocks.slice(index + 1) ?? [createTextBlock()]
      }
    })
    /*setState((oldState) => {
      const blocks = oldState.blocks
      const index = blocks.findIndex((block) => block.id === id)
      const nextBlock = blocks.at(index + 1)
      // Only one feedback block after text block
      if (nextBlock && nextBlock.type === 'feedback') return oldState
      const endSlice = blocks.slice(index + 1) ?? [createTextBlock()]
      const newBlocks = [
        ...blocks.slice(0, index + 1),
        createFeedbackBlock(feedback),
        ...endSlice,
      ]
      return {
        ...oldState,
        blocks: newBlocks,
      }
    })*/
  }
  return (
    <>
      <button className="" onClick={handleKiButtonClick}>
        <div>🐦</div>
      </button>
    </>
  )
}
