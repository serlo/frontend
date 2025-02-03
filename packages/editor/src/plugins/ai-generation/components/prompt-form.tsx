import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { Sparkles } from './sparkles'

export function PromptForm({
  onSubmit,
}: {
  onSubmit: (prompt: string) => void
}) {
  const aiStrings = useEditStrings().plugins.aiGeneration
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return isLoading ? (
    <div className="animate-pulse">
      <Sparkles />
    </div>
  ) : (
    <form>
      <textarea
        className={cn(`ml-side w-[calc(100%-32px)] rounded-xl border-2 border-editor-primary-100
          bg-editor-primary-100 px-2.5 py-2 text-almost-black
          focus:border-editor-primary focus:outline-none`)}
        value={prompt}
        rows={5}
        placeholder={aiStrings.placeholder}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="serlo-button-edit-primary mx-side mt-4 px-4"
        onClick={(e) => {
          e.preventDefault()
          onSubmit(prompt)
          setPrompt('')
          setIsLoading(true)
        }}
      >
        {aiStrings.buttonText}
      </button>
    </form>
  )
}
