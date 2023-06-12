import { AnchorProps } from '.'
import { EditorInput } from '../../editor-ui'
import { faLink } from '../../ui'
import { AnchorRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const AnchorEditor = (props: AnchorProps) => {
  const { editable, focused, state } = props

  const editorStrings = useLoggedInData()!.strings.editor

  return (
    <>
      {editable ? <FaIcon icon={faLink} className="mr-[5px]" /> : null}
      <AnchorRenderer {...props} />
      {focused ? (
        <EditorInput
          label={editorStrings.anchor.identifier}
          placeholder={editorStrings.anchor.anchorId}
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
