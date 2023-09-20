import { faStar } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthorToolsData } from './foldout-author-menus/author-tools'
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

export const GenerateExerciseButton = ({
  data,
}: GenerateExerciseButtonProps) => {
  const { strings } = useInstanceData()

  const [title, setTitle] = useState(
    'Erstelle eine Aufgabe automatisch mit Hilfe von KI'
  )

  const [showExerciseGenerationModal, setShowExerciseGenerationModal] =
    useState(false)

  return (
    <>
      <button
        className="serlo-button-green m-0.5 ml-1 text-sm leading-browser"
        onClick={() => setShowExerciseGenerationModal(true)}
      >
        <FaIcon icon={faStar} className="mr-2" />
        {strings.ai.exerciseGeneration.title}
      </button>
      <ModalWithCloseButton
        onCloseClick={() => setShowExerciseGenerationModal(false)}
        isOpen={showExerciseGenerationModal}
        title={title}
        alignTitleAndCloseButton
        className="min-h-[420px] pb-4"
      >
        <ExerciseGenerationWizard data={data} setTitle={setTitle} />
      </ModalWithCloseButton>
    </>
  )
}
