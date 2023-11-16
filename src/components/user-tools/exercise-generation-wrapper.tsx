import { useState } from 'react'

import { ExerciseGenerationWizard } from '../content/exercises/exercise-generation-wizard'
import { ExercisePreviewPage } from '../content/exercises/exercise-preview-page'
import { ModalWithCloseButton } from '../modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { submitEvent } from '@/helper/submit-event'
import { EditorProps } from '@/serlo-editor/core'

export interface ExerciseGenerationWrapperProps {
  subject: string
  topic: string
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
  setEditorState,
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
        // It will take the custom value (top-40%) of the ModalWithCloseButton
        // without the important
        className="flex !h-3/4 max-h-[80vh] min-h-[420px] flex-col pb-4"
      >
        <ExerciseGenerationWizard
          data={{
            subject,
            title,
            topic,
          }}
          setTitle={setTitle}
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
