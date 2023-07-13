import { faLink } from '@fortawesome/free-solid-svg-icons'

import { AnchorProps } from '.'
import { AnchorRenderer } from './renderer'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const AnchorEditor = (props: AnchorProps) => {
  const { editable, focused, state } = props

  const editorStrings = useEditorStrings()

  return (
    <>
      {editable ? <FaIcon icon={faLink} className="mr-[5px]" /> : null}
      <AnchorRenderer {...props} />
      {focused ? (
        <EditorInput
          label={editorStrings.plugins.anchor.identifier}
          placeholder={editorStrings.plugins.anchor.anchorId}
          value={state.value}
          onChange={(e) => {
            state.set(e.target.value)
          }}
          ref={props.autofocusRef}
        />
      ) : null}
    </>
  )
}
