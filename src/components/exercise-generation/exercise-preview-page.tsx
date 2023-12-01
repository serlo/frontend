import {
  faPencilAlt,
  faRefresh,
  faCaretLeft,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
import ExerciseGenerationLoadingSparkles from 'public/_assets/img/exercise/sparkles.svg'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ChatCompletionMessageParam,
  ExecutePromptStatus,
  useExecuteAIPrompt,
} from './exercise-generation-wizard/execute-ai-prompt'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getDefaultLicense } from '@/data/licenses/licenses-helpers'
import {
  ExercisePreviewFromAi,
  convertAiGeneratedScExerciseToEditorDocument,
  transformEditorDataToExerciseGroup,
} from '@/helper/ai-generated-exercises/data-conversion'
import { ExpectedLLMOutputType } from '@/helper/ai-generated-exercises/decoders'
import { cn } from '@/helper/cn'
import { ErrorBoundary } from '@/helper/error-boundary'
import { EditorProps } from '@/serlo-editor/core'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorTemplateExerciseGroupDocument } from '@/serlo-editor/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor/types/template-plugin-type'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

interface ExercisePreviewPageProps {
  prompt: string
  closePage: () => void
  setEditorState: (editorState: EditorProps['initialState']) => void
}

export function ExercisePreviewPage({
  prompt,
  closePage,
  setEditorState,
}: ExercisePreviewPageProps) {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    {
      role: 'user',
      content: prompt,
    },
  ])
  editorRenderers.init(createRenderers())

  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollContentDown = () => {
    if (contentRef.current) {
      // Scroll down by a certain amount, e.g., 100px. Adjust as needed.
      contentRef.current.scrollBy({ top: 100, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const checkOverflow = () => {
      const current = contentRef.current
      if (current) {
        // Show the button if the content's scroll height is greater than its client height
        setShowScrollButton(current.scrollHeight > current.clientHeight)
      }
    }

    // Check for overflow when the component mounts
    checkOverflow()

    // You might want to check again on window resize
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [])
  const [isScrolled, setIsScrolled] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > 10) // Adjust '10' based on your needs
      }
    }

    const scrollableElement = contentRef.current
    scrollableElement?.addEventListener('scroll', handleScroll)

    return () => {
      scrollableElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // We want to prepend the message as upon regenerating dozens of times, the
  // context window should get automatically truncated from the start (not the
  // end).
  const prependMessage = useCallback(
    (newMessage: ChatCompletionMessageParam) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages])
    },
    []
  )

  const {
    data: exerciseData,
    errorMessage,
    setErrorMessage,
    status,
    setStatus,
    regeneratePrompt,
  } = useExecuteAIPrompt<ExpectedLLMOutputType>({
    messages,
    submitEventPrefix: 'exercise-generation-wizard-prompt-execution',
  })

  const regenerate = useCallback(() => {
    if (!exerciseData?.exercises?.[0].question) {
      regeneratePrompt()
      return
    }

    const contentOfPreviousMessage = exerciseData?.exercises
      ?.map(({ question }) => question)
      .join('|')
    const numberOfQuestions = exerciseData?.exercises?.length ?? 0

    prependMessage({
      role: 'user',
      content: `Die letzte generierte Aufgabe hatte die folgende ${
        numberOfQuestions <= 1
          ? 'Fragestellung'
          : "Fragestellungen (die Fragen sind separiert mit '|') "
      }. Bitte generiere eine andere Aufgabe und sei kreativ: ${contentOfPreviousMessage}`,
    })
  }, [prependMessage, regeneratePrompt, exerciseData?.exercises])

  const { exerciseGeneration: exGenerationStrings } =
    useLoggedInData()!.strings.ai

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

  const { licenses } = useInstanceData()
  const license = getDefaultLicense(licenses)
  const editorData = useMemo<ExercisePreviewFromAi>(() => {
    try {
      return convertAiGeneratedScExerciseToEditorDocument(exerciseData)
    } catch (error) {
      // eslint-disable-next-line no-console
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

  // eslint-disable-next-line no-console
  console.log('EditorData: ', editorData)

  const numberOfExercises = editorData?.exercises?.length ?? 0

  return (
    <ModalWithCloseButton
      isOpen
      onCloseClick={closePage}
      confirmCloseDescription={exGenerationStrings.confirmCloseDescription}
      className="fixed left-1/2 top-0 flex h-full max-h-none w-full max-w-none translate-y-0 flex-col items-center justify-center rounded-none bg-gray-100"
      extraCloseButtonClassName={cn('z-30 bg-brand-200')}
    >
      <div className="relative mt-8 flex flex-col overflow-y-auto sm:h-full sm:w-full md:h-4/5 md:w-4/5 lg:h-2/3 lg:w-2/5">
        {status === ExecutePromptStatus.Loading ? (
          <div className="mb-6 flex flex-col items-center justify-center text-center">
            <h1 className="font-semibold text-black">
              {exGenerationStrings.preview.loadingHeading}
            </h1>
            <p className="mt-2 text-gray-400">
              {exGenerationStrings.preview.patience}
            </p>
          </div>
        ) : null}

        {/* Exercises with subtasks receive their heading on top of the preview */}
        {status === ExecutePromptStatus.Success &&
        numberOfExercises > 1 &&
        exerciseData?.heading ? (
          <div className="mb-6 flex items-center justify-center text-center">
            <h1 className="text-lg font-semibold text-black">
              {exerciseData.heading}
            </h1>
          </div>
        ) : null}

        <div
          className="relative overflow-y-auto rounded-xl bg-white p-8"
          ref={contentRef}
        >
          {status === ExecutePromptStatus.Loading && <Skeleton />}
          {status === ExecutePromptStatus.Success && (
            <div>
              <ErrorBoundary
                somethingWentWrongString={
                  exGenerationStrings.somethingWentWrong
                }
              >
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
              {/* Arrow down icon, to indicate that there is more content */}
              {showScrollButton && (
                <button
                  onClick={scrollContentDown}
                  className={cn(
                    'absolute left-1/2 top-0 -translate-x-1/2 transform',
                    !isScrolled && 'hidden'
                  )}
                  aria-label="Scroll down"
                >
                  <FaIcon icon={faCaretDown} className="text-xl" />
                </button>
              )}
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

        {numberOfExercises > 1 && status === ExecutePromptStatus.Success && (
          <div className="mt-4 flex flex-wrap justify-between gap-x-2">
            {currentExerciseIndex > 0 && (
              <button
                className="mb-2 self-end rounded bg-transparent px-2 py-1 text-brand-700"
                onClick={() =>
                  setCurrentExerciseIndex((prev) => Math.max(0, prev - 1))
                }
              >
                <FaIcon icon={faCaretLeft} className="mr-2 text-sm" />

                {exGenerationStrings.previousButton}
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
                {exGenerationStrings.nextExerciseButton}
                <FaIcon icon={faCaretRight} className="ml-2 text-sm" />
              </button>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-end gap-2 mobileExt:justify-between">
          {/* Not supported for now */}
          {/* <button className="self-end rounded bg-brand-700 px-6 py-2 text-white">
          {exerciseGenerationStrings.preview.publishExercise}
        </button> */}
          <button
            className="serlo-button-light text-base"
            onClick={regenerate}
            disabled={status === ExecutePromptStatus.Loading}
          >
            <FaIcon icon={faRefresh} className="mr-2" />
            {exGenerationStrings.preview.regenerate}
          </button>
          <button
            className={cn(
              'serlo-button-blue text-base',
              status !== ExecutePromptStatus.Success &&
                'cursor-not-allowed opacity-70'
            )}
            disabled={status !== ExecutePromptStatus.Success}
            onClick={() => {
              if (editorData && editorData.exercises.length === 1) {
                setEditorState({
                  plugin: TemplatePluginType.TextExercise,
                  state: {
                    licenseId: license.id,
                    changes: '[KI generiert]: ',
                    content: JSON.stringify(editorData.exercises[0]),
                  },
                })
                closePage()
                return
              }

              const exerciseGroup: EditorTemplateExerciseGroupDocument =
                transformEditorDataToExerciseGroup(editorData, license)
              setEditorState(exerciseGroup)
              closePage()
            }}
          >
            <FaIcon icon={faPencilAlt} className="mr-2" />

            {exGenerationStrings.preview.openExerciseInEditor}
          </button>
        </div>
      </div>
    </ModalWithCloseButton>
  )
}

function Skeleton() {
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
        <ExerciseGenerationLoadingSparkles className="h-24 w-24 animate-pulse" />
      </div>
    </div>
  )
}
