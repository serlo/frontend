import * as R from 'ramda'

import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'

export function ProfileActivityGraphs({
  values,
}: {
  values: User['activityByType']
}) {
  const { strings } = useInstanceData()

  return (
    <section className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap my-20">
      {R.toPairs(values)
        .filter(([_type, value]) => value > 0)
        .map(([type, value]) => (
          <ProfileActivityGraph
            key={type}
            title={strings.profiles.activityGraph[type]}
            value={value}
          />
        ))}
    </section>
  )
}
