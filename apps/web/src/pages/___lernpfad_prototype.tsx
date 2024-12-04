import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import NextAdapterPages from 'next-query-params/pages'
import { useEffect, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch'
import { QueryParamProvider } from 'use-query-params'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { cn } from '@/helper/cn'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      serloEntityData={{ entityId: props.id }}
    >
      <QueryParamProvider adapter={NextAdapterPages}>
        <Content />
      </QueryParamProvider>
    </FrontendClientBase>
  )
})

type ExerciseId = string
interface Exercise {
  done: boolean
  title: string
  next: ExerciseId | null
}
type ExercisesRecord = Record<ExerciseId, Exercise>

const localStorageKey = 'lernpfad_prototype'

const initialExercisesData: ExercisesRecord = {
  '1': {
    done: false,
    title: 'Exercise 1',
    next: '2',
  },
  '2': {
    done: false,
    title: 'Exercise 2',
    next: null,
  },
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item) as T)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [key])

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

function Content() {
  const [exercises, setExercises] = useLocalStorage<ExercisesRecord>(
    localStorageKey,
    initialExercisesData
  )
  const [isExerciseShown, setIsExerciseShown] = useState(false)
  const [activeExercise, setActiveExercise] = useState<ExerciseId | null>(null)
  const [showModal, setShowModal] = useState(false)

  return isExerciseShown && activeExercise ? (
    <Exercise
      id={activeExercise}
      data={exercises[activeExercise]}
      onBackToMapClick={handleBackToMapClick}
      onSubmitClick={handleExerciseSubmitClick}
    />
  ) : (
    <>
      <TransformWrapper initialScale={0.75} minScale={0.75} centerOnInit>
        <Map exercises={exercises} onExerciseClick={handleExerciseClick} />
      </TransformWrapper>
      {activeExercise ? (
        <ModalWithCloseButton
          isOpen={showModal}
          setIsOpen={setShowModal}
          title={exercises[activeExercise].title}
          extraCloseButtonClassName="bg-brand-200"
          className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
          extraTitleClassName="border-none"
        >
          <p className="serlo-p">
            <ul className="serlo-ul ml-0">
              <li>
                Diesen Lernschritt kannst du <b>drei Mal</b> vor der entgültigen
                Abgabe <b>bearbeiten</b>.
              </li>
              <li>
                Du hast <b>20 Minuten</b> Zeit.
              </li>
              <li>
                Deine Lehrkraft hat <b>Rückmeldungen aktiviert</b>
              </li>
            </ul>
          </p>
          <div className="serlo-p [&>div]:border-0 [&_button]:bg-transparent [&_button]:p-0">
            <SpoilerRenderer title={<b>Deine Bewertungskriterien</b>}>
              <ul className="serlo-ul mb-0">
                <li>
                  Textgestaltung und Sprachfluss (Formulierungen, Stuktur,
                  Verwendung von Konnektoren, eindeutige Bezüge)
                </li>
                <li>Wortschatz und Idiomatik</li>
                <li>
                  Satzbau und Grammatik (Satzmuster und damit einhergehende
                  Verständlichkeit insgesamt)
                </li>
              </ul>
            </SpoilerRenderer>
          </div>
          <div className="mx-side mb-10 flex justify-end">
            <button
              className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium"
              onClick={handleModalConfirmClick}
            >
              Los geht&apos;s
            </button>
          </div>
        </ModalWithCloseButton>
      ) : null}
    </>
  )

  function handleExerciseClick(id: ExerciseId) {
    setActiveExercise(id)
    setShowModal(true)
  }

  function handleModalConfirmClick() {
    setIsExerciseShown(true)
    setShowModal(false)
  }

  function handleBackToMapClick() {
    setIsExerciseShown(false)
    setActiveExercise(null)
  }

  function handleExerciseSubmitClick(id: ExerciseId) {
    const newExercises = {
      ...exercises,
      [id]: { ...exercises[id], done: true },
    }
    localStorage.setItem(localStorageKey, JSON.stringify(newExercises))
    setExercises(newExercises)
    if (exercises[id].next === null) setIsExerciseShown(false)
    setActiveExercise(exercises[id].next)
  }
}

function Map({
  exercises,
  onExerciseClick,
}: {
  exercises: ExercisesRecord
  onExerciseClick: (id: ExerciseId) => void
}) {
  const [initialZoomDone, setInitialZoomDone] = useState(false)
  const { zoomToElement } = useControls()

  useEffect(() => {
    if (initialZoomDone) return
    // Find first exercise that's not done yet
    const idToZoomTo = Object.keys(exercises).find(
      (key) => exercises[key].done === false
    )
    // Exit if all exercises are done
    if (!idToZoomTo) return
    // Zoom to the first exercise that's not done yet
    const timer = setTimeout(() => {
      zoomToElement(idToZoomTo, 2)
      setInitialZoomDone(true)
    }, 1500)
    // Clear timeout on onmount
    return () => clearTimeout(timer)
  }, [exercises, initialZoomDone, zoomToElement])

  return (
    <TransformComponent>
      <div
        className={cn(
          'image-section relative h-screen w-screen',
          'bg-[url(/_assets/img/prototype/game-board.svg)]',
          'bg-[length:50%] bg-center bg-no-repeat'
        )}
      >
        <button
          id="1"
          className={cn(
            getExerciseClasses('1'),
            'left-[502px] top-[233px] h-[69px] w-[79px]'
          )}
          onClick={() => onExerciseClick('1')}
        >
          1
        </button>

        <button
          id="2"
          className={cn(
            getExerciseClasses('2'),
            'left-[502px] top-[411px] h-[69px] w-[79px]'
          )}
          onClick={() => onExerciseClick('2')}
        >
          2
        </button>
      </div>
    </TransformComponent>
  )

  function getExerciseClasses(id: ExerciseId) {
    return cn(
      'absolute cursor-pointer',
      isExerciseDone(id) ? 'bg-editor-primary-300' : 'bg-brand-300'
    )
  }

  function isExerciseDone(id: ExerciseId) {
    return exercises[id].done === true
  }
}

function Exercise({
  id,
  data,
  onBackToMapClick,
  onSubmitClick,
}: {
  id: ExerciseId | null
  data: Exercise
  onBackToMapClick: () => void
  onSubmitClick: (id: ExerciseId) => void
}) {
  if (id === null) return null

  return (
    <div className="h-screen w-screen">
      <button className="absolute left-4 top-4" onClick={onBackToMapClick}>
        Back to map
      </button>

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        {data.done ? (
          <h2>Done</h2>
        ) : (
          <button
            className="serlo-button-edit-primary"
            onClick={() => onSubmitClick(id)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}
