import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import {
  insertPluginChildBefore,
  removePluginChild,
  selectChildTreeOfParent,
  store,
  useAppDispatch,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import type { DatenraumIntegrationProps } from '.'
import { SearchPanel } from './components/search-panel'
import { hardcodedExerciseState } from './const'
import { H5pRenderer } from '../h5p/renderer'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function DatenraumIntegrationEditor(props: DatenraumIntegrationProps) {
  const [showSearch, setShowSearch] = useState(true)
  const [isConverted, setIsConverted] = useState(false)

  const dispatch = useAppDispatch()

  return (
    <>
      {renderPluginToolbar()}
      {renderSearchModal()}
      {!props.state.showResource.value && !isConverted
        ? renderEmptyPlugin()
        : null}
      {props.state.showResource.value && !isConverted ? renderResource() : null}
      {renderConvertedResource()}
    </>
  )

  function renderEmptyPlugin() {
    return (
      <div className="flex min-h-64 items-center justify-center bg-gray-100">
        <button
          className="serlo-button-editor-primary p-3"
          onClick={() => setShowSearch(true)}
        >
          <FontAwesomeIcon icon={faSearch} /> Suche im Datenraum
        </button>
      </div>
    )
  }

  function renderResource() {
    return (
      <div>
        <H5pRenderer url={props.state.resource.value} />
      </div>
    )
  }

  function renderConvertedResource() {
    return (
      <div
        className={
          props.state.showResource.value && isConverted ? '' : 'hidden'
        }
      >
        {props.state.convertedResource.render()}
      </div>
    )
  }

  function renderSearchModal() {
    return (
      <ModalWithCloseButton
        title=""
        isOpen={showSearch}
        className="top-1/2 max-h-[80vh] min-h-[60vh] w-[900px] max-w-[90vw] -translate-x-1/2 overflow-y-auto"
        onCloseClick={() => setShowSearch(false)}
      >
        <SearchPanel onSelect={handleSelectResource} />
      </ModalWithCloseButton>
    )
  }

  function handleSelectResource() {
    setShowSearch(false)
    props.state.showResource.set(true)
  }

  function renderPluginToolbar() {
    return (
      <PluginToolbar
        pluginType={EditorPluginType.DatenraumIntegration}
        pluginControls={<PluginDefaultTools pluginId={props.id} />}
        pluginSettings={
          <>
            <button
              onClick={() => setShowSearch(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              data-qa="plugin-edusharing-select-content-button"
            >
              Anderes Element auswählen
            </button>
            <button
              onClick={handleConvertResource}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              data-qa="plugin-edusharing-select-content-button"
            >
              Convert to Serlo element
            </button>
          </>
        }
      />
    )
  }

  function handleConvertResource() {
    const parentPlugin = selectChildTreeOfParent(store.getState(), props.id)

    if (!parentPlugin) return null

    dispatch(
      insertPluginChildBefore({
        parent: parentPlugin.id,
        sibling: props.id,
        document: {
          plugin: EditorPluginType.Exercise,
          state: hardcodedExerciseState,
        },
      })
    )

    dispatch(removePluginChild({ parent: parentPlugin.id, child: props.id }))

    setIsConverted(true)
  }
}
