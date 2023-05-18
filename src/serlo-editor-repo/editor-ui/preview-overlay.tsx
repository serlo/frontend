import { useState, useCallback, useEffect } from 'react'

import { EditableContext } from '../core'
import { styled } from '../ui'

const NoClickArea = styled.div<{ active: boolean }>((props) => {
  return {
    pointerEvents: props.active ? 'unset' : 'none',
    position: 'relative',
  }
})

const Overlay = styled.div<{ active: boolean; blur: boolean }>((props) => {
  return {
    display: props.active ? 'none' : undefined,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: props.blur ? 'rgba(255,255,255,0.8)' : undefined,
    zIndex: 10,
  }
})

const ButtonWrapper = styled.div({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  display: 'flex',
})

const ActivateButton = styled.button({
  pointerEvents: 'all',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '2px 10px',
  textAlign: 'center',
  outline: 'none',
  backgroundColor: 'rgb(0,126,193)',
  zIndex: 10,
  margin: 'auto',
})

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
    <NoClickArea active={active}>
      <Overlay blur={props.focused} active={active}>
        {props.focused ? (
          <ButtonWrapper>
            <ActivateButton
              onClick={() => {
                setActive(true)
              }}
            >
              Aktivieren
            </ActivateButton>
          </ButtonWrapper>
        ) : null}
      </Overlay>
      {!props.editable ? (
        <EditableContext.Provider value={false}>
          {props.children}
        </EditableContext.Provider>
      ) : (
        props.children
      )}
      {active ? (
        <ButtonWrapper>
          <ActivateButton
            onClick={() => {
              setActive(false)
            }}
          >
            Editieren
          </ActivateButton>
        </ButtonWrapper>
      ) : null}
    </NoClickArea>
  )
}

export interface PreviewOverlayProps {
  children: React.ReactNode
  focused: boolean
  editable?: boolean
  onChange?: (active: boolean) => void
}
