import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'
import { useInstanceData } from '@/contexts/instance-context'
import { User } from '@/fetcher/query-types'

interface ProfileActivityGraphsProps {
  isOwnProfile: boolean
  values: User['activityByType']
}

export function ProfileActivityGraphs({
  isOwnProfile,
  values,
}: ProfileActivityGraphsProps) {
  const { strings } = useInstanceData()
  const graphs = Object.keys(values).map((key) => {
    return (
      <ProfileActivityGraph
        key={key}
        title={strings.profiles.activityGraph[key as keyof typeof values]}
        value={values[key as keyof typeof values]}
        isOwnProfile={isOwnProfile}
      />
    )
  })

  return (
    <div className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap my-20">
      {graphs}
    </div>
  )
}
