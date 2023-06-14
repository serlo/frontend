import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useEffect, useState } from 'react'

import { Injection } from '@/components/content/injection'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { renderArticle } from '@/schema/article-renderer'
import { OverlayInput } from '@/serlo-editor/core'
import {
  EditorInlineSettings,
  EditorInput,
  PreviewOverlay,
} from '@/serlo-editor/editor-ui'
import { EditorPluginProps, string, EditorPlugin } from '@/serlo-editor/plugin'

export const injectionState = string()

export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}

function InjectionEditor({
  focused,
  state,
  editable,
  autofocusRef,
  renderIntoSettings,
}: EditorPluginProps<InjectionPluginState>) {
  const [cache, setCache] = useState(state.value)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCache(state.value)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [focused, state.value])

  const injectionsStrings = useLoggedInData()!.strings.editor.injection

  if (!editable) {
    return <Injection href={state.value} renderNested={renderArticle} />
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.set(e.target.value.replace(/[^0-9.]/g, ''))
  }

  return (
    <>
      {cache ? (
        <PreviewOverlay
          focused={focused || false}
          onChange={(nextActive) => {
            setIsPreview(nextActive)
            if (nextActive) {
              setCache(state.value)
            }
          }}
        >
          <Injection href={cache} renderNested={renderArticle} />
        </PreviewOverlay>
      ) : (
        <FaIcon
          icon={faNewspaper}
          className="relative w-full text-center text-[5rem] text-gray-400"
        />
      )}

      {focused && !isPreview ? (
        <EditorInlineSettings>
          <EditorInput
            label={injectionsStrings.serloId}
            placeholder={injectionsStrings.placeholder}
            value={state.value}
            onChange={handleOnChange}
            inputMode="numeric"
            pattern="\d+"
            width="30%"
            inputWidth="100%"
            ref={autofocusRef}
          />
        </EditorInlineSettings>
      ) : null}
      {renderIntoSettings(
        <>
          <OverlayInput
            label={injectionsStrings.serloId}
            placeholder={injectionsStrings.placeholder}
            inputMode="numeric"
            pattern="\d+"
            value={state.value}
            onChange={handleOnChange}
          />
        </>
      )}
    </>
  )
}
