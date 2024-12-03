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

function Content() {
  const [exercises, setExercises] = useState<Record<string, boolean>>({
    '1': false,
    '2': false,
  })
  const [isExerciseShown, setIsExerciseShown] = useState(false)
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  return isExerciseShown ? (
    <Exercise
      id={activeExercise}
      onBackToMapClick={handleBackToMapClick}
      onSubmitClick={handleExerciseSubmitClick}
    />
  ) : (
    <>
      <TransformWrapper initialScale={0.75} minScale={0.75} centerOnInit>
        <Map exercises={exercises} onExerciseClick={handleExerciseClick} />
      </TransformWrapper>
      <ModalWithCloseButton
        isOpen={showModal}
        setIsOpen={setShowModal}
        title="Writing an Opinion – step by step"
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
    </>
  )

  function handleExerciseClick(id: string) {
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

  function handleExerciseSubmitClick(id: string) {
    setIsExerciseShown(false)
    setActiveExercise(null)
    setExercises((exercises) => ({ ...exercises, [id]: true }))
  }
}

function Map({
  exercises,
  onExerciseClick,
}: {
  exercises: Record<string, boolean>
  onExerciseClick: (id: string) => void
}) {
  const { zoomToElement } = useControls()

  useEffect(() => {
    // Find first exercise that's not done yet
    const idToZoomTo = Object.keys(exercises).find(
      (key) => exercises[key] === false
    )
    // Exit if all exercises are done
    if (!idToZoomTo) return
    // Zoom to the first exercise that's not done yet
    const timer = setTimeout(() => zoomToElement(idToZoomTo, 2), 1500)
    // Clear timeout on onmount
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            'left-[431px] top-[227px] h-[58px] w-[67px]'
          )}
          onClick={() => onExerciseClick('1')}
        >
          1
        </button>

        <button
          id="2"
          className={cn(
            getExerciseClasses('2'),
            'left-[431px] top-[379px] h-[59px] w-[67px]'
          )}
          onClick={() => onExerciseClick('2')}
        >
          2
        </button>
      </div>
    </TransformComponent>
  )

  function getExerciseClasses(id: string) {
    return cn(
      'absolute cursor-pointer',
      isExerciseDone(id) ? 'bg-editor-primary-300' : 'bg-brand-300'
    )
  }

  function isExerciseDone(id: string) {
    return exercises[id] === true
  }
}

function Exercise({
  id,
  onBackToMapClick,
  onSubmitClick,
}: {
  id: string | null
  onBackToMapClick: () => void
  onSubmitClick: (id: string) => void
}) {
  if (id === null) return null

  return (
    <div className="h-screen w-screen">
      <button className="absolute left-4 top-4" onClick={onBackToMapClick}>
        Back to map
      </button>

      <div className="flex h-full flex-col items-center justify-center">
        <h1>Exercise {id}</h1>
        <button
          className="serlo-button-edit-primary"
          onClick={() => onSubmitClick(id)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
