import { EditorPluginProps, object, scalar } from '@editor/plugin'

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
      <div>
        No media selected:{' '}
        <button
          className="serlo-button"
          onClick={() =>
            state.resourceLocation.set({
              hostingService: Hosting.CDN,
              contentUrl:
                'https://cdn.pixabay.com/photo/2023/09/29/14/58/road-8284023_640.jpg',
              embeddingType: Embedding.Image,
            })
          }
        >
          Add dummy data
        </button>
      </div>
    )
  }

  const embedding = embeddingResolver[resource.hostingService](resource)

  if (embedding.type === Embedding.Image) {
    return <img src={embedding.contentUrl} />
  }
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
