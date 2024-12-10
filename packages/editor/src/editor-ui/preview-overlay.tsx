import { cn } from '@editor/utils/cn'
import { useState, useCallback, useEffect } from 'react'

interface PreviewOverlayProps {
  children: React.ReactNode
  focused: boolean
  onChange?: (active: boolean) => void
}

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
    <div className={cn('relative pl-1', active ? '' : 'pb-[5px]')}>
      <div
        className={cn(
          'absolute top-0 z-20 h-[calc(100%_-_5px)] w-[calc(100%_-_0.25rem)]',
          props.focused && 'bg-white bg-opacity-80',
          active && 'hidden'
        )}
      >
        {props.focused ? (
          <div className="flex h-full w-full text-center">
            <button
              className="pointer-events-[all] serlo-button-edit-primary z-10 m-auto"
              onClick={() => setActive(true)}
            >
              Aktivieren
            </button>
          </div>
        ) : null}
      </div>
      {props.children}
      {active ? (
        <div className="flex h-full w-full text-center">
          <button
            className="pointer-events-[all] serlo-button-edit-primary z-10 m-auto"
            onClick={() => setActive(false)}
          >
            Editieren
          </button>
        </div>
      ) : null}
    </div>
  )
}
