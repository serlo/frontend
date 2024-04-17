import { useState } from 'react'

import { useMathSkillsStorage } from './utils/math-skills-data-context'
import { useSubmitEvent } from './utils/math-skills-submit-event'
import { cn } from '@/helper/cn'

export function NameInput() {
  const { updateData } = useMathSkillsStorage()
  const submitEvent = useSubmitEvent()
  const [nameValue, setNameValue] = useState('')

  const trimmedName = nameValue.trim()
  const hasName = trimmedName.length >= 2

  function update() {
    updateData((data) => {
      data.name = trimmedName
    })
    submitEvent('enter_name')
  }

  return (
    <>
      <input
        type="text"
        value={nameValue}
        onChange={({ currentTarget }) => setNameValue(currentTarget.value)}
        className={cn(
          'ml-0.5 mt-3 block w-48 rounded-lg bg-[#d8f5ef] p-2 text-xl font-bold',
          'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen'
        )}
        onKeyDown={({ key }) => {
          if (key === 'Enter') update()
        }}
      />
      <button
        className={cn(
          'serlo-button-blue mt-12 px-3 py-2',
          hasName
            ? 'focus:bg-brand'
            : 'cursor-default bg-brand-200 hover:bg-brand-200'
        )}
        onClick={update}
        disabled={!hasName}
      >
        Los gehts!
      </button>
    </>
  )
}
