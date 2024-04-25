import { faClone, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'

import {
  alignLabelStyle,
  buttonStyle,
  checkboxStyle,
  containerStyle,
  iconStyle,
  inputStyle,
  labelStyle,
  sizeContainerStyle,
  spanStyle,
} from '../../styles'
import type { answerZoneType } from '../../types'
import { FaIcon } from '@/components/fa-icon'

interface AnswerZoneSettingsFormProps {
  answerZone: answerZoneType
  onDuplicate: () => void
  onChange: (id: string, settings: any) => void
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
    <div style={containerStyle}>
      <button onClick={onDuplicate} style={buttonStyle}>
        <FaIcon icon={faClone} style={iconStyle} />
        Zone duplizieren
      </button>

      <label style={alignLabelStyle}>
        Visible
        <input
          checked={settings.visible}
          onClick={() => handleInputChange('visible', !settings.visible)}
          type="checkbox"
          style={checkboxStyle}
        />
      </label>

      <label style={labelStyle}>
        Größe der Zone manuell festlegen
        <div style={sizeContainerStyle}>
          <input
            type="number"
            value={settings.height}
            onChange={(e) =>
              handleInputChange('height', parseInt(e.target.value))
            }
            style={inputStyle}
          />
          <span style={spanStyle}>x</span>
          <input
            type="number"
            value={settings.width}
            onChange={(e) =>
              handleInputChange('width', parseInt(e.target.value))
            }
            style={inputStyle}
          />
        </div>
      </label>

      <label style={alignLabelStyle}>
        Automatisches Ausrichten
        <input type="checkbox" style={checkboxStyle} />
      </label>

      <button onClick={onDelete} style={buttonStyle}>
        <FaIcon icon={faTrashCan} style={iconStyle} />
        Zone löschen
      </button>
    </div>
  )
}
