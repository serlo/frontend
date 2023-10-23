import { faPencilAlt, faRefresh } from '@fortawesome/free-solid-svg-icons'
import ExerciseGenerationLoadingSparkles from 'public/_assets/img/exercise/exercise-generation-loading-sparkles.svg'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { CloseButton } from '@/components/close-button'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { ErrorBoundary } from '@/helper/error-boundary'

interface ExercisePreviewPageProps {
  generateExercisePromise: Promise<any>
  closePage: () => void
}

enum Status {
  Loading,
  Success,
  Error,
}

// TODO remove this before production
const isTestingLocally = false

// const exerciseTestData =
// '{\n  "heading": "Dreisatz",\n  "subtasks": [\n    {\n      "type": "single_choice",\n      "question": "Ein Auto fährt mit einer Geschwindigkeit von 60 km/h. Wie weit kommt das Auto in 3 Stunden?",\n      "options": [\n        "120 km",\n        "180 km",\n        "240 km",\n        "300 km"\n      ],\n      "correct_option": 2\n    },\n    {\n      "type": "single_choice",\n      "question": "Ein Kind isst 4 Schokoriegel in 2 Tagen. Wie viele Schokoriegel isst das Kind in 5 Tagen?",\n      "options": [\n        "8 Schokoriegel",\n        "10 Schokoriegel",\n        "12 Schokoriegel",\n        "14 Schokoriegel"\n      ],\n      "correct_option": 3\n    }\n  ]\n}'

export const ExercisePreviewPage: React.FC<ExercisePreviewPageProps> = ({
  generateExercisePromise,
  closePage,
}) => {
  // TODO change initial state back to loading
  const [status, setStatus] = useState(
    isTestingLocally ? Status.Success : Status.Loading
  )
  const { strings } = useInstanceData()

  const [currentExerciseIndex /*setCurrentExerciseIndex*/] = useState(0)

  // TODO change it to null before prod
  // const [exerciseData, setExerciseData] = useState(exerciseTestData)
  const [exerciseData /*setExerciseData*/] = useState('')
  const editorData = useMemo<null>(
    () => /*convertAiGeneratedDataToEditorData(exerciseData)*/ null,
    [exerciseData]
  )

  console.log('EditorData: ', editorData)

  const generateExercise = useCallback(() => {
    if (isTestingLocally) {
      return
    }

    setStatus(Status.Loading)

    // setTimeout(() => {
    //   setExerciseData(exerciseTestData)
    //   setStatus(Status.Success)
    // }, 3500)
    generateExercisePromise
      .then(() => {
        //console.log('returned data: ', { data })
        //setExerciseData(data)
        setStatus(Status.Success)
      })
      .catch((error) => {
        console.error('Failed to load exercise data:', error)
        setStatus(Status.Error)
      })
  }, [generateExercisePromise])

  useEffect(() => {
    if (isTestingLocally) {
      return
    }

    generateExercise()
  }, [generateExercise])

  return (
    <div className="bg-background-gray fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center">
      <CloseButton
        onClick={closePage}
        title={strings.ai.exerciseGeneration.preview.closePreviewTitle}
        className="absolute right-2 top-2"
      />

      {status === Status.Loading && (
        <div className="mb-6 flex items-center justify-center">
          <h1 className="font-semibold text-black">
            {strings.ai.exerciseGeneration.preview.loadingHeading}
          </h1>
        </div>
      )}

      <div className="relative h-1/2 w-1/2 overflow-y-auto rounded-xl bg-white p-8">
        {status === Status.Loading && <Skeleton />}
        {status === Status.Success && (
          <div>
            <ErrorBoundary>
              {
                editorData &&
                  editorData[currentExerciseIndex] &&
                  null /*<Exercise
                  node={editorData[currentExerciseIndex]}
                  renderNested={(value, ...prefix) =>
                    renderNested(value, [], prefix)
                  }
                  path={[]}
                  // If we don't add a key here and force reconciliation, the
                  // solution upon clicking "next" will be selected!
                  key={currentExerciseIndex}
                />*/
              }
            </ErrorBoundary>
          </div>
        )}
        {status === Status.Error && <div>Failed to load data.</div>}
      </div>

      {/*editorData?.length > 1 && (
        <div className="mt-4 flex w-1/2 justify-between">
          {currentExerciseIndex > 0 && (
            <button
              className="mb-2 self-end rounded bg-brand-700 px-2 py-1 text-white"
              onClick={() =>
                setCurrentExerciseIndex((prev) => Math.max(0, prev - 1))
              }
            >
              {strings.ai.exerciseGeneration.previousButton}
            </button>
          )}

          {currentExerciseIndex < editorData.length - 1 && (
            <button
              className="mb-2 ml-auto self-end rounded bg-brand-700 px-2 py-1 text-white"
              onClick={() =>
                setCurrentExerciseIndex((prev) =>
                  Math.min(editorData.length - 1, prev + 1)
                )
              }
            >
              {strings.ai.exerciseGeneration.nextButton}
            </button>
            )}
        </div>
            )*/}

      <div className="mt-8 flex w-1/2 flex-col items-end space-y-2">
        <button className="self-end rounded bg-brand-700 px-6 py-2 text-white">
          {strings.ai.exerciseGeneration.preview.publishExercise}
        </button>
        <button className="flex items-center text-brand-700">
          <FaIcon icon={faPencilAlt} className="mr-2" />

          {strings.ai.exerciseGeneration.preview.editExerciseInEditor}
        </button>
        <button
          className="flex items-center text-brand-700"
          onClick={generateExercise}
        >
          <FaIcon icon={faRefresh} className="mr-2" />
          {strings.ai.exerciseGeneration.preview.regenerate}
        </button>
      </div>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className="relative h-full">
      <div className="flex animate-pulse flex-col space-y-4">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="mt-6 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mt-6 h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <ExerciseGenerationLoadingSparkles className=" h-24 w-24 animate-pulse" />
      </div>
    </div>
  )
}
