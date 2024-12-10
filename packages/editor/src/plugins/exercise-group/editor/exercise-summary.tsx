import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'

import { FaIcon } from '../../../editor-ui/fa-icon'

interface ExerciseSummaryProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function ExerciseSummary({ isOpen, setIsOpen }: ExerciseSummaryProps) {
  const [currentExercise, setCurrentExercise] = useState(1)

  const exercises = [
    { title: 'Interaktive Aufgabe (a)' },
    { title: 'Interaktive Aufgabe (b)' },
    { title: 'Interaktive Aufgabe (c)' },
  ]

  const checkboxes = [
    'Musterlösung anzeigen',
    'Bewertungskriterien anzeigen',
    'Lösungshinweise anzeigen',
    'Schreibassistenz zur Verfügung stellen',
    'Adaptive Hilfestellungen und Feedback aktivieren',
  ]

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-12 shadow-lg">
          <button
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-editor-primary-200 hover:bg-editor-primary-300"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <FaIcon icon={faXmark} className="text-editor-primary-600 h-4" />
          </button>

          <h2 className="mb-1 text-center text-lg font-semibold">
            Zusammenfassung Lernpfad-Schritt 'Writing your opinion'
          </h2>
          <p className="mb-6 text-center text-sm text-gray-600">
            20 Minuten Bearbeitungszeit | 3 Wiederholungen
          </p>

          <div className="space-y-4">
            <div>
              <p className="my-2 cursor-pointer rounded-md bg-editor-primary-100 px-2 py-1 font-semibold hover:bg-editor-primary-200">
                <span className="mr-2">▾</span> {exercises[0].title}
              </p>
              <ul className="mx-2 space-y-3">
                {checkboxes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-gray-800"
                  >
                    {item}
                    <input
                      type="checkbox"
                      checked={index !== 0 && index !== 3}
                      readOnly
                      className="h-5 w-5 accent-editor-primary-200"
                    />
                  </li>
                ))}
              </ul>
              <p className="my-2 cursor-pointer rounded-md bg-editor-primary-100 px-2 py-1 font-semibold hover:bg-editor-primary-200">
                <span className="mr-2">▸</span>
                {exercises[1].title}
              </p>
              <p className="my-2 cursor-pointer rounded-md bg-editor-primary-100 px-2 py-1 font-semibold hover:bg-editor-primary-200">
                <span className="mr-2">▸</span>
                {exercises[2].title}
              </p>
            </div>
          </div>

          {/* Pagination Dots */}
          {/* <div className="mt-6 flex justify-center space-x-2">
            {exercises.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExercise(index + 1)}
                className={`h-3 w-3 rounded-full ${
                  currentExercise === index + 1
                    ? 'bg-editor-primary-200'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div> */}

          <button
            className="ml-auto mr-2 mt-8 flex flex-row items-center justify-center gap-3 rounded-md bg-editor-primary-100 px-16 py-4 pb-4 pt-4 font-bold hover:cursor-pointer hover:bg-editor-primary-200"
            onClick={() => setIsOpen(false)}
          >
            <span className="">Fertigstellen</span>
            <div className="">
              <FaIcon icon={faCheck} />
            </div>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
