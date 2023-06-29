import { GeogebraProps } from '.'
import { EditorInput } from '../../editor-ui'
import { GeogebraRenderer, parseId } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { EmbedWrapper } from '@/serlo-editor/editor-ui/embed-wrapper'

export function GeogebraEditor(props: GeogebraProps) {
  const { focused, editable, state } = props

  const editorStrings = useEditorStrings()

  const { cleanId, url } = parseId(state.value)
  const couldBeValidId = cleanId.length === 8

  return (
    <>
      {editable && focused ? renderInput() : null}
      {couldBeValidId ? (
        <EmbedWrapper
          type="applet"
          provider="GeoGebra"
          embedUrl={url}
          className={editable && !focused ? 'pointer-events-none' : ''}
        >
          <GeogebraRenderer url={url} />
        </EmbedWrapper>
      ) : (
        <div className="rounded-lg bg-editor-primary-50 py-32 text-center">
          <FaIcon
            icon={entityIconMapping['applet']}
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
          label={`${editorStrings.plugins.geogebra.urlOrId}: `}
          placeholder="z.B. N5ktHvtW"
          value={state.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.set(e.target.value)
          }}
          inputWidth="40%"
          width="100%"
          ref={props.autofocusRef}
          className="ml-1"
        />
      </div>
    )
  }
}
