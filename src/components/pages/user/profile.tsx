import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { TimeAgo } from '@/components/time-ago'
import { UserTools } from '@/components/user-tools/user-tools'
import { Events } from '@/components/user/events'
import { ProfileActivityGraphs } from '@/components/user/profile-activity-graphs'
import { ProfileBadges } from '@/components/user/profile-badges'
import { ProfileChatButton } from '@/components/user/profile-chat-button'
import { ProfileRoles } from '@/components/user/profile-roles'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { strings, lang } = useInstanceData()
  const auth = useAuthentication()

  const {
    id,
    username,
    description,
    lastLogin,
    imageUrl,
    chatUrl,
    date,
    motivation,
    activityByType,
  } = userData
  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined

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
    setIsOwnProfile(auth.current?.username === username)
  }, [auth, username])

  return (
    <>
      {renderHeader()}
      {renderDescription()}
      <ProfileActivityGraphs values={activityByType} />
      {renderRecentActivities()}
      {renderRoles()}
      {renderUserTools()}
    </>
  )

  function renderHeader() {
    return (
      <>
        <header className="mx-side mt-14 text-center sm:text-left">
          {renderProfileImage()}
          <div className="mt-5 sm:mt-0">
            <h1 className="serlo-h1 mt-4 mb-3">{username}</h1>
            <ProfileBadges userData={userData} date={date} />
          </div>
          <div
            className="serlo-p text-1.5xl w-full mt-5 sm:mt-0"
            style={{ gridArea: 'motivation' }}
          >
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
            className="mx-auto sm:mx-0 mb-8"
          />
        </header>
        <style jsx>{`
          header {
            @screen sm {
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
      <figure
        className="w-44 h-44 mx-auto sm:mx-0"
        style={{ contain: 'content' }}
      >
        <img
          src={imageUrl}
          alt={`Profile image of ${username}`}
          className="block rounded-full w-full h-full"
        />
        {isOwnProfile && !isNewlyRegisteredUser && (
          <Link
            href="/user/settings#image"
            className={clsx(
              'serlo-button serlo-make-interactive-green',
              'block absolute right-1 bottom-1 w-8 h-8'
            )}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
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
          <StaticInfoPanel icon={faInfoCircle}>
            {strings.profiles.lockedDescriptionTitle}
            <br />
            {strings.profiles.lockedDescriptionText}
          </StaticInfoPanel>
        ) : (
          renderArticle(description, `profile${id}`)
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
            className="serlo-button serlo-make-interactive-primary mt-4"
            href={`/event/history/${id}#activities`}
          >
            {strings.profiles.showAllActivities}
          </Link>
        </p>
      </section>
    )
  }

  function renderRoles() {
    return (
      <aside className="mt-20 text-gray-500 text-sm mx-side">
        <ProfileRoles roles={userData.roles} />
        {lastLoginDate && (
          <p>
            {strings.profiles.lastLogin}:{' '}
            <TimeAgo className="pl-2 font-bold" datetime={lastLoginDate} />
          </p>
        )}
      </aside>
    )
  }

  function renderUserTools() {
    return (
      <UserTools
        id={id}
        hideEditProfile={!isOwnProfile}
        data={{
          type: 'Profile',
          id: id,
        }}
      />
    )
  }

  function renderEditMotivationLink() {
    if (lang !== 'de') return null
    return (
      <p className="serlo-p text-sm text-right ml-auto mt-3">
        <Link
          href="/user/settings#motivation"
          className="serlo-link cursor-pointer"
        >
          <FontAwesomeIcon icon={faPencilAlt} />{' '}
          {motivation
            ? strings.profiles.editMotivation
            : strings.profiles.addMotivation}
        </Link>
      </p>
    )
  }
}
