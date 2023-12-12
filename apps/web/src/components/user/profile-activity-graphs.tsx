import { cn } from '@serlo/tailwind/helper/cn'

import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { UserActivityByType } from '@/fetcher/graphql-types/operations'

interface ProfileActivityGraphsProps {
  values: UserActivityByType
}

export function ProfileActivityGraphs({ values }: ProfileActivityGraphsProps) {
  const { strings } = useInstanceData()

  return (
    <section
      className={cn(`
        mx-auto my-20 flex max-w-lg flex-wrap justify-center
        sm:max-w-none sm:flex-nowrap sm:justify-between
      `)}
    >
      {renderGraph('edits', 3000)}
      {renderGraph('comments', 200)}
      {renderGraph('reviews', 6000)}
      {renderGraph('taxonomy', 1500)}
    </section>
  )

  function renderGraph(
    key: keyof Omit<UserActivityByType, '__typename'>,
    maxValue: number
  ) {
    const value = values[key]
    if (value === 0) return null
    return (
      <ProfileActivityGraph
        title={strings.profiles.activityGraph[key]}
        value={value}
        maxValue={maxValue}
      />
    )
  }
}
