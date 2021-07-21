import { Fragment } from 'react'

import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'

interface ProfileActivityGraphsProps {
  values: User['activityByType']
}

export function ProfileActivityGraphs({ values }: ProfileActivityGraphsProps) {
  const { strings } = useInstanceData()

  const graphs = Object.keys(values).map((key) => {
    const typedKey = key as keyof typeof values
    const value = values[typedKey]
    if (value > 0) {
      return (
        <ProfileActivityGraph
          key={key}
          title={strings.profiles.activityGraph[typedKey]}
          value={value}
        />
      )
    }
    return null
  })

  return (
    <section className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap my-20">
      {graphs.map((graph, index) => {
        if (!graph) return null
        return (
          <Fragment key={index}>
            {graph}
            {index === 1 && (
              <div style={{ flexBasis: '100%' }} className="sm:hidden" />
            )}
          </Fragment>
        )
      })}
    </section>
  )
}
