import { OverlayInput } from '@edtr-io/core'
import { EditorInlineSettings, EditorInput, styled } from '@edtr-io/editor-ui'
// eslint-disable-next-line import/no-internal-modules
import { PreviewOverlay } from '@edtr-io/editor-ui/internal'
import { EditorPluginProps, string, EditorPlugin } from '@edtr-io/plugin'
import { Icon, faNewspaper } from '@edtr-io/ui'
import * as React from 'react'

import { Injection } from '@/components/content/injection'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { renderArticle } from '@/schema/article-renderer'

/* global */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const Common: {
  trigger: (type: string, context?: HTMLDivElement | null) => void
}

export const injectionState = string()

export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}

export function InjectionRenderer(props: { src: string }) {
  return <Injection href={props.src} renderNested={renderArticle} />
}

const PlaceholderWrapper = styled.div({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
})

function InjectionEditor(props: EditorPluginProps<typeof injectionState>) {
  const [cache, setCache] = React.useState(props.state.value)
  const [preview, setPreview] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCache(props.state.value)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [props.focused, props.state.value])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  if (!props.editable) {
    return <InjectionRenderer src={props.state.value} />
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
          <InjectionRenderer src={cache} />
        </PreviewOverlay>
      ) : (
        <PlaceholderWrapper>
          <Icon icon={faNewspaper} size="5x" />
        </PlaceholderWrapper>
      )}
      {props.focused && !preview ? (
        <EditorInlineSettings>
          <EditorInput
            label={editorStrings.injection.serloId}
            placeholder="123456"
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
        <>
          <OverlayInput
            label={editorStrings.injection.serloId}
            placeholder="123456"
            value={props.state.value}
            onChange={(e) => {
              props.state.set(e.target.value)
            }}
          />
        </>
      )}
    </>
  )
}
