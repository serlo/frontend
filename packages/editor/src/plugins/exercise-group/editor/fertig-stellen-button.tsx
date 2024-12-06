import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

import { ExerciseSummary } from './exercise-summary'
import { FaIcon } from '../../../editor-ui/fa-icon'

export function FertigStellenButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button
        className="mb-4 ml-auto mr-2 flex items-center justify-center rounded bg-blue-500 px-8 py-2 text-white "
        onClick={() => setIsModalOpen(true)}
      >
        Material fertigstellen
        <FaIcon icon={faArrowRight} className="ml-2 h-5" />
      </button>
      <ExerciseSummary isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}
