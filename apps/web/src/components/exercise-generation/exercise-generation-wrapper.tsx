import { EditorProps } from '@serlo/editor/src/core'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ExerciseGenerationWizard } from './exercise-generation-wizard/exercise-generation-wizard'
import { ExercisePreviewPage } from './exercise-preview-page'
import { ModalWithCloseButton } from '../modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { submitEvent } from '@/helper/submit-event'

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

  const router = useRouter()
  const [activePage, setActivePage] = useState(
    ActivePage.ExerciseGenerationWizard
  )
  const [prompt, setPrompt] = useState('')

  const handleTransitionToExercisePage = () => {
    setActivePage(ActivePage.ExercisePreviewPage)

    const url = new URL(window.location.href)
    // Delete existing referrer query param so that we land on the empty
    // exercise creation page when closing the preview page modal
    url.searchParams.delete('referrer')
    // Update URL without reloading the page
    router
      .replace(url.pathname + url.search, undefined, {
        shallow: true,
      })
      .then(() => void null)
      .catch(() => void null)
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
        className="top-0 flex h-full max-h-none min-h-[420px] w-full max-w-none translate-y-0 flex-col pb-4 sm:top-[40%] sm:h-3/4 sm:max-h-[80vh] sm:w-[500px] sm:max-w-[85%] sm:-translate-y-1/2"
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
