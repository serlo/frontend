import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import * as confetti from 'canvas-confetti'
import NextAdapterPages from 'next-query-params/pages'
import React, { useState } from 'react'
import { TransformWrapper } from 'react-zoom-pan-pinch'
import { QueryParamProvider } from 'use-query-params'

import { Extra1 } from '../components/pages/lernpfad_prototype/exercises/extra1'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import {
  initialMapItemsData,
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
import { ForkModal } from '@/components/pages/lernpfad_prototype/fork-modal'
import { Map } from '@/components/pages/lernpfad_prototype/map'
import { MapNavigation } from '@/components/pages/lernpfad_prototype/map-navigation'
import { Modal } from '@/components/pages/lernpfad_prototype/modal'
import type {
  MapItemId,
  ExerciseProps,
  MapItemsRecord,
} from '@/components/pages/lernpfad_prototype/types'
import { useLocalStorage } from '@/components/pages/lernpfad_prototype/use-local-storage'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

const exercisesContentMap: Record<
  MapItemId,
  (props: ExerciseProps) => React.ReactElement
> = {
  intro: () => <></>,
  extra1: (props) => <Extra1 {...props} />,
  info: (props) => <Intro {...props} />,
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
  const [mapItems, setMapItems] = useLocalStorage<MapItemsRecord>(
    localStorageKey,
    initialMapItemsData
  )
  const [isExerciseShown, setIsExerciseShown] = useState(false)
  const [activeMapItem, setActiveMapItem] = useState<MapItemId | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  editorRenderers.init(createRenderers())

  const ExerciseComponent =
    activeMapItem === null ? null : exercisesContentMap[activeMapItem]

  const shouldShowExercise =
    isExerciseShown && activeMapItem && ExerciseComponent
  return (
    <>
      {shouldShowExercise && mapItems[activeMapItem].type !== 'fork' ? (
        <div className="absolute inset-0 z-10 overflow-y-scroll bg-white">
          <ExerciseComponent
            id={activeMapItem}
            data={mapItems[activeMapItem]}
            onBackToMapClick={handleBackToMapClick}
            onSubmitClick={handleExerciseSubmitClick}
          />
        </div>
      ) : null}
      <div className="pt-[100px]">
        {shouldShowExercise ? null : <MapNavigation />}
        <TransformWrapper disablePadding smooth={false}>
          <Map mapItems={mapItems} onMapItemClick={handleMapItemClick} />
        </TransformWrapper>
      </div>
      {activeMapItem && mapItems[activeMapItem].type !== 'fork' ? (
        <Modal
          exercise={mapItems[activeMapItem]}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onConfirmClick={handleModalConfirmClick}
          setStartToDone={() => {
            handleExerciseSubmitClick('intro')
            setIsModalOpen(false)
          }}
        />
      ) : activeMapItem && mapItems[activeMapItem].type === 'fork' ? (
        <ForkModal
          forkId={activeMapItem}
          fork={mapItems[activeMapItem]}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onClick={handleForkModalClick}
        />
      ) : null}
    </>
  )

  function handleMapItemClick(id: MapItemId) {
    setActiveMapItem(id)

    if (mapItems[id].type === 'info') {
      setIsExerciseShown(true)
      return
    }

    setIsModalOpen(true)
  }

  function handleModalConfirmClick() {
    setIsExerciseShown(true)
    setIsModalOpen(false)
  }

  function handleForkModalClick(forkId: MapItemId, nextExerciseId: MapItemId) {
    const newMapItems = {
      ...mapItems,
      [forkId]: { ...mapItems[forkId], done: true, choice: nextExerciseId },
    }
    setMapItems(newMapItems)
    localStorage.setItem(localStorageKey, JSON.stringify(newMapItems))
    setActiveMapItem(nextExerciseId)
    setIsExerciseShown(true)
    setIsModalOpen(false)
    // TODO: maybe path locking is needed
  }

  function handleBackToMapClick() {
    setIsExerciseShown(false)
    setActiveMapItem(null)
  }

  function handleExerciseSubmitClick(id: MapItemId) {
    const newMapItems = {
      ...mapItems,
      [id]: { ...mapItems[id], done: true },
    }
    localStorage.setItem(localStorageKey, JSON.stringify(newMapItems))

    setIsExerciseShown(false)
    setActiveMapItem(null)

    setTimeout(() => {
      setMapItems(newMapItems)

      if (id === 'intro') return
      const element = document.getElementById(id)
      if (!element) return
      const rect = element.getBoundingClientRect()
      const scrollLeft = document.documentElement.scrollLeft
      const scrollTop = document.documentElement.scrollTop

      const x = (rect.left + scrollLeft + rect.width / 2) / window.innerWidth
      const y = (rect.top + scrollTop + rect.height / 2) / window.innerHeight

      void confetti.default({ origin: { x, y } })
    }, 500)
  }
}
