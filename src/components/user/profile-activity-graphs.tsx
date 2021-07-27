import clsx from 'clsx'

import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'

interface ProfileActivityGraphsProps {
  values: User['activityByType']
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
