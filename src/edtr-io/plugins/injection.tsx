import { ChangeEvent, useEffect, useState } from 'react'

import { Injection } from '@/components/content/injection'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { renderArticle } from '@/schema/article-renderer'
import { OverlayInput } from '@/serlo-editor-repo/core'
import {
  EditorInlineSettings,
  EditorInput,
  styled,
  PreviewOverlay,
} from '@/serlo-editor-repo/editor-ui'
import {
  EditorPluginProps,
  string,
  EditorPlugin,
} from '@/serlo-editor-repo/plugin'
import { Icon, faNewspaper } from '@/serlo-editor-repo/ui'

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

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const injectionsStrings = loggedInData.strings.editor.injection

  if (!props.editable) {
    return <InjectionRenderer src={props.state.value} />
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.state.set(e.target.value.replace(/[^0-9.]/g, ''))
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
            label={injectionsStrings.serloId}
            placeholder={injectionsStrings.placeholder}
            value={props.state.value}
            onChange={handleOnChange}
            inputMode="numeric"
            pattern="\d+"
            width="30%"
            inputWidth="100%"
            ref={props.autofocusRef}
          />
        </EditorInlineSettings>
      ) : null}
      {props.renderIntoSettings(
        <>
          <OverlayInput
            label={injectionsStrings.serloId}
            placeholder={injectionsStrings.placeholder}
            inputMode="numeric"
            pattern="\d+"
            value={props.state.value}
            onChange={handleOnChange}
          />
        </>
      )}
    </>
  )
}
