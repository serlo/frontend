import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { createFeedbackBlock } from './feedback-block'
import { StateContext } from './state-context'
import { Block } from './types'

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
  const { state, setState } = useContext(StateContext)

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

    setState((oldState) => {
      const blocks = oldState.blocks
      const index = blocks.findIndex((block) => block.id === id)
      const nextBlock = blocks.at(index + 1)
      // Only one feedback block after text block
      if (!nextBlock || nextBlock.type === 'feedback') return oldState
      const newBlocks = [
        ...blocks.slice(0, index + 1),
        createFeedbackBlock(feedback),
        ...blocks.slice(index + 1),
      ]
      return {
        ...oldState,
        blocks: newBlocks,
      }
    })
  }
  return (
    <>
      <button
        className={cn('serlo-button-light')}
        onClick={handleKiButtonClick}
      >
        <div>🤖 ⟳</div>
        {/* {fetchFeedback.isPending ? (
          <FaIcon icon={faSpinner} className="animate-spin-slow" />
        ) : (
          <div>🤖 ⟳</div>
        )} */}
      </button>
    </>
  )
}
