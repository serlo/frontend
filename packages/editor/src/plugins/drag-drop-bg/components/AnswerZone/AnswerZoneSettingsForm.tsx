import { faClone, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'

import type { AnswerZoneSettings, answerZoneType } from '../../types.js'
import { FaIcon } from '@/components/fa-icon'

interface AnswerZoneSettingsFormProps {
  answerZone: answerZoneType
  onDuplicate: () => void
  onChange: (id: string, settings: AnswerZoneSettings) => void
  onDelete: () => void
}

export function AnswerZoneSettingsForm({
  answerZone,
  onDuplicate,
  onChange,
  onDelete,
}: AnswerZoneSettingsFormProps) {
  const initialSettings = {
    visible: answerZone?.layout.visible.value,
    height: answerZone?.layout.height.value,
    width: answerZone?.layout.width.value,
    lockedAspectRatio: true,
  }

  const answerZoneId = answerZone?.id.get()
  const [settings, setSettings] = useState(initialSettings)
  const [isFirstRun, setIsFirstRun] = useState(true)

  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false)
      return
    }
    onChange(answerZoneId, settings)
  }, [settings])

  if (!answerZone) return null

  const handleInputChange = (key: string, value: number | boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }))
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

      <label className="mb-2 flex items-center">
        Visible
        <input
          checked={settings.visible}
          onClick={() => handleInputChange('visible', !settings.visible)}
          type="checkbox"
          className="ml-auto rounded border border-gray-300 bg-orange-100"
        />
      </label>

      <label className="mb-2 block">
        Größe der Zone manuell festlegen
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            value={settings.height}
            onChange={(e) =>
              handleInputChange('height', parseInt(e.target.value))
            }
            className="w-full rounded border border-gray-300 bg-orange-100 p-2"
          />
          <span className="self-center">x</span>
          <input
            type="number"
            value={settings.width}
            onChange={(e) =>
              handleInputChange('width', parseInt(e.target.value))
            }
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
