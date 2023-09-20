import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'

import { MenuButton, MenuItem } from './menu-button'
import { FaIcon } from '@/components/fa-icon'
import { AuthorToolsData } from '@/components/user-tools/foldout-author-menus/author-tools'
import { useInstanceData } from '@/contexts/instance-context'

export interface ExerciseGenerationWizardProps {
  // TODO only require the props that are actually needed!
  data: AuthorToolsData

  setTitle: (title: string) => void
}

interface WizardPageProps {
  onNext: () => void

  isSummary: boolean
}

// Extracts topic from title. E.g Aufgaben zum Dreisatz => Dreisatz
const extractTopicFromTitle = (title: string | undefined): string | null => {
  if (!title) {
    return null
  }

  const match = title.match(/Aufgaben zu(?:m|r)? (.+)/)
  return match ? match[1].trim() : null
}

export const ExerciseGenerationWizard: React.FC<
  ExerciseGenerationWizardProps
> = ({ data, setTitle }) => {
  const { strings } = useInstanceData()

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

  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [learningGoal, setLearningGoal] = useState<string>('')

  const [priorKnowledge, setPriorKnowledge] = useState<string>('')

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
      <div className="mb-7 flex flex-grow flex-col gap-y-7 overflow-y-auto">
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
      </div>

      <NavigationFooter
        currentPage={currentPage}
        generatesMultipleExercises={numberOfSubtasks > 0}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={async () => {
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

          const baseUrl = 'http://localhost:8080/exercises'

          const queryParams = new URLSearchParams({
            subject,
            topic,
            grade,
            exerciseType: exerciseType || '',
            numberOfSubtasks: numberOfSubtasks.toString(),
            difficulty: difficulty || '',
            learningGoal,
            priorKnowledge,
          })

          const urlWithParams = `${baseUrl}?${queryParams.toString()}`

          try {
            const response = await fetch(urlWithParams)

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // TODO eslint-disable-next-line
            const data = await response.json()

            console.log(data)
          } catch (error) {
            console.error('Error while fetching:', error)
          }
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
  const { strings } = useInstanceData()
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

interface SubjectProps extends WizardPageProps {
  jumpToPage: (page: number) => void
  defaultSubject: string | null
  subject: string
  setSubject: (subject: string) => void
}

const Subject: React.FC<SubjectProps> = ({
  isSummary,
  onNext,
  jumpToPage,
  subject,
  setSubject,
  defaultSubject,
}) => {
  const { strings } = useInstanceData()
  const [selectedRadio, setSelectedRadio] = useState<string>(
    defaultSubject
      ? defaultSubject === subject
        ? defaultSubject
        : 'custom'
      : 'custom'
  )

  const focusRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedRadio === 'custom' && focusRef.current) {
      focusRef.current.focus()
    }
  }, [selectedRadio])

  if (isSummary) {
    return (
      <div className="flex items-center justify-start text-brand-700">
        <span onClick={() => jumpToPage(1)} className="mr-4 font-semibold">
          {strings.ai.exerciseGeneration.subject.defaultLabel}
        </span>
        <button onClick={() => jumpToPage(1)} className="underline">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">
        {strings.ai.exerciseGeneration.subject.title}
        {/* TODO how to replicate the <b> tag? */}
        {/* Which <b>subject</b> would you like to create an exercise for? */}
      </p>
      {defaultSubject ? (
        <div className="flex items-center">
          <input
            type="radio"
            id="defaultSubject"
            name="subject"
            value={defaultSubject}
            checked={selectedRadio === defaultSubject}
            onChange={() => {
              setSelectedRadio(defaultSubject)
              setSubject(defaultSubject)
            }}
            className="text-brand-700 focus:ring-lightblue"
          />
          <label htmlFor="defaultSubject" className="ml-2">
            {defaultSubject.charAt(0).toUpperCase() + defaultSubject.slice(1)}
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="customSubject"
          name="subject"
          value="custom"
          checked={selectedRadio === 'custom'}
          onChange={() => {
            // we reset the subject when the user selects the custom subject
            setSubject('')
            setSelectedRadio('custom')
          }}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label htmlFor="customSubject" className="ml-2">
          {strings.ai.exerciseGeneration.subject.otherSubjectLabel}
        </label>
        <input
          type="text"
          disabled={selectedRadio !== 'custom'}
          value={selectedRadio === 'custom' ? subject : ''}
          onChange={(e) => setSubject(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
          placeholder={
            strings.ai.exerciseGeneration.subject.customSubjectPlaceholder
          }
          ref={focusRef}
        />
      </div>
    </div>
  )
}

interface TopicProps extends WizardPageProps {
  jumpToPage: (page: number) => void
  isSummary: boolean
  defaultTopic: string | null
  topic: string
  setTopic: (topic: string) => void
}
const Topic: React.FC<TopicProps> = ({
  onNext,
  jumpToPage,
  isSummary,
  topic,
  setTopic,
  defaultTopic,
}) => {
  const { strings } = useInstanceData()

  const [selectedRadio, setSelectedRadio] = useState<string>(
    defaultTopic ? (defaultTopic === topic ? defaultTopic : 'custom') : 'custom'
  )

  const focusRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedRadio === 'custom' && focusRef.current) {
      focusRef.current.focus()
    }
  }, [selectedRadio])

  if (isSummary) {
    return (
      <div className="flex items-center justify-start text-brand-700">
        <span onClick={() => jumpToPage(2)} className="mr-4 font-semibold">
          {strings.ai.exerciseGeneration.topic.defaultLabel}
        </span>
        <button onClick={() => jumpToPage(2)} className="underline">
          {topic}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">
        {strings.ai.exerciseGeneration.topic.title}
      </p>
      {defaultTopic ? (
        <div className="flex items-center">
          <input
            type="radio"
            id="defaultTopic"
            name="topic"
            value={defaultTopic}
            checked={selectedRadio === defaultTopic}
            onChange={() => {
              setSelectedRadio(defaultTopic)
              setTopic(defaultTopic)
            }}
            className="text-brand-700 focus:ring-lightblue"
          />
          <label htmlFor="defaultTopic" className="ml-2">
            {defaultTopic.charAt(0).toUpperCase() + defaultTopic.slice(1)}
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="customTopic"
          name="topic"
          value="custom"
          checked={selectedRadio === 'custom'}
          onChange={() => {
            // we reset the topic when the user selects the custom topic
            setTopic('')
            setSelectedRadio('custom')
          }}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label htmlFor="customTopic" className="ml-2 ">
          {strings.ai.exerciseGeneration.topic.otherTopicLabel}
        </label>
        <input
          type="text"
          disabled={selectedRadio !== 'custom'}
          value={selectedRadio === 'custom' ? topic : ''}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
          placeholder={
            strings.ai.exerciseGeneration.topic.customTopicPlaceholder
          }
          ref={focusRef}
        />
      </div>
    </div>
  )
}

interface GradeProps extends WizardPageProps {
  grade: string
  setGrade: (grade: string) => void
}

const Grade: React.FC<GradeProps> = ({
  grade: selectedGrade,
  setGrade,
  isSummary,
}) => {
  const { strings } = useInstanceData()
  const grades = [
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    strings.ai.exerciseGeneration.grade.university,
  ]

  return (
    <div className={`flex ${isSummary ? 'flex-row' : 'flex-col'} `}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          {strings.ai.exerciseGeneration.grade.title}
        </p>
      )}

      <div className={`${isSummary ? '' : 'mb-8'} flex items-center`}>
        <label htmlFor="grade" className="font-semibold text-brand-700">
          {strings.ai.exerciseGeneration.grade.label}
        </label>

        <MenuButton
          value={selectedGrade}
          onChange={(event) => setGrade(event.target.value)}
        >
          {grades.map((grade) => (
            <MenuItem
              key={grade}
              value={grade}
              isSelected={selectedGrade === grade}
            >
              {grade}
            </MenuItem>
          ))}
        </MenuButton>
      </div>
    </div>
  )
}

interface ExerciseTypeProps extends WizardPageProps {
  exerciseType: string | null
  setExerciseType: (type: string | null) => void
  numberOfSubtasks: number
  setNumberOfSubtasks: (num: number) => void
}

const ExerciseType: React.FC<ExerciseTypeProps> = ({
  exerciseType,
  setExerciseType,
  numberOfSubtasks,
  setNumberOfSubtasks,
  onNext,
  isSummary,
}) => {
  const { strings } = useInstanceData()
  const [hasSubtasks, setHasSubtasks] = useState<boolean>(
    numberOfSubtasks !== 0
  )
  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasSubtasks && focusRef.current) {
      focusRef.current.focus()
    }
  }, [hasSubtasks])

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {strings.ai.exerciseGeneration.exerciseType.title}
        </p>
      )}

      <div className="flex items-center">
        <label
          htmlFor="exerciseTypeDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {strings.ai.exerciseGeneration.exerciseType.label}
        </label>
        <select
          id="exerciseTypeDropdown"
          value={exerciseType || ''}
          onChange={(e) => setExerciseType(e.target.value)}
          className="rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        >
          <option value="">Choose an option</option>
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Single Choice">Single Choice</option>
          <option value="Solution with 1 number">Solution with 1 number</option>
        </select>
      </div>

      <p className="mb-4 mt-7 text-lg text-brand-700">
        {isSummary ? (
          <span className="text-base font-semibold">
            {strings.ai.exerciseGeneration.exerciseType.subtasksTitleSummary}
          </span>
        ) : (
          <span>
            {strings.ai.exerciseGeneration.exerciseType.subtasksTitle}
          </span>
        )}
      </p>
      <div className="flex items-center">
        <input
          type="radio"
          id="noSubtasks"
          name="subtasks"
          value="no"
          checked={!hasSubtasks}
          onChange={() => {
            setHasSubtasks(false)
            setNumberOfSubtasks(0)
          }}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label
          htmlFor="noSubtasks"
          className={`ml-2 ${
            !hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {strings.ai.exerciseGeneration.exerciseType.noSubtasks}
        </label>
      </div>

      <div className="mt-2 flex items-center">
        <input
          type="radio"
          id="hasSubtasks"
          name="subtasks"
          value="yes"
          checked={hasSubtasks}
          onChange={() => setHasSubtasks(true)}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label
          htmlFor="hasSubtasks"
          className={`ml-2 ${
            hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {strings.ai.exerciseGeneration.exerciseType.yesSubtasks}
        </label>
        <input
          type="number"
          disabled={!hasSubtasks}
          value={hasSubtasks ? numberOfSubtasks.toString() : ''}
          onChange={(e) => setNumberOfSubtasks(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
          placeholder={
            strings.ai.exerciseGeneration.exerciseType
              .numberOfSubtasksPlaceholder
          }
          ref={focusRef}
        />
      </div>
    </div>
  )
}

interface DifficultyProps extends WizardPageProps {
  difficulty: string | null
  setDifficulty: (level: string | null) => void
  learningGoal: string
  setLearningGoal: (goal: string) => void
}

const Difficulty: React.FC<DifficultyProps> = ({
  difficulty,
  setDifficulty,
  learningGoal,
  setLearningGoal,
  onNext,
  isSummary,
}) => {
  const { strings } = useInstanceData()

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {strings.ai.exerciseGeneration.difficulty.title}
        </p>
      )}

      <div className="mb-7 flex items-center">
        <label
          htmlFor="difficultyDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {strings.ai.exerciseGeneration.difficulty.label}
        </label>
        <select
          id="difficultyDropdown"
          value={difficulty || ''}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        >
          <option value="">
            {strings.ai.exerciseGeneration.difficulty.chooseOption}
          </option>
          <option value="easy">
            {strings.ai.exerciseGeneration.difficulty.easy}
          </option>
          <option value="medium">
            {strings.ai.exerciseGeneration.difficulty.medium}
          </option>
          <option value="hard">
            {strings.ai.exerciseGeneration.difficulty.hard}
          </option>
        </select>
      </div>

      <label htmlFor="learningGoal" className="font-semibold text-brand-700">
        {strings.ai.exerciseGeneration.difficulty.learningGoalLabel}
      </label>
      {!isSummary && (
        <p className="my-2 text-sm font-thin text-lightgray">
          {strings.ai.exerciseGeneration.difficulty.learningGoalExample}
        </p>
      )}
      <textarea
        id="learningGoal"
        value={learningGoal}
        onChange={(e) => setLearningGoal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onNext()
          }
        }}
        className="w-11/12 resize-none rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
        placeholder={
          strings.ai.exerciseGeneration.difficulty.learningGoalPlaceholder
        }
      />
    </div>
  )
}

interface PriorKnowledgeProps extends WizardPageProps {
  priorKnowledge: string
  setPriorKnowledge: (knowledge: string) => void
}

const PriorKnowledge: React.FC<PriorKnowledgeProps> = ({
  priorKnowledge,
  setPriorKnowledge,
  onNext,
  isSummary,
}) => {
  const { strings } = useInstanceData()

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {strings.ai.exerciseGeneration.priorKnowledge.title}
        </p>
      )}

      <label htmlFor="priorKnowledge" className="font-semibold text-brand-700">
        {strings.ai.exerciseGeneration.priorKnowledge.label}
      </label>
      {!isSummary && (
        <p className="my-2 text-sm font-thin text-lightgray">
          {strings.ai.exerciseGeneration.priorKnowledge.example}
        </p>
      )}
      <textarea
        id="priorKnowledge"
        value={priorKnowledge}
        onChange={(e) => setPriorKnowledge(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onNext()
          }
        }}
        className="w-11/12 resize-none rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
        placeholder={strings.ai.exerciseGeneration.priorKnowledge.placeholder}
      />
    </div>
  )
}
