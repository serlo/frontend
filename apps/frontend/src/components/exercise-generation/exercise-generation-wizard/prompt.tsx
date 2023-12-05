interface PromptProps {
  prompt: string
  setPrompt: (prompt: string) => void
}

// No i18n needed here as this won't make it to production. Most likely only for
// authors during testing
export function Prompt({ prompt, setPrompt }: PromptProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-brand-700">Prompt</label>
      <textarea
        placeholder="Enter your prompt!"
        value={prompt}
        className="my-2 min-h-[150px] resize-none rounded-md border-2 border-brand-300 p-2 pl-2 focus:border-brand-300 focus:outline-brand-700"
        onChange={(event) => setPrompt(event.target.value)}
      />
    </div>
  )
}
