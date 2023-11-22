import { useState } from 'react'

import { AuthorToolsData } from './foldout-author-menus/author-tools'
import { ExerciseGenerationWizard } from '../content/exercises/exercise-generation-wizard'
import { ExercisePreviewPage } from '../content/exercises/exercise-preview-page'
import { ModalWithCloseButton } from '../modal-with-close-button'
import { useAiWizard } from '@/contexts/ai-wizard-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { submitEvent } from '@/helper/submit-event'

export interface ExerciseGenerationWrapperProps {
  data: AuthorToolsData
}

enum ActivePage {
  ExerciseGenerationWizard = 'exerciseGenerationWizard',
  ExercisePreviewPage = 'exercisePreviewPage',
}

export const ExerciseGenerationWrapper = ({
  data,
}: ExerciseGenerationWrapperProps) => {
  const { strings } = useLoggedInData() as LoggedInData

  const [title, setTitle] = useState(
    strings.ai.exerciseGeneration.initialModalTitle
  )

  // TODO change this, only for testing.
  // const [activePage, setActivePage] = useState(ActivePage.ExercisePreviewPage)
  const [activePage, setActivePage] = useState(
    ActivePage.ExerciseGenerationWizard
  )
  const [prompt, setPrompt] = useState('')
  const { closeWizard } = useAiWizard()

  const handleTransitionToExercisePage = () => {
    setActivePage(ActivePage.ExercisePreviewPage)
  }

  return (
    <>
      <ModalWithCloseButton
        onCloseClick={() => {
          submitEvent('exercise-generation-wizard-prompt-generation-closed')
          closeWizard()
        }}
        isOpen={activePage === ActivePage.ExerciseGenerationWizard}
        title={title}
        alignTitleAndCloseButton
        confirmCloseDescription={
          strings.ai.exerciseGeneration.confirmCloseDescription
        }
        className="top-1/2 flex max-h-[80vh] min-h-[420px] flex-col pb-4"
      >
        <ExerciseGenerationWizard
          data={data}
          setTitle={setTitle}
          handleTransitionToExercisePage={handleTransitionToExercisePage}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      </ModalWithCloseButton>
      {activePage === ActivePage.ExercisePreviewPage && (
        <ExercisePreviewPage
          prompt={prompt}
          closePage={() => {
            submitEvent('exercise-generation-wizard-exercise-preview-closed')
            closeWizard()
          }}
        />
      )}
    </>
  )
}
