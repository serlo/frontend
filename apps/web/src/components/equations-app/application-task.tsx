import { ApplicationTaskData } from '@/data/de/gleichungs-app'

interface ApplicationTaskProps {
  data: ApplicationTaskData
  onSolve: (n: number) => void
  onBack: () => void
}

export function ApplicationTask({ data }: ApplicationTaskProps) {
  return (
    <div>
      <h2 className="mb-8 mt-6 text-lg font-bold">{data.title}</h2>
      {data.description}
    </div>
  )
}
