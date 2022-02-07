import { ProfileDescriptionEditor } from './profile-description-editor'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ProfileSettingsProps {
  rawDescription: string
}

export function ProfileSettings({ rawDescription }: ProfileSettingsProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.profileSettings

  return (
    <>
      <h3 className="serlo-h3">{loggedInStrings.editAbout}</h3>
      <ProfileDescriptionEditor rawDescription={rawDescription} />
    </>
  )
}
