import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Modal from 'react-modal'

import { state, DatenraumIntegrationState } from './state'
import { LearningResourceComponent, LearningResource } from './static'
import { EditorPluginProps } from '../../plugin'

type DatenraumIntegrationProps = EditorPluginProps<DatenraumIntegrationState>

export const datenraumIntegrationPlugin = {
  state,
  config: {},
  Component: DatenraumIntegrationEditor,
}

function DatenraumIntegrationEditor(props: DatenraumIntegrationProps) {
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

function SearchPanel({
  onSelect,
}: {
  onSelect: (resource: LearningResource) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LearningResource[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!loading) {
      setLoading(true)
      await search(query)
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSearch()
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          className="block w-full rounded-md border-2 border-gray-300 py-2 pl-4 pr-10 focus:border-indigo-500 focus:outline-none"
          placeholder="Suchbergriff eingeben..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 rounded-md bg-indigo-500 px-4 text-white"
          onClick={handleSearch}
        >
          Suchen
        </button>
      </div>

      {loading && <FontAwesomeIcon icon={faSpinner} spin />}

      {results.map((resource, index) => (
        <LearningResourceComponent
          resource={resource}
          key={index}
          onClick={() => onSelect(resource)}
        />
      ))}
    </div>
  )

  async function search(query: string) {
    const response = await fetch(
      `/api/experimental/search-datenraum?q=${query}`
    )

    if (!response.ok) {
      alert('Failed to fetch search results: ' + (await response.text()))
      setResults([])
      return
    }

    setResults((await response.json()) as LearningResource[])
  }
}
