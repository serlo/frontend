import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import NextAdapterPages from 'next-query-params/pages'
import React, { useState } from 'react'
import { TransformWrapper } from 'react-zoom-pan-pinch'
import { QueryParamProvider } from 'use-query-params'

import { Extra1 } from '../components/pages/lernpfad_prototype/exercises/extra1'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import {
  initialExercisesData,
  localStorageKey,
} from '@/components/pages/lernpfad_prototype/const'
import { Extra2 } from '@/components/pages/lernpfad_prototype/exercises/extra2'
import { Intro } from '@/components/pages/lernpfad_prototype/exercises/intro'
import { RecapEasy } from '@/components/pages/lernpfad_prototype/exercises/recap_easy'
import { RecapHard } from '@/components/pages/lernpfad_prototype/exercises/recap_hard'
import { Reflection } from '@/components/pages/lernpfad_prototype/exercises/reflection'
import { Rewrite } from '@/components/pages/lernpfad_prototype/exercises/rewrite'
import { WritingEasy } from '@/components/pages/lernpfad_prototype/exercises/writing_easy'
import { WritingHard } from '@/components/pages/lernpfad_prototype/exercises/writing_hard'
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

const exercisesContentMap: Record<
  ExerciseId,
  (props: ExerciseProps) => React.ReactElement
> = {
  intro: (props) => <Intro {...props} />,
  extra1: (props) => <Extra1 {...props} />,
  recap_easy: (props) => <RecapEasy {...props} />,
  recap_hard: (props) => <RecapHard {...props} />,
  writing_easy: (props) => <WritingEasy {...props} />,
  writing_hard: (props) => <WritingHard {...props} />,
  rewrite: (props) => <Rewrite {...props} />,
  extra2: (props) => <Extra2 {...props} />,
  reflection: (props) => <Reflection {...props} />,
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
    activeExercise === null ? null : exercisesContentMap[activeExercise]

  const showExercise = isExerciseShown && activeExercise && ExerciseComponent
  return (
    <>
      {showExercise ? (
        <div className="absolute inset-0 z-10 overflow-y-scroll bg-white">
          <ExerciseComponent
            id={activeExercise}
            data={exercises[activeExercise]}
            onBackToMapClick={handleBackToMapClick}
            onSubmitClick={handleExerciseSubmitClick}
            onNextExerciseClick={handleNextExerciseClick}
          />
        </div>
      ) : null}
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

    if (exercises[id].type === 'start') {
      setIsExerciseShown(true)
      return
    }

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
