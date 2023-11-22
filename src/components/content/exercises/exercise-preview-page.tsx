import {
  faPencilAlt,
  faRefresh,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import React, { useMemo, useState } from 'react'

import {
  ExecutePromptStatus,
  useExecuteAIPrompt,
} from './exercise-generation-wizard/execute-ai-prompt'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { useEntityId } from '@/contexts/uuids-context'
import { getDefaultLicense } from '@/data/licenses/licenses-helpers'
import { LoggedInData } from '@/data-types'
import {
  IEditorExerciseData,
  convertAiGeneratedScExerciseToEditorDocument,
  transformEditorDataToExerciseGroup,
} from '@/helper/ai-generated-exercises/data-conversion'
import { ExpectedLLMOutputType } from '@/helper/ai-generated-exercises/decoders'
import { ErrorBoundary } from '@/helper/error-boundary'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorTemplateExerciseGroupDocument } from '@/serlo-editor-integration/types/editor-plugins'

interface ExercisePreviewPageProps {
  prompt: string
  closePage: () => void
}

export const ExercisePreviewPage: React.FC<ExercisePreviewPageProps> = ({
  prompt,
  closePage,
}) => {
  const entityId = useEntityId()
  editorRenderers.init(createRenderers())

  const { licenses } = useInstanceData()
  const license = getDefaultLicense(licenses)
  const {
    data: exerciseData,
    errorMessage,
    setErrorMessage,
    status,
    setStatus,
    regenerate,
  } = useExecuteAIPrompt<ExpectedLLMOutputType>({
    prompt,
    submitEventPrefix: 'exercise-generation-wizard-prompt-execution',
  })

  const { strings } = useLoggedInData() as LoggedInData

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

  const editorData = useMemo<IEditorExerciseData>(() => {
    try {
      return convertAiGeneratedScExerciseToEditorDocument(exerciseData)
    } catch (error) {
      console.error('Error while parsing exercise data: ', error)
      setStatus(ExecutePromptStatus.Error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Unknown error while parsing!'
      )
      return {
        exercises: [],
        heading: '',
      }
    }
  }, [exerciseData, setErrorMessage, setStatus])

  console.log('EditorData: ', editorData)

  const numberOfExercises = editorData?.exercises?.length ?? 0

  return (
    <ModalWithCloseButton
      isOpen
      onCloseClick={closePage}
      confirmCloseDescription="Are you sure you want to close the preview? All data will be lost!"
      className="fixed left-0 top-0 z-50 flex h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center bg-gray-100"
      closeButtonClassName="bg-blue-300 absolute right-2 top-2 text-black"
    >
      {status === ExecutePromptStatus.Loading && (
        <div className="mb-6 flex items-center justify-center">
          <h1 className="font-semibold text-black">
            {strings.ai.exerciseGeneration.preview.loadingHeading}
          </h1>
        </div>
      )}

      <div className="relative h-2/3 w-2/5 overflow-y-auto rounded-xl bg-white p-8">
        {status === ExecutePromptStatus.Loading && <Skeleton />}
        {status === ExecutePromptStatus.Success && (
          <div>
            <ErrorBoundary>
              {editorData && editorData.exercises[currentExerciseIndex] && (
                <StaticRenderer
                  document={editorData.exercises[currentExerciseIndex]}
                  // Using the index as key should work because there is no way
                  // to remove/add exercises and upon regeneration of the
                  // prompt, the state changes to Loading and the component will
                  // be unmounted anyway.
                  key={currentExerciseIndex}
                />
              )}
            </ErrorBoundary>
          </div>
        )}
        {status === ExecutePromptStatus.Error && (
          <>
            <h1 className="text-xl text-red-600">
              Error while generating exercise!
            </h1>
            <pre>{errorMessage ? errorMessage : 'Unexpected error!'}</pre>
          </>
        )}
      </div>

      {numberOfExercises > 1 && (
        <div className="mt-4 flex w-2/5 justify-between">
          {currentExerciseIndex > 0 && (
            <button
              className="mb-2 self-end rounded bg-transparent px-2 py-1 text-brand-700"
              onClick={() =>
                setCurrentExerciseIndex((prev) => Math.max(0, prev - 1))
              }
            >
              <FaIcon icon={faCaretLeft} className="mr-2 text-sm" />

              {strings.ai.exerciseGeneration.previousButton}
            </button>
          )}

          {currentExerciseIndex < numberOfExercises - 1 && (
            <button
              className="mb-2 ml-auto self-end rounded bg-transparent px-2 py-1 text-brand-700"
              onClick={() =>
                setCurrentExerciseIndex((prev) =>
                  Math.min(numberOfExercises - 1, prev + 1)
                )
              }
            >
              {strings.ai.exerciseGeneration.nextExerciseButton}
              <FaIcon icon={faCaretRight} className="ml-2 text-sm" />
            </button>
          )}
        </div>
      )}

      <div className="mt-8 flex w-2/5 flex-col items-end space-y-2">
        {/* Not supported for now */}
        {/* <button className="self-end rounded bg-brand-700 px-6 py-2 text-white">
          {strings.ai.exerciseGeneration.preview.publishExercise}
        </button> */}
        <button
          className="flex items-center text-brand-700"
          onClick={() => {
            const id = `temp_ai_generated_exercise_${new Date().getTime()}`

            if (editorData && editorData.exercises.length === 1) {
              sessionStorage.setItem(
                id,
                JSON.stringify({
                  plugin: 'type-text-exercise',
                  state: {
                    content: JSON.stringify(editorData.exercises[0]),
                  },
                })
              )
              window.location.href = `/entity/create/Exercise/${entityId}?loadFromSession=${id}`
              return
            }

            const exerciseGroup: EditorTemplateExerciseGroupDocument =
              transformEditorDataToExerciseGroup(editorData, license)
            sessionStorage.setItem(id, JSON.stringify(exerciseGroup))

            window.location.href = `/entity/create/Exercise/${entityId}?loadFromSession=${id}`
          }}
        >
          <FaIcon icon={faPencilAlt} className="mr-2" />

          {strings.ai.exerciseGeneration.preview.openExerciseInEditor}
        </button>
        <button
          className="flex items-center text-brand-700"
          onClick={regenerate}
          disabled={status === ExecutePromptStatus.Loading}
        >
          <FaIcon icon={faRefresh} className="mr-2" />
          {strings.ai.exerciseGeneration.preview.regenerate}
        </button>
      </div>
    </ModalWithCloseButton>
  )
}

const Skeleton = () => {
  return (
    <div className="relative h-full w-full">
      <div className="flex animate-pulse flex-col space-y-4">
        <div className="h-4 w-2/4 rounded bg-gray-300"></div>
        <div className="mt-6 h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="mt-6 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mt-6 h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="h-24 w-24 animate-pulse text-7xl">✨</span>
      </div>
    </div>
  )
}
