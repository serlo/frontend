import React, { useEffect, useState } from 'react'

import { Difficulty } from './difficulty'
import { ExerciseType } from './exercise-type'
import {
  ExerciseGenerationDifficulty,
  generateExercisePrompt,
} from './generate-prompt'
import { Grade } from './grade'
import { PriorKnowledge } from './prior-knowledge'
import { Prompt } from './prompt'
import { Topic } from './topic'
import { WizardFooter } from './wizard-footer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { isProduction } from '@/helper/is-production'

export interface ExerciseGenerationWizardProps {
  data: {
    subject: string
    title: string
    topic: string
  }
  isExerciseGroup: boolean
  setTitle: (title: string) => void
  handleTransitionToExercisePage: () => void
  prompt: string
  setPrompt: (newPrompt: string) => void
}

export function ExerciseGenerationWizard({
  data,
  isExerciseGroup,
  setTitle,
  handleTransitionToExercisePage,
  setPrompt,
  prompt,
}: ExerciseGenerationWizardProps) {
  const { subject, topic: defaultTopic } = data

  // Only logged in users can see this
  const { exerciseGeneration: exerciseGenerationString } =
    useLoggedInData()!.strings.ai

  const [currentPage, setCurrentPage] = useState(1)

  const [topic, setTopic] = useState<string>(defaultTopic || '')

  const [canUpdateTitle, setCanUpdateTitle] = useState<boolean>(false)

  const isSummary = currentPage === 6

  useEffect(() => {
    // Page 2 needs to be visited once before we update the title. When going
    // back to page 1, we are updating it live as the user is typing.
    if (currentPage === 2 && !canUpdateTitle) {
      setCanUpdateTitle(true)
    }

    if (canUpdateTitle) {
      const newTitle =
        exerciseGenerationString.modalTitleWithTaxonomy +
        subject.charAt(0).toUpperCase() +
        subject.slice(1) +
        ' - ' +
        topic

      setTitle(newTitle)
    }
  }, [
    topic,
    subject,
    setTitle,
    canUpdateTitle,
    currentPage,
    exerciseGenerationString,
  ])

  const [grade, setGrade] = useState<string>('5')

  const [exerciseType, setExerciseType] = useState<string | null>(
    'single choice'
  )
  const [numberOfSubtasks, setNumberOfSubtasks] = useState<number>(2)

  const [difficulty, setDifficulty] =
    useState<ExerciseGenerationDifficulty | null>('low')
  const [learningGoal, setLearningGoal] = useState<string>('')

  const [priorKnowledge, setPriorKnowledge] = useState<string>('')

  useEffect(() => {
    const newPrompt = generateExercisePrompt({
      subject,
      topic,
      grade,
      exerciseType: exerciseType || 'single choice',
      numberOfSubtasks: isExerciseGroup ? numberOfSubtasks : 0,
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
    isExerciseGroup,
  ])

  const handleNext = () => {
    if (currentPage < 6) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    // Remove bottom padding as the modal itself already has decent spacing there
    <div className="flex h-full flex-grow flex-col overflow-y-auto p-4 pb-0">
      {isSummary && (
        <h1 className="mb-4 text-left font-bold">
          {exerciseGenerationString.summary}
        </h1>
      )}
      {/* Scrollable content */}
      <div className="mb-7 flex flex-grow flex-col gap-y-7 overflow-y-auto">
        {(isSummary || currentPage === 1) && (
          <Topic
            onNext={handleNext}
            jumpToPage={setCurrentPage}
            isSummary={isSummary}
            topic={topic}
            setTopic={setTopic}
            defaultTopic={defaultTopic}
          />
        )}
        {(isSummary || currentPage === 2) && (
          <Grade
            grade={grade}
            setGrade={setGrade}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 3) && (
          <ExerciseType
            isExerciseGroup={isExerciseGroup}
            exerciseType={exerciseType}
            setExerciseType={setExerciseType}
            numberOfSubtasks={numberOfSubtasks}
            setNumberOfSubtasks={setNumberOfSubtasks}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 4) && (
          <Difficulty
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            learningGoal={learningGoal}
            setLearningGoal={setLearningGoal}
            onNext={handleNext}
            isSummary={isSummary}
          />
        )}
        {(isSummary || currentPage === 5) && (
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

      <WizardFooter
        currentPage={currentPage}
        generatesMultipleExercises={numberOfSubtasks > 0}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={() => {
          // eslint-disable-next-line no-console
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
