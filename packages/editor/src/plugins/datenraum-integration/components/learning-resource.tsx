import { Icon } from './icon'

export interface LearningResource {
  url: string
  title: string
  description: string
}

interface LearningResourceComponentProps {
  resource: LearningResource
  onClick?: (resource: LearningResource) => void
}

export function LearningResourceComponent({
  onClick = () => {},
  resource,
}: LearningResourceComponentProps) {
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
