import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import { ExerciseSummary } from './exercise-summary'
import { FaIcon } from '../../../editor-ui/fa-icon'

export function FertigStellenButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button
        className="mb-4 ml-auto mr-2 flex items-center justify-center rounded-md bg-editor-primary-100 px-16 py-4 pb-4 pt-4 font-bold hover:cursor-pointer hover:bg-editor-primary-200"
        onClick={() => setIsModalOpen(true)}
      >
        Material fertigstellen
        <FaIcon icon={faArrowRight} className="ml-2 h-5" />
      </button>
      <ExerciseSummary isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}
