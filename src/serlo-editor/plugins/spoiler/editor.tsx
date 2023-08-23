import type { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'
import { SpoilerToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef, domFocusWithin } = props
  const editorStrings = useEditorStrings()

  const title = editable ? (
    <input
      onChange={(e) => state.title.set(e.target.value)}
      value={state.title.value}
      placeholder={editorStrings.plugins.spoiler.enterATitle}
      ref={autofocusRef}
      className="-my-1 w-full rounded-md bg-transparent p-1 focus:bg-brand-100 focus:outline-none"
    />
  ) : (
    state.title.value
  )

  return (
    <>
      {domFocusWithin ? <SpoilerToolbar {...props} /> : null}
      <SpoilerRenderer
        title={<>{title}</>}
        content={state.content.render()}
        openOverwrite={editable}
      />
    </>
  )
}
