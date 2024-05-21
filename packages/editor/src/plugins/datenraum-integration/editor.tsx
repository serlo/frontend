import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Modal from 'react-modal'

import type { DatenraumIntegrationProps } from '.'
import {
  LearningResourceComponent,
  LearningResource,
} from './components/learning-resource'
import { SearchPanel } from './components/search-panel'

export function DatenraumIntegrationEditor(props: DatenraumIntegrationProps) {
  const [showSearch, setShowSearch] = useState(false)
  const { resource } = props.state

  return (
    <>
      {renderPluginToolbar()}
      {renderSearchModal()}
      {resource.defined
        ? renderResource({
            title: resource.title.value,
            url: resource.url.value,
            description: resource.description.value,
          })
        : renderEmptyPlugin()}
    </>
  )

  function renderEmptyPlugin() {
    return (
      <div className="flex min-h-64 items-center justify-center bg-gray-100">
        <button
          className="rounded-full bg-blue-500 p-2 text-white"
          onClick={() => setShowSearch(true)}
        >
          <FontAwesomeIcon icon={faSearch} /> Suche im Datenraum
        </button>
      </div>
    )
  }

  function renderResource(resource: LearningResource) {
    return (
      <div>
        <LearningResourceComponent resource={resource} />
      </div>
    )
  }

  function renderSearchModal() {
    return (
      <Modal
        isOpen={showSearch}
        onRequestClose={() => setShowSearch(false)}
        style={{
          content: {
            width: '80%',
            height: '80vh',
            top: '50%',
            left: '50%',
            bottom: 'auto',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
          },
          overlay: { zIndex: 100 },
        }}
      >
        <SearchPanel onSelect={handleSelectResource} />
      </Modal>
    )
  }

  function handleSelectResource(resource: LearningResource) {
    const resourceState = props.state.resource

    if (resourceState.defined) {
      resourceState.description.set(resource.description)
      resourceState.title.set(resource.title)
      resourceState.url.set(resource.url)
    } else {
      resourceState.create(resource)
    }

    setShowSearch(false)
  }

  function renderPluginToolbar() {
    if (!props.focused) return null

    return (
      <PluginToolbar
        pluginType="Edu-sharing Inhalt"
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
          </>
        }
      />
    )
  }
}
