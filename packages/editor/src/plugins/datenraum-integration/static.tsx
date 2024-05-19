import { DatenraumIntegrationState } from './state'
import type { PrettyStaticState } from '../../plugin'

export interface DatenraumIntegrationDocument {
  state: PrettyStaticState<DatenraumIntegrationState>
}

export function DatenraumIntegrationStaticRenderer({
  state,
}: DatenraumIntegrationDocument) {
  const { resource } = state

  return resource ? (
    <LearningResourceComponent
      resource={resource}
      onClick={() => window.open(resource.url, '_blank')}
    />
  ) : null
}

export function LearningResourceComponent({
  onClick = () => {},
  resource,
}: {
  resource: LearningResource
  onClick?: (resource: LearningResource) => void
}) {
  const { url, description, title } = resource

  return (
    <div
      className="mb-3 mt-3 flex cursor-pointer items-center space-x-4 rounded-md bg-white p-4 shadow-md transition duration-200 ease-in-out hover:shadow-lg"
      onClick={() => onClick(resource)}
    >
      <Icon url={url} />
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function Icon({ url }: { url: string }) {
  if (url.includes('serlo')) {
    return (
      <img
        src="https://de.serlo.org/_assets/apple-touch-icon.png"
        alt="Serlo"
        className="h-8 w-8"
      />
    )
  } else if (url.includes('vhs')) {
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Deutscher_Volkshochschul-Verband%2C_VHS-Logo_-_Logo_of_the_German_adult_education_centre_association.png/320px-Deutscher_Volkshochschul-Verband%2C_VHS-Logo_-_Logo_of_the_German_adult_education_centre_association.png"
        alt="Serlo"
        className="h-8 w-8"
      />
    )
  }
}

export interface LearningResource {
  url: string
  title: string
  description: string
}
