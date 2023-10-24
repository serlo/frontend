import { WizardPageProps } from './wizard-page-props'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface PriorKnowledgeProps extends WizardPageProps {
  priorKnowledge: string
  setPriorKnowledge: (knowledge: string) => void
}

export const PriorKnowledge: React.FC<PriorKnowledgeProps> = ({
  priorKnowledge,
  setPriorKnowledge,
  onNext,
  isSummary,
}) => {
  const { strings } = useLoggedInData() as LoggedInData

  return (
    <div className={`flex flex-col ${isSummary ? 'mb-4' : ''}`}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(
            strings.ai.exerciseGeneration.priorKnowledge.title,
            {
              priorKnowledge: (
                <b>
                  {strings.ai.exerciseGeneration.priorKnowledge.priorKnowledge}
                </b>
              ),
            }
          )}
        </p>
      )}

      <label htmlFor="priorKnowledge" className="font-semibold text-brand-700">
        {strings.ai.exerciseGeneration.priorKnowledge.label}
      </label>
      {!isSummary && (
        <p className="text-lightgray my-2 text-sm font-thin">
          {strings.ai.exerciseGeneration.priorKnowledge.example}
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
        className="border-lightblue focus:border-lightblue w-11/12 resize-none rounded-md border p-2 pl-2 focus:outline-brand-700"
        placeholder={strings.ai.exerciseGeneration.priorKnowledge.placeholder}
      />
    </div>
  )
}
