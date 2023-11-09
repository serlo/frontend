import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'

import { Difficulty } from './exercise-generation-wizard/difficulty'
import { ExerciseType } from './exercise-generation-wizard/exercise-type'
import {
  ExerciseGenerationDifficulty,
  generateExercisePrompt,
} from './exercise-generation-wizard/generate-prompt'
import { Grade } from './exercise-generation-wizard/grade'
import { PriorKnowledge } from './exercise-generation-wizard/prior-knowledge'
import { Prompt } from './exercise-generation-wizard/prompt'
import { Subject } from './exercise-generation-wizard/subject'
import { Topic } from './exercise-generation-wizard/topic'
import { FaIcon } from '@/components/fa-icon'
import { AuthorToolsData } from '@/components/user-tools/foldout-author-menus/author-tools'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { isProduction } from '@/helper/is-production'
import { submitEvent } from '@/helper/submit-event'

export interface ExerciseGenerationWizardProps {
  // TODO only require the props that are actually needed!
  data: AuthorToolsData

  setTitle: (title: string) => void

  handleTransitionToExercisePage: () => void
  prompt: string
  setPrompt: (newPrompt: string) => void
}

// Extracts topic from title. E.g Aufgaben zum Dreisatz => Dreisatz
function extractTopicFromTitle(title: string | undefined): string | null {
  if (!title) {
    return null
  }

  const match = title.match(/Aufgaben zu(?:m|r)? (.+)/)
  return match ? match[1].trim() : null
}

function useScrollToTopOfSummaryWhenInView(currentPage: number) {
  const topOfSummaryRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (topOfSummaryRef && topOfSummaryRef.current && currentPage === 7) {
      topOfSummaryRef.current.scrollTo(0, 0)
    }
  }, [currentPage])

  return topOfSummaryRef
}

export const ExerciseGenerationWizard: React.FC<
  ExerciseGenerationWizardProps
