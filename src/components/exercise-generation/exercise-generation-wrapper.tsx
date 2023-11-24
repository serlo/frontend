import { useState } from 'react'

import { ExerciseGenerationWizard } from './exercise-generation-wizard/exercise-generation-wizard'
import { ExercisePreviewPage } from './exercise-preview-page'
import { ModalWithCloseButton } from '../modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { submitEvent } from '@/helper/submit-event'
import { EditorProps } from '@/serlo-editor/core'

export interface ExerciseGenerationWrapperProps {
  subject: string
  topic: string
  isExerciseGroup: boolean
  closeWizard: () => void
  setEditorState: (editorState: EditorProps['initialState']) => void
}

enum ActivePage {
  ExerciseGenerationWizard = 'exerciseGenerationWizard',
  ExercisePreviewPage = 'exercisePreviewPage',
}

export const ExerciseGenerationWrapper = ({
  subject,
  closeWizard,
  topic,
  isExerciseGroup,
  setEditorState,
}: ExerciseGenerationWrapperProps) => {
  const exGenerationStrings = useLoggedInData()!.strings.ai.exerciseGeneration

  const [activePage, setActivePage] = useState(
    ActivePage.ExerciseGenerationWizard
  )
  const [prompt, setPrompt] = useState('')

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
        title={exGenerationStrings.initialModalTitle}
        className="flex h-3/4 max-h-[80vh] min-h-[420px] flex-col pb-4"
        extraTitleClassName="serlo-h2 mt-3 mr-7 flex-grow border-none py-0 text-center text-sm font-normal"
        confirmCloseDescription={exGenerationStrings.confirmCloseDescription}
      >
        <ExerciseGenerationWizard
          data={{ subject, topic }}
          isExerciseGroup={isExerciseGroup}
          handleTransitionToExercisePage={handleTransitionToExercisePage}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      </ModalWithCloseButton>
      {activePage === ActivePage.ExercisePreviewPage && (
        <ExercisePreviewPage
          prompt={prompt}
          setEditorState={setEditorState}
          closePage={() => {
            submitEvent('exercise-generation-wizard-exercise-preview-closed')
            closeWizard()
          }}
        />
      )}
    </>
  )
}
