import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { AuthorToolsData } from '@/components/user-tools/foldout-author-menus/author-tools'
import { MenuButton, MenuItem } from './menu-button'

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
    // When page 3 is visited for the first time, we update the title
    // immediately
    if (currentPage === 3 && !canUpdateTitle) {
      setCanUpdateTitle(true)
    }

    if (canUpdateTitle) {
      const newTitle =
        'Aufgabenerstellung mit KI: ' +
        subject.charAt(0).toUpperCase() +
        subject.slice(1) +
        ' - ' +
        topic

      setTitle(newTitle)
    }
  }, [topic, subject, setTitle, canUpdateTitle, currentPage])

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
    <div className="flex max-h-[80vh] flex-col gap-y-7 overflow-y-auto p-4 pb-0">
      {isSummary && <h1 className="mt-4 text-left font-bold">Summary</h1>}
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

      <NavigationFooter
        currentPage={currentPage}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={async () => {
          console.log("Let's generate exercise", {
            subject,
            topic,
            gradeOrAgeValue,
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
            gradeOrAgeValue,
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

const NavigationFooter: React.FC<{
  currentPage: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
}> = ({ currentPage, onNext, onPrev, onSubmit }) => {
  return (
    <div className="relative mt-4 flex flex-col items-center justify-between">
      {currentPage === 7 ? (
        <button
          className="mb-2 self-end rounded bg-brand-700 px-4 py-2 text-white"
          onClick={onSubmit}
        >
          Generate exercises
        </button>
      ) : (
        <button
          className="mb-2 self-end rounded bg-brand-700 px-4 py-2 text-white"
          onClick={onNext}
        >
          Next
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

const Subject: React.FC<
  WizardPageProps & {
    jumpToPage: (page: number) => void
    defaultSubject: string | null
    subject: string
    setSubject: (subject: string) => void
  }
> = ({
  isSummary,
  onNext,
  jumpToPage,
  subject,
  setSubject,
  defaultSubject,
}) => {
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
          Subject
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
        Which <b>subject</b> would you like to create an exercise for?
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
          Other subject:
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
          placeholder="Enter custom subject"
          ref={focusRef}
        />
      </div>
    </div>
  )
}

const Topic: React.FC<
  WizardPageProps & {
    jumpToPage: (page: number) => void
    isSummary: boolean
    defaultTopic: string | null
    topic: string
    setTopic: (topic: string) => void
  }
> = ({ onNext, jumpToPage, isSummary, topic, setTopic, defaultTopic }) => {
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
          Topic
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
        About which <b>topic</b> would you like to generate exercises?
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
          Other topic
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
          placeholder="Enter custom topic"
          ref={focusRef}
        />
      </div>
    </div>
  )
}

interface GradeProps {
  grade: string
  setGrade: (grade: string) => void
}

const Grade: React.FC<WizardPageProps & GradeProps> = ({
  grade: selectedGrade,
  setGrade,
  isSummary,
}) => {
  const grades = ['5', '6', '7', '8', '9', '10', '11', '12', '13', 'University']

  return (
    <div className={`flex ${isSummary ? 'flex-row' : 'flex-col'} `}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          Which <b>grade</b> are the students in?
        </p>
      )}

      <div className={`${isSummary ? '' : 'mb-8'} flex items-center`}>
        <label htmlFor="grade" className="font-semibold text-brand-700">
          Grade
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

interface ExerciseTypeProps {
  exerciseType: string | null
  setExerciseType: (type: string | null) => void
  numberOfSubtasks: number
  setNumberOfSubtasks: (num: number) => void
}

const ExerciseType: React.FC<WizardPageProps & ExerciseTypeProps> = ({
  exerciseType,
  setExerciseType,
  numberOfSubtasks,
  setNumberOfSubtasks,
  onNext,
  isSummary,
}) => {
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
          What <b>exercise type</b> are you interested in?
        </p>
      )}

      <div className="flex items-center">
        <label
          htmlFor="exerciseTypeDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          Exercise type
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
          <option value="Solution with 1 word">Solution with 1 word</option>
          <option value="Solution with 1 number">Solution with 1 number</option>
        </select>
      </div>

      <p
        className={`${isSummary ? 'mt-7' : 'mb-4 mt-8'} text-lg text-brand-700`}
      >
        {isSummary ? (
          <span className="font-semibold">Subtasks</span>
        ) : (
          <span>
            Should there be <b>subtasks</b>?
          </span>
        )}
      </p>
      <div className="mt-2 flex items-center">
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
          No
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
          Yes
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
          placeholder="Number of subtasks"
          ref={focusRef}
        />
      </div>
    </div>
  )
}

interface DifficultyProps {
  difficulty: string | null
  setDifficulty: (level: string | null) => void
  learningGoal: string
  setLearningGoal: (goal: string) => void
}

const Difficulty: React.FC<WizardPageProps & DifficultyProps> = ({
  difficulty,
  setDifficulty,
  learningGoal,
  setLearningGoal,
  onNext,
  isSummary,
}) => {
  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          What is the <b>difficulty level</b> of the exercise and learning goal?
        </p>
      )}

      <div className="mb-7 flex items-center">
        <label
          htmlFor="difficultyDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          Difficulty
        </label>
        <select
          id="difficultyDropdown"
          value={difficulty || ''}
          onChange={(e) => setDifficulty(e.target.value)}
          className="rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        >
          <option value="">Choose an option</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <label htmlFor="learningGoal" className="font-semibold text-brand-700">
        Learning goal
      </label>
      <textarea
        id="learningGoal"
        value={learningGoal}
        onChange={(e) => setLearningGoal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onNext()
          }
        }}
        className="resize-none rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
        placeholder="E.g., Understand the basics of division"
      />
    </div>
  )
}

interface PriorKnowledgeProps {
  priorKnowledge: string
  setPriorKnowledge: (knowledge: string) => void
}

const PriorKnowledge: React.FC<WizardPageProps & PriorKnowledgeProps> = ({
  priorKnowledge,
  setPriorKnowledge,
  onNext,
  isSummary,
}) => {
  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          What is the <b>prior knowledge</b> that the students should have?
        </p>
      )}

      <label htmlFor="priorKnowledge" className="font-semibold text-brand-700">
        Prior Knowledge
      </label>
      <textarea
        id="priorKnowledge"
        value={priorKnowledge}
        onChange={(e) => setPriorKnowledge(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onNext()
          }
        }}
        className="resize-none rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
        placeholder="E.g., Basic arithmetic, fundamentals of algebra"
      />
    </div>
  )
}
