import {
  faPencilAlt,
  faRefresh,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import ExerciseGenerationLoadingSparkles from 'public/_assets/img/exercise/exercise-generation-loading-sparkles.svg'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuthentication } from '@/auth/use-authentication'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { useEntityId } from '@/contexts/uuids-context'
import { LoggedInData } from '@/data-types'
import {
  ExpectedExerciseGroup,
  IEditorExerciseData,
  convertAiGeneratedScExerciseToEditorDocument,
  transformEditorDataToExerciseGroup,
} from '@/helper/ai-generated-exercises/data-conversion'
import { ErrorBoundary } from '@/helper/error-boundary'
import { submitEvent } from '@/helper/submit-event'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

interface ExercisePreviewPageProps {
  prompt: string
  closePage: () => void
}

enum Status {
  Loading,
  Success,
  Error,
}

// TODO remove this before production
const isTestingLocally = true

// From GPT-4 with Wolfram Alpha 😍
// const exerciseTestData = `{
//   "heading": "Dreisatz: Wie weit fährt ein Auto?",
//   "type": "single_choice",
//   "steps":
//   [
//       "Ein Auto fährt 120 Meilen in 2 Stunden. Du möchtest wissen, wie weit das Auto in 5 Stunden fahren würde.",
//       "Zuerst schreibst du die gegebenen Informationen auf: Das Auto fährt 120 Meilen in 2 Stunden.",
//       "Um die Geschwindigkeit des Autos zu finden, teilst du die zurückgelegte Entfernung durch die Zeit.",
//       "[ text{Geschwindigkeit} = frac{120 text{ Meilen}}{2 text{ Stunden}} = 60 text{ mph} ]",
//       "Jetzt weißt du, dass das Auto mit einer Geschwindigkeit von 60 mph fährt.",
//       "Um die Entfernung in 5 Stunden zu finden, multiplizierst du die Geschwindigkeit mit der Zeit.",
//       "[ text{Entfernung} = 60 text{ mph} times 5 text{ Stunden} = 300 text{ Meilen} ]",
//       "Das Auto würde also 300 Meilen in 5 Stunden fahren."
//   ],
//   "question": "Wenn ein Auto 120 Meilen in 2 Stunden fährt, wie weit würde es in 5 Stunden fahren?",
//   "options":
//   [
//       "200 Meilen",
//       "250 Meilen",
//       "300 Meilen",
//       "350 Meilen"
//   ],
//   "correct_option": 2
// }`

// const exerciseTestData =
//   '{\n  "heading": "Dreisatz",\n  "subtasks": [\n    {\n      "type": "single_choice",\n      "question": "Ein Auto fährt mit einer Geschwindigkeit von 60 km/h. Wie weit kommt das Auto in 3 Stunden?",\n      "options": [\n        "120 km",\n        "180 km",\n        "240 km",\n        "300 km"\n      ],\n      "correct_option": 2\n    },\n    {\n      "type": "single_choice",\n      "question": "Ein Kind isst 4 Schokoriegel in 2 Tagen. Wie viele Schokoriegel isst das Kind in 5 Tagen?",\n      "options": [\n        "8 Schokoriegel",\n        "10 Schokoriegel",\n        "12 Schokoriegel",\n        "14 Schokoriegel"\n      ],\n      "correct_option": 3\n    }\n  ]\n}'

interface GraphQLResponse {
  ai: {
    executePrompt: {
      success: boolean
      record: string
    }
  }
}

