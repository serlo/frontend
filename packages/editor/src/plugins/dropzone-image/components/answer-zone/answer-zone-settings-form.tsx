import { faClone, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

import type { AnswerZoneState } from '../../types'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AnswerZoneSettingsFormProps {
  answerZone: AnswerZoneState
  onDuplicate: () => void
  onDelete: () => void
}

/**
 *
 * This component renders a settings form for configuring an answer zone.
 * It allows users to duplicate, delete, and adjust settings such as
 * name, visibility, height, and width of the answer zone.
 *
 */
export function AnswerZoneSettingsForm({
  answerZone,
  onDuplicate,
  onDelete,
}: AnswerZoneSettingsFormProps): JSX.Element | null {
  const pluginStrings = useEditorStrings().plugins.dropzoneImage

  if (!answerZone) return null

  const initialSettings = {
    name: answerZone.name.value,
    height: answerZone.layout.height.value,
    width: answerZone.layout.width.value,
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
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center rounded-lg bg-white p-2">
      <label className="mb-4 w-full">
        {pluginStrings.answerZone.description}
        <div className="mt-2 flex justify-center">
          <input
            type="text"
            data-qa="answer-zone-settings-form-name-input"
            defaultValue={initialSettings.name}
            onChange={(e) => answerZone.name.set(e.target.value)}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
        </div>
      </label>

      <label className="mb-4 w-full">
        {pluginStrings.answerZone.sizeLabel}
        <div className="mt-2 flex  gap-2">
          <input
            type="number"
            defaultValue={initialSettings.height}
            onChange={handleInputChange((value: string) =>
              answerZone.layout.height.set(parseInt(value))
            )}
            className="w-24 rounded border border-gray-300 bg-orange-100 p-2 text-center"
          />
          <span className="self-center">x</span>
          <input
            type="number"
            defaultValue={initialSettings.width}
            onChange={handleInputChange((value: string) =>
              answerZone.layout.width.set(parseInt(value))
            )}
            className="w-24 rounded border border-gray-300 bg-orange-100 p-2 text-center"
          />
        </div>
      </label>

      <div className="flex w-full gap-4">
        <button
          data-qa="answer-zone-settings-form-duplicate-button"
          onClick={onDuplicate}
          className="flex flex-1 cursor-pointer items-center justify-center rounded border-none bg-orange-100 p-2"
        >
          <FaIcon icon={faClone} className="mr-2" />
          {pluginStrings.answerZone.duplicate}
        </button>

        <button
          data-qa="answer-zone-settings-form-delete-button"
          onClick={onDelete}
          className="flex flex-1 cursor-pointer items-center justify-center rounded border-none bg-orange-100 p-2"
        >
          <FaIcon icon={faTrashCan} className="mr-2" />
          {pluginStrings.answerZone.delete}
        </button>
      </div>
    </div>
  )
}
