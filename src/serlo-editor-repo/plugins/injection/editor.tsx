import { useEffect, useState } from 'react'

import { SerloInjectionProps } from '.'
import { OverlayInput } from '../../core'
import {
  EditorInlineSettings,
  EditorInput,
  PreviewOverlay,
  styled,
} from '../../editor-ui'
import { Icon, faNewspaper } from '../../ui'
import { useSerloInjectionConfig } from './config'
import { SerloInjectionRenderer } from './renderer'

const createURL = (id: string) => {
  const pureId =
    id.startsWith('/') || id.startsWith('\\') ? id.substring(1) : id
  return `https://de.serlo.org/${pureId}?contentOnly`
}

const PlaceholderWrapper = styled.div({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
})

export const SerloInjectionEditor = (props: SerloInjectionProps) => {
  const config = useSerloInjectionConfig(props.config)
  const [cache, setCache] = useState(props.state.value)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCache(props.state.value)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [props.focused, props.state.value])

  if (!props.editable) {
    return <SerloInjectionRenderer src={createURL(props.state.value)} />
  }

  return (
    <>
      {cache ? (
        <PreviewOverlay
          focused={props.focused || false}
          onChange={(nextActive) => {
            setPreview(nextActive)
            if (nextActive) {
              setCache(props.state.value)
            }
          }}
        >
          <SerloInjectionRenderer src={createURL(cache)} />
        </PreviewOverlay>
      ) : (
        <PlaceholderWrapper>
          <Icon icon={faNewspaper} size="5x" />
        </PlaceholderWrapper>
      )}
      {props.focused && !preview ? (
        <EditorInlineSettings>
          <EditorInput
            label={config.i18n.label}
            placeholder={config.i18n.placeholder}
            value={props.state.value}
            onChange={(e) => {
              props.state.set(e.target.value)
            }}
            width="30%"
            inputWidth="100%"
            ref={props.autofocusRef}
          />
        </EditorInlineSettings>
      ) : null}
      {props.renderIntoSettings(
        <OverlayInput
          label={config.i18n.label}
          placeholder={config.i18n.placeholder}
          value={props.state.value}
          onChange={(e) => {
            props.state.set(e.target.value)
          }}
        />
      )}
    </>
  )
}
