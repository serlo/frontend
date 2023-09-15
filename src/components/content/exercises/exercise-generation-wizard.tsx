import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { AuthorToolsData } from '@/components/user-tools/foldout-author-menus/author-tools'

export interface ExerciseGenerationWizardProps {
  // TODO only require the props that are actually needed!
  data: AuthorToolsData
}

interface WizardPageProps {
  onNext: () => void
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
> = ({ data }) => {
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

  const [selectedGradeOrAge, setSelectedGradeOrAge] = useState<'grade' | 'age'>(
    'grade'
  )
  const [gradeOrAgeValue, setGradeOrAgeValue] = useState<string>('5')

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

  return (
    // Remove bottom padding as the modal itself already has decent spacing there
    <div className="space-y-4 p-4 pb-0">
      {currentPage === 1 && (
        <Subject
          onNext={handleNext}
          subject={subject}
          setSubject={setSubject}
          defaultSubject={defaultSubject}
        />
      )}
      {currentPage === 2 && (
        <Topic
          onNext={handleNext}
          topic={topic}
          setTopic={setTopic}
          defaultTopic={defaultTopic}
        />
      )}
      {currentPage === 3 && (
        <GradeOrAverageAge
          selected={selectedGradeOrAge}
          setSelected={setSelectedGradeOrAge}
          value={gradeOrAgeValue}
          setValue={setGradeOrAgeValue}
          onNext={handleNext}
        />
      )}
      {currentPage === 4 && (
        <ExerciseType
          exerciseType={exerciseType}
          setExerciseType={setExerciseType}
          numberOfSubtasks={numberOfSubtasks}
          setNumberOfSubtasks={setNumberOfSubtasks}
          onNext={handleNext}
        />
      )}
      {currentPage === 5 && (
        <Difficulty
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          learningGoal={learningGoal}
          setLearningGoal={setLearningGoal}
          onNext={handleNext}
        />
      )}
      {currentPage === 6 && (
        <PriorKnowledge
          priorKnowledge={priorKnowledge}
          setPriorKnowledge={setPriorKnowledge}
          onNext={handleNext}
        />
      )}
      {currentPage === 7 && (
        <Summary
          subject={subject}
          topic={topic}
          grade={gradeOrAgeValue || 5}
          exerciseType={exerciseType || ''}
          numberOfSubtasks={numberOfSubtasks}
          difficulty={difficulty || ''}
          learningGoal={learningGoal}
          priorKnowledge={priorKnowledge}
          onEdit={(page) => setCurrentPage(page)} // assuming setCurrentPage sets the current page
        />
      )}

      <NavigationFooter
        currentPage={currentPage}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={() => {
          // TODO
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
    defaultSubject: string | null
    subject: string
    setSubject: (subject: string) => void
  }
> = ({ onNext, subject, setSubject, defaultSubject }) => {
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

  return (
    <div className="flex flex-col">
      <p className="mb-4 mt-8 text-xl">
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
    defaultTopic: string | null
    topic: string
    setTopic: (topic: string) => void
  }
> = ({ onNext, topic, setTopic, defaultTopic }) => {
  const [selectedRadio, setSelectedRadio] = useState<string>(
    defaultTopic ? (defaultTopic === topic ? defaultTopic : 'custom') : 'custom'
  )

  const focusRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedRadio === 'custom' && focusRef.current) {
      focusRef.current.focus()
    }
  }, [selectedRadio])

  return (
    <div className="flex flex-col">
      <p className="mb-4 mt-8 text-xl">
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
        <label htmlFor="customTopic" className="ml-2">
          Other topic:
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

interface GradeOrAverageAgeProps {
  selected: 'grade' | 'age'
  setSelected: (value: 'grade' | 'age') => void
  value: string
  setValue: (value: string) => void
}

const GradeOrAverageAge: React.FC<WizardPageProps & GradeOrAverageAgeProps> = ({
  selected,
  setSelected,
  value,
  setValue,
  onNext,
}) => {
  const focusRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selected === 'age' && focusRef.current) {
      focusRef.current.focus()
    }
  }, [selected])

  return (
    <div className="flex flex-col">
      <p className="mb-4 mt-8 text-xl">
        Which <b>grade</b> or <b>average age</b> do the students have?
      </p>

      <div className="flex items-center">
        <input
          type="radio"
          id="grade"
          name="gradeOrAge"
          value="grade"
          checked={selected === 'grade'}
          onChange={() => setSelected('grade')}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label htmlFor="grade" className="ml-2">
          Grade:
        </label>
        <select
          disabled={selected !== 'grade'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="ml-2 rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        >
          {['5', '6', '7', '8', '9', '10', '11', '12', '13', 'University'].map(
            (grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="age"
          name="gradeOrAge"
          value="age"
          checked={selected === 'age'}
          onChange={() => {
            setValue('')
            setSelected('age')
          }}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label htmlFor="age" className="ml-2">
          Average age:
        </label>
        <input
          type="number"
          disabled={selected !== 'age'}
          value={selected === 'age' ? value : ''}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700"
          placeholder="Enter average age"
          ref={focusRef}
        />
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
      <p className="mb-4 mt-8 text-xl">
        What <b>exercise type</b> are you interested in?
      </p>

      <div className="mb-4 flex items-center">
        <label htmlFor="exerciseTypeDropdown" className="mr-2">
          Exercise type:
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

      <p className="mb-4 mt-8 text-xl">
        Should there be <b>subtasks</b>?
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
        <label htmlFor="noSubtasks" className="ml-2">
          No
        </label>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="hasSubtasks"
          name="subtasks"
          value="yes"
          checked={hasSubtasks}
          onChange={() => setHasSubtasks(true)}
          className="text-brand-700 focus:ring-lightblue"
        />
        <label htmlFor="hasSubtasks" className="ml-2">
          Yes:
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
}) => {
  return (
    <div className="flex flex-col">
      <p className="mb-4 mt-8 text-xl">
        What is the <b>difficulty level</b> of the exercise?
      </p>

      <div className="mb-4 flex items-center">
        <label htmlFor="difficultyDropdown" className="mr-2">
          Difficulty:
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

      <p className="mb-4 mt-8 text-xl">
        What is the <b>learning goal</b> of the exercise?
      </p>
      <div className="flex items-center">
        <label htmlFor="learningGoal" className="mr-2">
          Learning goal:
        </label>
        <input
          type="text"
          id="learningGoal"
          value={learningGoal}
          onChange={(e) => setLearningGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 w-96 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700" // w-96 gives it enough width for a sentence
          placeholder="E.g., Understand the basics of division"
        />
      </div>
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
}) => {
  return (
    <div className="flex flex-col">
      <p className="mb-4 mt-8 text-xl">
        What is the <b>prior knowledge</b> that the students should have?
      </p>

      <div className="flex items-center">
        <label htmlFor="priorKnowledge" className="mr-2">
          Prior Knowledge:
        </label>
        <input
          type="text"
          id="priorKnowledge"
          value={priorKnowledge}
          onChange={(e) => setPriorKnowledge(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="ml-2 w-96 rounded-md border border-lightblue p-2 pl-2 focus:border-lightblue focus:outline-brand-700" // w-96 provides enough width for a sentence or a list of topics
          placeholder="E.g., Basic arithmetic, fundamentals of algebra"
        />
      </div>
    </div>
  )
}

interface SummaryProps {
  subject: string
  topic: string
  grade: number | string
  exerciseType: string
  numberOfSubtasks: number
  difficulty: string
  learningGoal: string
  priorKnowledge: string
  onEdit: (page: number) => void
}

const Summary: React.FC<SummaryProps> = ({
  subject,
  topic,
  grade,
  exerciseType,
  numberOfSubtasks,
  difficulty,
  learningGoal,
  priorKnowledge,
  onEdit,
}) => {
  return (
    <div className="mt-16 flex flex-col">
      <h1 className="mb-4 mt-8 text-xl">Summary</h1>

      <div className="mb-2 flex items-center justify-between">
        <span>Subject:</span>
        <button onClick={() => onEdit(1)} className="underline">
          {subject}
        </button>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span>Topic:</span>
        <button onClick={() => onEdit(2)} className="underline">
          {topic}
        </button>
      </div>

      <label className="mb-2 block">Grade:</label>
      <select
        defaultValue={grade.toString()}
        className="mb-2 w-1/3 rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
      >
        {/* Here, you can add your options, I'll just add a placeholder */}
        <option value="8">8</option>
        {/* Add other grade options */}
      </select>

      <label className="mb-2 block">Exercise type:</label>
      <select
        defaultValue={exerciseType}
        className="mb-2 w-1/3 rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
      >
        {/* Here, you can add your exercise type options, I'll just add a placeholder */}
        <option value="Single Choice">Single Choice</option>
        {/* Add other exercise types */}
      </select>

      <div className="mb-2 flex items-center justify-between">
        <span>Subtasks:</span>
        <div>
          <input
            type="radio"
            id="noSubtasks"
            name="subtasks"
            checked={numberOfSubtasks === 0}
          />
          <label htmlFor="noSubtasks" className="ml-2">
            No
          </label>
          <input
            type="radio"
            id="yesSubtasks"
            name="subtasks"
            checked={numberOfSubtasks > 0}
          />
          <label htmlFor="yesSubtasks" className="ml-2">
            Yes
          </label>
          {/* Here, you can add an input for the number of subtasks if "Yes" is selected */}
        </div>
      </div>

      <label className="mb-2 block">Difficulty:</label>
      <select
        defaultValue={difficulty}
        className="mb-2 w-1/3 rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
      >
        <option value="Easy">Easy</option>
        {/* Add other difficulty options */}
      </select>

      <label className="mb-2 block">Learning goal:</label>
      <textarea
        value={learningGoal}
        className="mb-2 h-20 w-full rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        readOnly
      />

      <label className="mb-2 block">Prior knowledge:</label>
      <textarea
        value={priorKnowledge}
        className="mb-2 h-20 w-full rounded-md border border-lightblue p-2 focus:border-lightblue focus:outline-brand-700"
        readOnly
      />
    </div>
  )
}
