import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { InjectionPluginState } from '.'
import { InjectionRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { renderArticle } from '@/schema/article-renderer'
import { EditorInput, PreviewOverlay } from '@/serlo-editor/editor-ui'
import { EditorPluginProps } from '@/serlo-editor/plugin'

export function InjectionEditor({
  focused,
  state,
  editable,
  autofocusRef,
}: EditorPluginProps<InjectionPluginState>) {
  const injectionsStrings = useEditorStrings().plugins.injection

  const [cache, setCache] = useState(state.value)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCache(state.value), 2000)
    return () => clearTimeout(timeout)
  }, [focused, state.value])

  if (!editable) {
    return <InjectionRenderer href={state.value} renderNested={renderArticle} />
  }

  return (
    <>
      {focused && !isPreview ? renderInput() : null}
      {cache ? (
        <PreviewOverlay
          focused={focused || false}
          onChange={(nextActive) => {
            setIsPreview(nextActive)
            if (nextActive) setCache(state.value)
          }}
        >
          <InjectionRenderer href={cache} renderNested={renderArticle} />
        </PreviewOverlay>
      ) : (
        <div className="rounded-lg bg-editor-primary-50 py-32 text-center">
          <FaIcon
            icon={faSquarePlus}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )

  function renderInput() {
    return (
      <div className="mt-4 mb-3">
        <EditorInput
          label={`${injectionsStrings.serloId}: `}
          placeholder={injectionsStrings.placeholder}
          value={state.value}
          onChange={(e) => state.set(e.target.value.replace(/[^0-9]/g, ''))}
          inputWidth="60%"
          width="100%"
          inputMode="numeric"
          pattern="\d+"
          ref={autofocusRef}
          className="ml-1"
        />
      </div>
    )
  }
}
