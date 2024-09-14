import { EditorPluginProps, object, scalar } from '@editor/plugin'
import {
  IconDefinition,
  faArrowUpFromBracket,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

const state = object({
  resourceLocation: scalar<Resource | null>(null),
})
type MediaState = typeof state
type MediaProps = EditorPluginProps<MediaState>

enum Hosting {
  CDN = 'cdn',
}

enum Embedding {
  Image = 'image',
}

export const mediaPlugin = {
  state,
  config: {},
  Component: MediaPlugin,
}

function MediaPlugin(props: MediaProps) {
  const { state } = props
  const resource = state.resourceLocation.value

  if (!resource) {
    return (
      <SelectMediaPanel
        onSelect={(resource) => state.resourceLocation.set(resource)}
      />
    )
  }

  const embedding = embeddingResolver[resource.hostingService](resource)

  if (embedding.type === Embedding.Image) {
    return <img src={embedding.contentUrl} />
  }
}

interface SelectMediaPanel {
  onSelect: (resource: Resource) => void
}

function SelectMediaPanel({ onSelect }: SelectMediaPanel) {
  return (
    <div className="almost-black flex flex-col items-center space-y-4 rounded-md bg-yellow-50 p-8 shadow-md">
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faArrowUpFromBracket}
        label="Datei hochladen"
      />
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faSearch}
        label="Datei suchen"
      />
      <div className="flex min-w-[60%] flex-col items-center space-y-2">
        <span>URL:</span>
        <input
          className="w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600"
          placeholder="https://example.com/image.png"
        />
      </div>
    </div>
  )
}

interface SelectMediaPanelButtonProps {
  onClick: () => void
  icon: IconDefinition
  label: string
}

function SelectMediaPanelButton({
  onClick,
  icon,
  label,
}: SelectMediaPanelButtonProps) {
  return (
    <button
      className="min-w-[60%] rounded-md bg-editor-primary-200 p-2 font-bold hover:bg-editor-primary-300"
      onClick={onClick}
    >
      <FaIcon className="mr-2" icon={icon} />
      {label}
    </button>
  )
}

// ### Resolver types

const embeddingResolver: ResourceResolver = {
  [Hosting.CDN]: (resource) => {
    return {
      resourceLocation: resource,
      type: resource.embeddingType,
      contentUrl: resource.contentUrl,
    }
  },
}

type ResourceResolver = {
  [H in Hosting]: (resource: Resource<H>) => EmbeddingType<H>
}

interface ResourceTypeAdditonalInformation {
  [Hosting.CDN]: { embeddingType: Embedding; contentUrl: string }
}

type Resource<H extends Hosting = Hosting> = {
  [T in H]: ResourceTypeAdditonalInformation[T] & { hostingService: H }
}[H]

// ### Embedding types

interface EmbeddingTypesAdditonalInformation {
  [Embedding.Image]: { contentUrl: string }
}

type EmbeddingType<
  Hosts extends Hosting = Hosting,
  Types extends Embedding = Embedding,
> = {
  [T in Types]: EmbeddingTypesAdditonalInformation[T] & {
    type: T
    resourceLocation: Resource<Hosts>
  }
}[Types]