> = (props) => {
  const { data, setTitle, handleTransitionToExercisePage, setPrompt, prompt } =
    props

  // Only logged in users can see this
  const { strings } = useLoggedInData() as LoggedInData

  // TODO show limitation message before page one. We may need to handle this
  // one within the generate-exercise-button.tsx component and either render a
  // second modal or conditionally hide the close button as there is only one
  // CTA and no close button on the limitation page.
  // const [showLimitationMessage, setShowLimitationMessage] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  // Extract subject from alias. E.g /mathe/66809/aufgaben-zum-dreisatz => mathe
  const defaultSubject = data.alias?.split('/')[1] || null
  // TODO find a more resilient way to get the taxonomy and subject
  const [subject, setSubject] = useState<string>(defaultSubject || '')

  const defaultTopic = extractTopicFromTitle(data?.title)
  const [topic, setTopic] = useState<string>(defaultTopic || '')

  const [canUpdateTitle, setCanUpdateTitle] = useState<boolean>(false)

  const topOfSummaryRef = useScrollToTopOfSummaryWhenInView(currentPage)

  useEffect(() => {
    // Page 3 needs to be visited once before we update the title. When going
    // back to page 1 or 2, we are updating it live as the user is typing.
    if (currentPage === 3 && !canUpdateTitle) {
      setCanUpdateTitle(true)
    }

    if (canUpdateTitle) {
      const newTitle =
        strings.ai.exerciseGeneration.modalTitleWithTaxonomy +
        subject.charAt(0).toUpperCase() +
        subject.slice(1) +
        ' - ' +
        topic

      setTitle(newTitle)
    }
  }, [topic, subject, setTitle, canUpdateTitle, currentPage, strings])

  const [grade, setGrade] = useState<string>('5')

  const [exerciseType, setExerciseType] = useState<string | null>(null)
  const [numberOfSubtasks, setNumberOfSubtasks] = useState<number>(0)

  const [difficulty, setDifficulty] =
    useState<ExerciseGenerationDifficulty | null>(null)
  const [learningGoal, setLearningGoal] = useState<string>('')

  const [priorKnowledge, setPriorKnowledge] = useState<string>('')

  useEffect(() => {
    const newPrompt = generateExercisePrompt({
      subject,
      topic,
      grade,
      exerciseType: exerciseType || 'single choice',
      numberOfSubtasks,
      learningGoal,
      difficulty: difficulty || 'low',
      priorKnowledge,
    })
    setPrompt(newPrompt)
  }, [
    subject,
    topic,
    grade,
    exerciseType,
    numberOfSubtasks,
    learningGoal,
    difficulty,
    priorKnowledge,
    setPrompt,
  ])

  const handleNext = () => {
    if (currentPage < 7) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const isSummary = currentPage === 7

  return (
    // Remove bottom padding as the modal itself already has decent spacing there
    <div className="flex h-full flex-grow flex-col overflow-y-auto p-4 pb-0">
      {isSummary && (
        <h1 className="mb-4 text-left font-bold">
          {strings.ai.exerciseGeneration.summary}
        </h1>
      )}
      {/* Scrollable content */}
      <div
        className="mb-7 flex flex-grow flex-col gap-y-7 overflow-y-auto"
        ref={topOfSummaryRef}
      >
        {(isSummary || currentPage === 1) && (
          <Subject
            onNext={handleNext}
            isSummary={isSummary}
            jumpToPage={setCurrentPage}
            subject={subject}
            setSubject={setSubject}
            defaultSubject={defaultSubject}
          />
        )}
        {(isSummary || currentPage === 2) && (
          <Topic
            onNext={handleNext}
            jumpToPage={setCurrentPage}
            isSummary={isSummary}
            topic={topic}
            setTopic={setTopic}
            defaultTopic={defaultTopic}
          />
        )}
        {(isSummary || currentPage === 3) && (
          <Grade
            grade={grade}
            setGrade={setGrade}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 4) && (
          <ExerciseType
            exerciseType={exerciseType}
            setExerciseType={setExerciseType}
            numberOfSubtasks={numberOfSubtasks}
            setNumberOfSubtasks={setNumberOfSubtasks}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 5) && (
          <Difficulty
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            learningGoal={learningGoal}
            setLearningGoal={setLearningGoal}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 6) && (
          <PriorKnowledge
            priorKnowledge={priorKnowledge}
            setPriorKnowledge={setPriorKnowledge}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {isSummary && !isProduction && (
          <Prompt prompt={prompt} setPrompt={setPrompt} />
        )}
      </div>

      <NavigationFooter
        currentPage={currentPage}
        generatesMultipleExercises={numberOfSubtasks > 0}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={() => {
          console.log("Let's generate exercise", {
            subject,
            topic,
            grade,
            exerciseType,
            numberOfSubtasks,
            difficulty,
            learningGoal,
            priorKnowledge,
          })

          handleTransitionToExercisePage()
        }}
      />
    </div>
  )
}

interface NavigationFooterProps {
  currentPage: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  generatesMultipleExercises: boolean
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({
  generatesMultipleExercises,
  currentPage,
  onNext,
  onPrev,
  onSubmit,
}) => {
  const { strings } = useLoggedInData() as LoggedInData

  useEffect(() => {
    submitEvent('exercise-generation-wizard-page: ' + currentPage)
  }, [currentPage])

  return (
    <div className="relative mt-auto flex flex-col items-center justify-between">
      {currentPage === 7 ? (
        <button
          className="mb-2 self-end rounded bg-brand-700 px-4 py-2 text-white"
          onClick={onSubmit}
        >
          {generatesMultipleExercises
            ? strings.ai.exerciseGeneration.generateExercisesButton
            : strings.ai.exerciseGeneration.generateExerciseButton}
        </button>
      ) : (
        <button
          className="mb-2 self-end rounded bg-brand-700 px-4 py-2 text-white"
          onClick={onNext}
        >
          {strings.ai.exerciseGeneration.nextButton}
        </button>
      )}

      <div className="mt-4 flex w-full items-center justify-center">
        {currentPage !== 1 && (
          <button onClick={onPrev} className="cursor-pointer text-brand-700">
            <FaIcon icon={faAngleLeft} />
          </button>
        )}

        <span className="mx-4">{currentPage} / 7</span>

        {currentPage !== 7 && (
          <button
            onClick={onNext}
            className={`text-brand-700 ${
              currentPage === 7
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
          >
            <FaIcon icon={faAngleRight} />
          </button>
        )}
      </div>
    </div>
  )
}
