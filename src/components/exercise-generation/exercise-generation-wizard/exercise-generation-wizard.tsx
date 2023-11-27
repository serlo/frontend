import React, { useEffect, useState } from 'react'

import { Difficulty, ExerciseGenerationDifficulty } from './difficulty'
import { ExerciseType } from './exercise-type'
import { generateExercisePrompt } from './generate-prompt'
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
    topic: string
  }
  isExerciseGroup: boolean
  handleTransitionToExercisePage: () => void
  prompt: string
  setPrompt: (newPrompt: string) => void
}

export function ExerciseGenerationWizard({
  data,
  isExerciseGroup,
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

  const isSummary = currentPage === 6

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
