import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'

interface ProfileActivityGraphsProps {
  values: User['activityByType']
}

export function ProfileActivityGraphs({ values }: ProfileActivityGraphsProps) {
  const { strings } = useInstanceData()

  return (
    <section className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap my-20">
      {renderGraph('edits', 3000)}
      {renderGraph('comments', 200)}
      {renderGraph('reviews', 6000)}
      {renderGraph('taxonomy', 1500)}
    </section>
  )

  function renderGraph(key: keyof User['activityByType'], maxValue: number) {
    return (
      <ProfileActivityGraph
        title={strings.profiles.activityGraph[key]}
        value={values[key]}
        maxValue={maxValue}
      />
    )
  }
}