export const ExercisePreviewPage: React.FC<ExercisePreviewPageProps> = ({
  prompt,
  closePage,
}) => {
  const entityId = useEntityId()
  editorRenderers.init(createRenderers())

  // Needed for React StrictMode to not run the prompt twice
  const abortControllerRef = useRef<AbortController | null>(null)

  // TODO change initial state back to loading
  const [status, setStatus] = useState(
    isTestingLocally ? Status.Success : Status.Loading
  )
  // TODO change it to null before prod
  // const [exerciseData, setExerciseData] = useState(exerciseTestData)
  const [exerciseData, setExerciseData] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const auth = useAuthentication()
  const isExecutingPrompt = useRef(false)

  // TODO move all this code to the generic execute-ai-prompt file
  const generateExercise = useCallback(async () => {
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const signal = abortController.signal

    console.log('Asking GPT to generate an exercise with prompt', {
      prompt,
      auth,
    })
    try {
      isExecutingPrompt.current = true
      setStatus(Status.Loading)

      // setTimeout(() => {
      //   setExerciseData(exerciseTestData)
      //   setStatus(Status.Success)
      // }, 3500)

      const graphQlFetch = createAuthAwareGraphqlFetch<GraphQLResponse>(auth)

      if (signal?.aborted) {
        return
      }

      const query = `
        query ($prompt: String!) {
          ai {
            executePrompt(prompt: $prompt) {
              success
              record
            }
          }
        }
      `
      const variables = { prompt }

      console.log('Fetching response now!')
      submitEvent('exercise-generation-wizard-prompt-generation')
      const response = await graphQlFetch(
        JSON.stringify({ query, variables }),
        signal
      )
      console.log('Response: ', { response })
      if (response?.ai?.executePrompt?.success) {
        console.log('Exercise: ', response?.ai.executePrompt.record)
        setExerciseData(response?.ai.executePrompt.record)
        setStatus(Status.Success)
        submitEvent('exercise-generation-wizard-prompt-success')
      } else {
        setStatus(Status.Error)
        setErrorMessage('Unknown failure when generating exercise!')
        submitEvent('exercise-generation-wizard-prompt-failure')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch was successfully aborted!')
        setStatus(Status.Error)
        submitEvent('exercise-generation-wizard-prompt-execution-aborted')
        return
      }

      if (
        error instanceof SyntaxError &&
        error.message.includes("Unexpected token '<'")
      ) {
        // This indicates that the error message is HTML content, possibly a
        // server error
        setErrorMessage(
          'A parsing error occurred due to receiving unexpected content.\n\nPlease try again later.'
        )
        setStatus(Status.Error)
        submitEvent('exercise-generation-wizard-prompt-failure')
        return
      }

      if (
        error instanceof Error &&
        'response' in error &&
        error['response'] instanceof Response
      ) {
        const response: Response = error['response']

        if (response.status === 500) {
          setErrorMessage('Server error occurred. Please try again later.')
        } else {
          setErrorMessage(`Error: Received status code ${response.status}`)
        }
        setStatus(Status.Error)
        submitEvent('exercise-generation-wizard-prompt-failure')
        return
      }

      console.error('Failed to generate exercise:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error!')
      submitEvent('exercise-generation-wizard-prompt-failure')
      setStatus(Status.Error)
    } finally {
      isExecutingPrompt.current = false
    }
  }, [prompt, auth])

  useEffect(() => {
    if (isExecutingPrompt.current) {
      // Prevents StrictMode from executing the effect twice.
      return
    }

    const abortController = abortControllerRef?.current
    // Already handling the error in the generateExercise function
    generateExercise()
      .then(() => void null)
      .catch(() => void null)

    return () => {
      abortController?.abort()
    }
  }, [generateExercise])

  const { strings } = useLoggedInData() as LoggedInData

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

  const editorData = useMemo<IEditorExerciseData>(() => {
    if (!exerciseData) {
      return {
        exercises: [],
        heading: '',
      }
    }

    try {
      return convertAiGeneratedScExerciseToEditorDocument(exerciseData)
    } catch (error) {
      console.error('Error while parsing exercise data: ', error)
      setStatus(Status.Error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Unknown error while parsing!'
      )
      return {
        exercises: [],
        heading: '',
      }
    }
  }, [exerciseData])

  console.log('EditorData: ', editorData)

  const numberOfExercises = editorData?.exercises?.length ?? 0

  return (
    <ModalWithCloseButton
      isOpen
      // title="Erstellte Aufgabe im Fach Mathe (Dreisatz): Eiskugeln Preise"
      onCloseClick={closePage}
      confirmCloseDescription="Are you sure you want to close the preview? All data will be lost!"
      overwriteClassNameCompletely
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background-gray"
      closeButtonClassName="!bg-lightskyblue absolute right-2 top-2 text-black"
    >
      {status === Status.Loading && (
        <div className="mb-6 flex items-center justify-center">
          <h1 className="font-semibold text-black">
            {strings.ai.exerciseGeneration.preview.loadingHeading}
          </h1>
        </div>
      )}

      <div className="relative h-2/3 w-2/5 overflow-y-auto rounded-xl bg-white p-8">
        {status === Status.Loading && <Skeleton />}
        {status === Status.Success && (
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
        {status === Status.Error && (
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
                    'text-solution': {
                      content: JSON.stringify(
                        editorData.exercises[0].state.solution
                      ),
                    },
                  },
                })
              )
              window.location.href = `/entity/create/Exercise/${entityId}?loadFromSession=${id}`
              return
            }

            const exerciseGroup: ExpectedExerciseGroup =
              transformEditorDataToExerciseGroup(editorData)
            sessionStorage.setItem(id, JSON.stringify(exerciseGroup))

            window.location.href = `/entity/create/Exercise/${entityId}?loadFromSession=${id}`
          }}
        >
          <FaIcon icon={faPencilAlt} className="mr-2" />

          {strings.ai.exerciseGeneration.preview.openExerciseInEditor}
        </button>
        <button
          className="flex items-center text-brand-700"
          onClick={generateExercise}
          disabled={status === Status.Loading}
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
        <ExerciseGenerationLoadingSparkles className=" h-24 w-24 animate-pulse" />
      </div>
    </div>
  )
}
