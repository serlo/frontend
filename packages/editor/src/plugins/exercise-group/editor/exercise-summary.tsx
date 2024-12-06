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
    { title: 'Interaktive Aufgabe 1' },
    { title: 'Interaktive Aufgabe 2' },
    { title: 'Interaktive Aufgabe 3' },
  ]

  const checkboxes = [
    'Musterlösung anzeigen',
    'Bewertungskriterien anzeigen',
    'Lösungsstrategie anzeigen',
    'Schreibassistenz zur Verfügung stellen',
    'adaptive Hilfestellungen und Feedback aktivieren',
  ]

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-12 shadow-lg">
          <button
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 hover:bg-blue-300"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <FaIcon icon={faXmark} className="h-4 text-blue-600" />
          </button>

          <h2 className="mb-1 text-center text-lg font-semibold">
            Zusammenfassung Lernschritt 8
          </h2>
          <p className="mb-6 text-center text-sm text-gray-600">
            20 Minuten Bearbeitungszeit | 3 Wiederholungen
          </p>

          <div className="space-y-4">
            <div>
              <p className="mb-1 font-semibold">
                {exercises[currentExercise - 1].title}
              </p>
              <ul className="space-y-3">
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
                      className="h-5 w-5 accent-blue-500"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-6 flex justify-center space-x-2">
            {exercises.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExercise(index + 1)}
                className={`h-3 w-3 rounded-full ${
                  currentExercise === index + 1
                    ? 'bg-blue-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            className="ml-auto mt-6 flex items-center justify-center space-x-6 rounded bg-blue-500 px-8 py-4 text-white hover:bg-blue-600"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-lg font-medium leading-none">
              Fertigstellen
            </span>
            <div className="relative">
              <FaIcon
                icon={faCheck}
                className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-3xl"
              />
            </div>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
