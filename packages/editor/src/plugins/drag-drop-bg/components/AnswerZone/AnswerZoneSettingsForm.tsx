import { faClone, faTrashCan } from '@fortawesome/free-regular-svg-icons'

import type { answerZoneType } from '../../types.js'
import { FaIcon } from '@/components/fa-icon'

interface AnswerZoneSettingsFormProps {
  answerZone: answerZoneType
  onDuplicate: () => void
  onDelete: () => void
}

export function AnswerZoneSettingsForm({
  answerZone,
  onDuplicate,
  onDelete,
}: AnswerZoneSettingsFormProps) {
  const initialSettings = {
    name: answerZone?.name.value,
    visible: answerZone?.layout.visible.value,
    height: answerZone?.layout.height.value,
    width: answerZone?.layout.width.value,
    lockedAspectRatio: true,
  }

  if (!answerZone) return null

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
            onChange={(e) => {
              const newName = e.target.value
              answerZone.name.set(newName)
            }}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
        </div>
      </label>

      <label className="mb-2 flex items-center">
        Visible
        <input
          defaultChecked={initialSettings.visible}
          onChange={(e) => {
            const newVisible = e.target.value
            answerZone.layout.visible.set(Boolean(newVisible))
          }}
          type="checkbox"
          className="ml-auto rounded border border-gray-300 bg-orange-100"
        />
      </label>

      <label className="mb-2 block">
        Größe der Zone manuell festlegen
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            defaultValue={initialSettings.height}
            onChange={(e) => {
              const newHeight = parseInt(e.target.value)
              answerZone.layout.height.set(newHeight)
            }}
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
          <span className="self-center">x</span>
          <input
            type="number"
            defaultValue={initialSettings.width}
            onChange={(e) => {
              const newWidth = parseInt(e.target.value)
              answerZone.layout.width.set(newWidth)
            }}
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
