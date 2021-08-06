import { UserActivityByType } from '@serlo/api'
import clsx from 'clsx'

import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'

interface ProfileActivityGraphsProps {
  values: UserActivityByType
}

export function ProfileActivityGraphs({ values }: ProfileActivityGraphsProps) {
  const { strings } = useInstanceData()

  return (
    <section
      className={clsx(
        'flex justify-center flex-wrap my-20 max-w-lg mx-auto',
        'sm:justify-between sm:flex-nowrap sm:max-w-none'
      )}
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
