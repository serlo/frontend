interface PromptProps {
  prompt: string
  setPrompt: (prompt: string) => void
}

export const Prompt = ({ prompt, setPrompt }: PromptProps) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold text-brand-700">Prompt</label>
      <textarea
        placeholder="Enter your prompt!"
        value={prompt}
        className="min-h-4 border-lightblue focus:border-lightblue my-2 resize-none rounded-md border-2 p-2 pl-2 focus:outline-brand-700"
        onChange={(event) => setPrompt(event.target.value)}
      />
    </div>
  )
}
