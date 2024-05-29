/* eslint-disable @typescript-eslint/unbound-method */
import { faClone, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

import type { answerZoneType } from '../../types.js'
import { FaIcon } from '@/components/fa-icon'

interface AnswerZoneSettingsFormProps {
  answerZone: answerZoneType
  onDuplicate: () => void
  onDelete: () => void
}

/**
 * AnswerZoneSettingsForm component
 *
 * This component renders a settings form for configuring an answer zone.
 * It allows users to duplicate, delete, and adjust settings such as
 * name, visibility, height, and width of the answer zone.
 *
 * @param {AnswerZoneSettingsFormProps} props - The properties for the component.
 * @returns {JSX.Element | null} - The rendered component or null if no answer zone is provided.
 */
export function AnswerZoneSettingsForm({
  answerZone,
  onDuplicate,
  onDelete,
}: AnswerZoneSettingsFormProps): JSX.Element | null {
  if (!answerZone) return null

  const initialSettings = {
    name: answerZone.name.value,
    visible: answerZone.layout.visible.value,
    height: answerZone.layout.height.value,
    width: answerZone.layout.width.value,
    lockedAspectRatio: true,
  }

  const handleInputChange =
    (setter: (value: any) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      setter(value)
    }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
      <button
        onClick={onDuplicate}
        className="flex cursor-pointer items-center rounded border-none bg-orange-100 p-2"
      >
        <FaIcon icon={faClone} className="mr-2" />
        Zone duplizieren
      </button>

      <label className="mb-2 block">
        Beschriftung (optional)
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            defaultValue={initialSettings.name}
            onChange={handleInputChange(answerZone.name.set)}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
        </div>
      </label>

      <label className="mb-2 flex items-center">
        Sichtbar
        <input
          type="checkbox"
          defaultChecked={initialSettings.visible}
          onChange={handleInputChange(answerZone.layout.visible.set)}
          className="ml-auto rounded border border-gray-300 bg-orange-100"
        />
      </label>

      <label className="mb-2 block">
        Größe der Zone manuell festlegen
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            defaultValue={initialSettings.height}
            onChange={handleInputChange((value: string) =>
              answerZone.layout.height.set(parseInt(value))
            )}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
          <span className="self-center">x</span>
          <input
            type="number"
            defaultValue={initialSettings.width}
            onChange={handleInputChange((value: string) =>
              answerZone.layout.width.set(parseInt(value))
            )}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
        </div>
      </label>

      <label className="mb-2 flex items-center">
        Automatisches Ausrichten
        <input
          type="checkbox"
          className="ml-auto rounded border border-gray-300 bg-orange-100"
        />
      </label>

      <button
        onClick={onDelete}
        className="flex cursor-pointer items-center rounded border-none bg-orange-100 p-2"
      >
        <FaIcon icon={faTrashCan} className="mr-2" />
        Zone löschen
      </button>
    </div>
  )
}
