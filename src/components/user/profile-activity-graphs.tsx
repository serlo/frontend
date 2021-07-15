import { ProfileActivityGraph } from '@/components/user/profile-activity-graph'

interface ProfileActivityGraphsProps {
  isOwnProfile: boolean
}

export function ProfileActivityGraphs({
  isOwnProfile,
}: ProfileActivityGraphsProps) {
  return (
    <div className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap my-20">
      <ProfileActivityGraph
        title="Bearbeitungen"
        amount={0.4}
        absoluteValue={100}
        isOwnProfile={isOwnProfile}
      />
      <ProfileActivityGraph
        title="Kommentare"
        amount={0.9}
        absoluteValue={1337}
        isOwnProfile={isOwnProfile}
      />
      <div style={{ flexBasis: '100%' }} className="sm:hidden" />
      <ProfileActivityGraph
        title="Reviews"
        amount={0.1}
        absoluteValue={4}
        isOwnProfile={isOwnProfile}
      />
      <ProfileActivityGraph
        title="Taxonomy"
        amount={0.6}
        absoluteValue={123}
        isOwnProfile={isOwnProfile}
      />
    </div>
  )
}
