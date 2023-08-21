import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { Events } from '@/components/user/events'
import { ProfileActivityGraphs } from '@/components/user/profile-activity-graphs'
import { ProfileBadges } from '@/components/user/profile-badges'
import { ProfileChatButton } from '@/components/user/profile-chat-button'
import { ProfileRoles } from '@/components/user/profile-roles'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { breakpoints } from '@/helper/breakpoints'
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
            className="serlo-button-blue mt-4"
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
      <aside className="mx-side mt-20 text-sm text-gray-500">
        <ProfileRoles roles={userData.roles} />
        {/* Temporarily hidden:
        {lastLoginDate && (
          <p>
            {strings.profiles.lastLogin}:{' '}
            <TimeAgo className="pl-2 font-bold" datetime={lastLoginDate} />
          </p>
        )} */}
      </aside>
    )
  }

  function renderUserTools() {
    return (
      <UserTools
        id={id}
        hideEditProfile={!isOwnProfile}
        data={{
          type: UuidType.User,
          id: id,
        }}
      />
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
