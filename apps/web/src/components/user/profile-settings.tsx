import { ProfileDescriptionEditor } from './profile-description-editor'
import { getAvatarUrl } from './user-link'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ProfileSettingsProps {
  rawDescription: string
}

export function ProfileSettings({ rawDescription }: ProfileSettingsProps) {
  const loggedInData = useLoggedInData()
  const { lang } = useInstanceData()
  const auth = useAuthentication()

  if (!auth) return null
  const username = auth.username

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.profileSettings

  return (
    <>
      <h2 id="image" className="serlo-h2">
        {loggedInStrings.editImage.header}
      </h2>
      {renderHowToEditImage()}

      <h2 id="motivation" className="serlo-h2">
        {loggedInStrings.motivation.header}
      </h2>
      {renderHowToEditMotivation()}

      <h2 className="serlo-h2">{loggedInStrings.editAbout}</h2>
      <ProfileDescriptionEditor
        rawDescription={rawDescription}
        username={username}
      />

      <h2 id="delete" className="serlo-h2">
        {loggedInStrings.delete.heading}
      </h2>
      {renderHowToDeleteAcc()}
    </>
  )

  function renderHowToEditImage() {
    const { buttonText, description, steps } = loggedInStrings.editImage
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

    return renderBox(
      buttonText,
      <>
        <p className="serlo-p mt-5">
          {replacePlaceholders(description, { chatLink })}
        </p>
        <ol className="serlo-ol">
          <li>{replacePlaceholders(steps.goToChat, { chatLink })}</li>
          <li>{steps.signIn}</li>
          <li>{replacePlaceholders(steps.goToMyAccount, { myAccountLink })}</li>
          <li>{steps.uploadPicture}</li>
          <li>{replacePlaceholders(steps.refreshPage, { refreshLink })}</li>
        </ol>
      </>
    )
  }

  function renderHowToEditMotivation() {
    if (lang !== Instance.De) return null
    const { buttonText, intro, privacy, toForm } = loggedInStrings.motivation
    const editUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdb_My7YAVNA7ha9XnBcYCZDk36cOqgcWkBqowatbefX0IzEg/viewform?usp=pp_url&entry.14483495=${username}`

    return renderBox(
      buttonText,
      <>
        <p className="serlo-p mt-5">{intro}</p>
        <p className="serlo-p">{privacy}</p>
        <p className="serlo-p">
          <a href={editUrl} className="serlo-button-learner-primary">
            {toForm}
          </a>
        </p>
      </>
    )
  }

  function renderBox(title: string, children: JSX.Element) {
    return (
      <div
        className={cn(
          'mb-block flex flex-col rounded-lg border-3',
          'border-brand-200 [&>div.my-block:first-of-type]:mt-5'
        )}
      >
        <div
          className={cn(
            'serlo-input-font-reset m-0 border-none bg-brand-200 px-side py-2.5',
            'text-left text-lg leading-normal text-almost-black transition-colors'
          )}
        >
          <span className="flex">
            <span className="inline-block w-4">{'▾ '} </span>
            {title}
          </span>
        </div>

        {children}
      </div>
    )
  }

  function renderHowToDeleteAcc() {
    const subjectLine = `${loggedInStrings.delete.deleteAccount}: ${username}`
    const encodedSubjectLine = encodeURIComponent(subjectLine)
    return (
      <p className="serlo-p">
        {replacePlaceholders(loggedInStrings.delete.text, {
          mailLink: (
            <a
              href={`mailto:serlo@chancenwerk.org?subject=${encodedSubjectLine}`}
              className="serlo-link"
            >
              serlo@chancenwerk.org
            </a>
          ),
          subjectLine: <b>{`"${subjectLine}"`}</b>,
          break: <br />,
        })}
      </p>
    )
  }
}
