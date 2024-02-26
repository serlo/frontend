import { useState } from 'react'

import { useMathSkillsStorage } from './utils/math-skills-data-context'
import { cn } from '@/helper/cn'

export function NameInput() {
  const { updateData } = useMathSkillsStorage()
  const [nameValue, setNameValue] = useState('')

  const trimmedName = nameValue.trim()
  const hasName = trimmedName.length > 2

  return (
    <>
      <input
        type="text"
        autoFocus
        value={nameValue}
        onChange={({ currentTarget }) => setNameValue(currentTarget.value)}
        className={cn(
          'ml-0.5 mt-3 block w-48 rounded-lg bg-[#d8f5ef] p-2 text-xl font-bold',
          'outline-dotted outline-2 outline-transparent focus-visible:outline-newgreen'
        )}
        onKeyDown={({ key }) => {
          if (key === 'Enter') updateData({ name: trimmedName })
        }}
      />
      <button
        className={cn(
          'serlo-button-blue mt-12 px-3 py-2',
          hasName
            ? 'focus:bg-brand'
            : 'cursor-default bg-brand-200 hover:bg-brand-200'
        )}
        onClick={() => updateData({ name: trimmedName })}
        disabled={!hasName}
      >
        Los gehts!
      </button>
    </>
  )
}
