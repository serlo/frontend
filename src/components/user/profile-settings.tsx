import { Spoiler } from '../content/spoiler'
import { ProfileDescriptionEditor } from './profile-description-editor'
import { ProfileExperimental } from './profile-experimental'
import { getAvatarUrl } from './user-link'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ProfileSettingsProps {
  rawDescription: string
}

export function ProfileSettings({ rawDescription }: ProfileSettingsProps) {
  const loggedInData = useLoggedInData()
  const { lang } = useInstanceData()

  const auth = useAuthentication()

  if (!auth.current) return null
  const username = auth.current.username

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.profileSettings

  return (
    <>
      <h2 className="serlo-h2">{loggedInStrings.editAbout}</h2>
      <ProfileDescriptionEditor rawDescription={rawDescription} />

      <h2 id="image" className="serlo-h2">
        {loggedInStrings.howToEditImage.heading}
      </h2>
      {renderHowToEditImage()}

      <h2 id="motivation" className="serlo-h2">
        {loggedInStrings.motivation.heading}
      </h2>
      {renderHowToEditMotivation()}

      <ProfileExperimental />
    </>
  )

  function renderHowToEditImage() {
    const { description, steps } = loggedInStrings.howToEditImage
    const chatLink = (
      <a className="serlo-link" href="https://community.serlo.org">
        community.serlo.org
      </a>
    )
    const myAccountLink = (
      <a
        className="serlo-link"
        href="https://community.serlo.org/account/profile"
      >
        {steps.myAccount}
      </a>
    )
    const refreshLink = (
      <a
        className="serlo-link cursor-pointer"
        onClick={async () => {
          const cache = await caches.open('v1')
          await cache.delete(getAvatarUrl(username))
          location.reload()
        }}
      >
        {steps.refreshLink}
      </a>
    )

    return (
      <>
        <Spoiler
          title={loggedInStrings.showInstructions}
          path={['profile-settings']}
          body={
            <>
              <p className="serlo-p mt-5">
                {replacePlaceholders(description, { chatLink })}
              </p>
              <ol className="serlo-ol">
                <li>{replacePlaceholders(steps.goToChat, { chatLink })}</li>
                <li>{steps.signIn}</li>
                <li>
                  {replacePlaceholders(steps.goToMyAccount, { myAccountLink })}
                </li>
                <li>{steps.uploadPicture}</li>
                <li>
                  {replacePlaceholders(steps.refreshPage, { refreshLink })}
                </li>
              </ol>
            </>
          }
        />
      </>
    )
  }

  function renderHowToEditMotivation() {
    if (lang !== 'de') return null
    const { intro, privacy, toForm } = loggedInStrings.motivation
    const editUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdb_My7YAVNA7ha9XnBcYCZDk36cOqgcWkBqowatbefX0IzEg/viewform?usp=pp_url&entry.14483495=${username}`

    return (
      <Spoiler
        title={loggedInStrings.showInstructions}
        path={['profile-settings']}
        body={
          <>
            <p className="serlo-p mt-5">{intro}</p>
            <p className="serlo-p">{privacy}</p>
            <p className="serlo-p">
              <a
                href={editUrl}
                className="serlo-button serlo-make-interactive-primary"
              >
                {toForm}
              </a>
            </p>
          </>
        }
      />
    )
  }
}
