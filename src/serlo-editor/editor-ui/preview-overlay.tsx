import clsx from 'clsx'
import { useState, useCallback, useEffect } from 'react'

import { EditableContext } from '../core'

export function PreviewOverlay(props: PreviewOverlayProps) {
  const [active, setActiveState] = useState(false)
  const { onChange } = props

  const setActive = useCallback(
    (active: boolean) => {
      if (typeof onChange === 'function') {
        onChange(active)
      }
      setActiveState(active)
    },
    [onChange]
  )
  useEffect(() => {
    if (!props.focused && active) {
      setActive(false)
    }
  }, [props.focused, active, setActive])

  return (
    <div className="relative">
      <div
        className={clsx(
          'absolute top-0 z-20 h-full w-full',
          props.focused && 'bg-white bg-opacity-80',
          active && 'hidden'
        )}
      >
        {props.focused ? (
          <div className="flex h-full w-full text-center">
            <button
              className="pointer-events-[all] serlo-button-editor-primary z-10 m-auto"
              onClick={() => setActive(true)}
            >
              Aktivieren
            </button>
          </div>
        ) : null}
      </div>
      {!props.editable ? (
        <EditableContext.Provider value={false}>
          {props.children}
        </EditableContext.Provider>
      ) : (
        props.children
      )}
      {active ? (
        <div className="flex h-full w-full text-center">
          <button
            className="pointer-events-[all] serlo-button-editor-primary z-10 m-auto"
            onClick={() => setActive(false)}
          >
            Editieren
          </button>
        </div>
      ) : null}
    </div>
  )
}

interface PreviewOverlayProps {
  children: React.ReactNode
  focused: boolean
  editable?: boolean
  onChange?: (active: boolean) => void
}
