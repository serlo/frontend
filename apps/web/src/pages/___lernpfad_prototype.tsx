import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import NextAdapterPages from 'next-query-params/pages'
import React, { useState } from 'react'
import { TransformWrapper } from 'react-zoom-pan-pinch'
import { QueryParamProvider } from 'use-query-params'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import {
  initialExercisesData,
  localStorageKey,
} from '@/components/pages/lernpfad_prototype/const'
import { Exercise } from '@/components/pages/lernpfad_prototype/exercise'
import { Exercise1 } from '@/components/pages/lernpfad_prototype/exercises/exercise-1'
import { Map } from '@/components/pages/lernpfad_prototype/map'
import { Modal } from '@/components/pages/lernpfad_prototype/modal'
import type {
  ExerciseId,
  ExerciseProps,
  ExercisesRecord,
} from '@/components/pages/lernpfad_prototype/types'
import { useLocalStorage } from '@/components/pages/lernpfad_prototype/use-local-storage'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

const exercisesMap: Record<
  ExerciseId,
  (props: ExerciseProps) => React.ReactElement
> = {
  '1': (props) => <Exercise1 {...props} />,
  '2': (props) => <Exercise {...props} />,
  '3': (props) => <Exercise {...props} />,
  '4': (props) => <Exercise {...props} />,
}

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
  const [exercises, setExercises] = useLocalStorage<ExercisesRecord>(
    localStorageKey,
    initialExercisesData
  )
  const [isExerciseShown, setIsExerciseShown] = useState(false)
  const [activeExercise, setActiveExercise] = useState<ExerciseId | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  editorRenderers.init(createRenderers())

  const ExerciseComponent =
    activeExercise === null ? null : exercisesMap[activeExercise]

  return isExerciseShown && activeExercise && ExerciseComponent ? (
    <ExerciseComponent
      id={activeExercise}
      data={exercises[activeExercise]}
      onBackToMapClick={handleBackToMapClick}
      onSubmitClick={handleExerciseSubmitClick}
      onNextExerciseClick={handleNextExerciseClick}
    />
  ) : (
    <>
      <TransformWrapper disablePadding>
        <Map exercises={exercises} onExerciseClick={handleExerciseClick} />
      </TransformWrapper>
      {activeExercise ? (
        <Modal
          title={exercises[activeExercise].title}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onConfirmClick={handleModalConfirmClick}
        />
      ) : null}
    </>
  )

  function handleExerciseClick(id: ExerciseId) {
    setActiveExercise(id)
    setIsModalOpen(true)
  }

  function handleModalConfirmClick() {
    setIsExerciseShown(true)
    setIsModalOpen(false)
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
    if (exercises[id].nextExercises === null) setIsExerciseShown(false)
  }

  function handleNextExerciseClick(id: ExerciseId) {
    setActiveExercise(id)
  }
}
