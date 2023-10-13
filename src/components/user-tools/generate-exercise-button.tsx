import { faStar } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthorToolsData } from './foldout-author-menus/author-tools'
import { ExercisePreviewPage } from '../content/exercises/exercise-preview-page'
import { ModalWithCloseButton } from '../modal-with-close-button'
import { ExerciseGenerationWizardProps } from '@/components/content/exercises/exercise-generation-wizard'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

const ExerciseGenerationWizard = dynamic<ExerciseGenerationWizardProps>(() =>
  import('@/components/content/exercises/exercise-generation-wizard').then(
    (mod) => mod.ExerciseGenerationWizard
  )
)

interface GenerateExerciseButtonProps {
  data: AuthorToolsData
}

enum ActivePage {
  None = 'none',
  ExerciseGenerationWizard = 'exerciseGenerationWizard',
  ExercisePreviewPage = 'exercisePreviewPage',
}

export const GenerateExerciseButton = ({
  data,
}: GenerateExerciseButtonProps) => {
  const { strings } = useInstanceData()

  const [title, setTitle] = useState(
    strings.ai.exerciseGeneration.initialModalTitle
  )

  // TODO change this, only for testing.
  // const [activePage, setActivePage] = useState(ActivePage.ExercisePreviewPage)
  const [activePage, setActivePage] = useState(ActivePage.None)
  const [generateExercisePromise, setGenerateExercisePromise] =
    useState<Promise<any> | null>(null)

  const handleTransitionToExercisePage = (promise: Promise<any | null>) => {
    console.log('Promise: ', { promise })
    setGenerateExercisePromise(promise)

    setActivePage(ActivePage.ExercisePreviewPage)
  }

  return (
    <>
      <button
        className="serlo-button-green m-0.5 ml-1 text-sm leading-browser"
        onClick={() => setActivePage(ActivePage.ExerciseGenerationWizard)}
      >
        <FaIcon icon={faStar} className="mr-2" />
        {strings.ai.exerciseGeneration.buttonTitle}
      </button>

      <ModalWithCloseButton
        onCloseClick={() => setActivePage(ActivePage.None)}
        isOpen={activePage === ActivePage.ExerciseGenerationWizard}
        title={title}
        alignTitleAndCloseButton
        confirmCloseDescription={
          strings.ai.exerciseGeneration.confirmCloseDescription
        }
        // It will take the custom value (top-40%) of the ModalWithCloseButton
        // without the important
        className="!top-1/2 flex max-h-[80vh] min-h-[420px] flex-col pb-4"
      >
        <ExerciseGenerationWizard
          data={data}
          setTitle={setTitle}
          handleTransitionToExercisePage={handleTransitionToExercisePage}
        />
      </ModalWithCloseButton>
      {activePage === ActivePage.ExercisePreviewPage && (
        <ExercisePreviewPage
          generateExercisePromise={generateExercisePromise}
          closePage={() => setActivePage(ActivePage.None)}
        />
      )}
    </>
  )
}
