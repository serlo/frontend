import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Entity } from '@serlo/authorization'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { InfoPanel } from '@/components/info-panel'
import { TimeAgo } from '@/components/time-ago'
import { Events } from '@/components/user/events'
import { ProfileActivityGraphs } from '@/components/user/profile-activity-graphs'
import { ProfileBadges } from '@/components/user/profile-badges'
import { ProfileChatButton } from '@/components/user/profile-chat-button'
import { ProfileRoles } from '@/components/user/profile-roles'
import { ProfileUserTools } from '@/components/user-tools/profile-user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
import { isProduction } from '@/helper/is-production'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { strings, lang } = useInstanceData()
  const auth = useAuthentication()
  const canDo = useCanDo()

  editorRenderers.init(createRenderers())

  const {
    id,
    username,
    description,
    imageUrl,
    chatUrl,
    date,
    motivation,
    activityByType,
  } = userData

  const [isOwnProfile, setIsOwnProfile] = useState(false)

  const registerDate = new Date(date)
  const legacyDate = new Date('2021-11-14')
  const isUserWithoutActivities =
    !userData.isActiveDonor &&
    activityByType.edits + activityByType.reviews === 0 &&
    registerDate > legacyDate
  const hourInMilliseconds = 60 * 60 * 1000
  const isNewlyRegisteredUser =
    isUserWithoutActivities &&
    new Date().getTime() - new Date(date).getTime() < 1 * hourInMilliseconds

  useEffect(() => {
    setIsOwnProfile(auth?.username === username)
  }, [auth, username])

  return (
    <>
      {renderHeader()}
      {renderDescription()}
      {isOwnProfile ? <ProfileUserTools aboveContent /> : null}
      <ProfileActivityGraphs values={activityByType} />
      {renderRecentActivities()}
      {renderRoles()}
      {isOwnProfile ? <ProfileUserTools /> : null}
    </>
  )

  function renderHeader() {
    return (
      <>
        <header className="mx-side mt-14 text-center sm:text-left">
          {renderProfileImage()}
          <div className="mt-5 sm:mt-0">
            <h1 className="serlo-h1 mb-3 mt-4">{username}</h1>
            <ProfileBadges userData={userData} date={date} />
          </div>
          <div className="serlo-p mt-5 w-full text-1.5xl [grid-area:motivation] sm:mt-0">
            {motivation && <>&quot;{motivation}&quot;</>}
            {isOwnProfile &&
              !isNewlyRegisteredUser &&
              renderEditMotivationLink()}
          </div>
          <ProfileChatButton
            userId={id}
            username={username}
            isOwnProfile={isOwnProfile}
            chatUrl={chatUrl}
            className="mx-auto mb-8 sm:mx-0"
          />
        </header>
        <style jsx>{`
          @media (min-width: ${breakpoints.sm}) {
            header {
              display: grid;
              grid-template-columns: 175px auto;
              grid-template-rows: auto auto;
              grid-template-areas: 'image badges' 'chatButton motivation';
              row-gap: 20px;
              column-gap: 20px;
              place-items: center start;
            }
          }
        `}</style>
      </>
    )
  }

  function renderProfileImage() {
    return (
      <figure className="mx-auto h-44 w-44 [contain:content] sm:mx-0">
        <Image
          src={imageUrl}
          alt={`Profile image of ${username}`}
          width={176}
          height={176}
          className="block rounded-full"
        />
        {isOwnProfile && !isNewlyRegisteredUser && (
          <Link
            href="/user/settings#image"
            className="serlo-button-green absolute bottom-1 right-1 block h-8 w-8"
          >
            <FaIcon icon={faPencilAlt} />
          </Link>
        )}
      </figure>
    )
  }

  function renderDescription() {
    if (!description) return null

    if (!isOwnProfile && isUserWithoutActivities) return null
    return (
      <section>
        <h2 className="serlo-h2">{strings.profiles.aboutMe}</h2>
        {isUserWithoutActivities && isOwnProfile ? (
          <InfoPanel icon={faInfoCircle}>
            {strings.profiles.lockedDescriptionTitle}
            <br />
            {strings.profiles.lockedDescriptionText}
          </InfoPanel>
        ) : (
          <StaticRenderer document={description} />
        )}
      </section>
    )
  }

  function renderRecentActivities() {
    return (
      <section>
        <h2 className="serlo-h2">{strings.profiles.recentActivities}</h2>
        <Events userId={id} perPage={5} />

        <p className="serlo-p">
          <Link
            className="serlo-button-blue mt-4"
            href={`/event/history/user/profile/${username}#activities`}
          >
            {strings.profiles.showAllActivities}
          </Link>
        </p>
      </section>
    )
  }

  function renderRoles() {
    const showLastLogin = !isProduction || canDo(Entity.checkoutRevision)

    return (
      <aside className="mx-side mt-20 text-sm text-gray-500">
        <ProfileRoles roles={userData.roles} />
        {showLastLogin && userData.lastLogin ? (
          <p>
            {strings.profiles.lastLogin}:{' '}
            <TimeAgo className="pl-2 font-bold" datetime={userData.lastLogin} />
          </p>
        ) : null}
      </aside>
    )
  }

  function renderEditMotivationLink() {
    if (lang !== Instance.De) return null
    return (
      <p className="serlo-p ml-auto mt-3 text-right text-sm">
        <Link
          href="/user/settings#motivation"
          className="serlo-link cursor-pointer"
        >
          <FaIcon icon={faPencilAlt} />{' '}
          {motivation
            ? strings.profiles.editMotivation
            : strings.profiles.addMotivation}
        </Link>
      </p>
    )
  }
}
