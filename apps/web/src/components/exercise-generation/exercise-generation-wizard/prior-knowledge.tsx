import { cn } from '@serlo/tailwind/helper/cn'

import { WizardPageProps } from './wizard-page-props'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface PriorKnowledgeProps extends WizardPageProps {
  priorKnowledge: string
  setPriorKnowledge: (knowledge: string) => void
}

export function PriorKnowledge({
  priorKnowledge,
  setPriorKnowledge,
  onNext,
  isSummary,
}: PriorKnowledgeProps) {
  const { priorKnowledge: priorKnowledgeStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration

  return (
    <div className={cn('flex flex-col', isSummary && 'mb-4')}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(priorKnowledgeStrings.title, {
            priorKnowledge: <b>{priorKnowledgeStrings.priorKnowledge}</b>,
          })}
        </p>
      )}

      <label htmlFor="priorKnowledge" className="font-semibold text-brand-700">
        {priorKnowledgeStrings.label}
      </label>
      {!isSummary && (
        <p className="my-2 text-sm font-thin text-gray-400">
          {priorKnowledgeStrings.example}
        </p>
      )}
      <textarea
        id="priorKnowledge"
        value={priorKnowledge}
        onChange={(e) => setPriorKnowledge(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onNext()
          }
        }}
        className="w-11/12 resize-none rounded-md border border-brand-300 p-2 pl-2 focus:border-brand-300 focus:outline-brand-700"
        placeholder={priorKnowledgeStrings.placeholder}
      />
    </div>
  )
}
