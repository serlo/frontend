import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useAuthentication } from '@/auth/use-authentication'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { TimeAgo } from '@/components/time-ago'
import { UserTools } from '@/components/user-tools/user-tools'
import { ProfileActivityGraphs } from '@/components/user/profile-activity-graphs'
import { ProfileBadges } from '@/components/user/profile-badges'
import { ProfileChatButton } from '@/components/user/profile-chat-button'
import { ProfileRoles } from '@/components/user/profile-roles'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'
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

  const [showImageModal, setShowImageModal] = useState(false)
  const [showMotivationModal, setShowMotivationModal] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

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
      {renderHowToEditImage()}
      {renderHowToEditMotivation()}
    </>
  )

  function renderHeader() {
    return (
      <ProfileHeader className="mx-side mt-14 text-center sm:text-left">
        {renderProfileImage()}
        <div className="mt-5 sm:mt-0">
          <h1 className="serlo-h1 mt-4 mb-3">{username}</h1>
          <ProfileBadges userData={userData} date={date} />
        </div>
        <p
          className="serlo-p text-1.5xl w-full mt-5 sm:mt-0"
          style={{ gridArea: 'motivation' }}
        >
          {motivation && <>&quot;{motivation}&quot;</>}
          {isOwnProfile && renderEditMotivationLink()}
        </p>
        <ProfileChatButton
          userId={id}
          username={username}
          isOwnProfile={isOwnProfile}
          chatUrl={chatUrl}
          className="mx-auto sm:mx-0 mb-8"
        />
      </ProfileHeader>
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
        {isOwnProfile && (
          <a
            onClick={() => setShowImageModal(true)}
            className={clsx(
              'serlo-button serlo-make-interactive-green',
              'block absolute right-1 bottom-1 w-8 h-8'
            )}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </a>
        )}
      </figure>
    )
  }

  function renderDescription() {
    if (!description) return null
    return (
      <section>
        <h2 className="serlo-h2">{strings.profiles.aboutMe}</h2>
        {renderArticle(description, `profile${id}`)}
      </section>
    )
  }

  function renderRecentActivities() {
    // Deactivated until the API provides newer events also
    return null
    // return (
    //   <section>
    //     <h2 className="serlo-h2">{strings.profiles.recentActivities}</h2>
    //     <Events userId={id} perPage={5} />

    //     <p className="serlo-p">
    //       <Link
    //         className="serlo-button serlo-make-interactive-primary mt-4"
    //         href={`/event/history/${id}`}
    //       >
    //         Mehr anzeigen
    //       </Link>
    //     </p>
    //   </section>
    // )
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

  function renderHowToEditImage() {
    const { heading, description, steps } = strings.profiles.howToEditImage
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
          await cache.delete(imageUrl)
          location.reload()
        }}
      >
        {steps.refreshLink}
      </a>
    )

    return (
      <ModalWithCloseButton
        isOpen={showImageModal}
        onCloseClick={() => setShowImageModal(false)}
        title={heading}
      >
        <p className="serlo-p">
          {replacePlaceholders(description, { chatLink })}
        </p>
        <ol className="serlo-ol">
          <li>{replacePlaceholders(steps.goToChat, { chatLink })}</li>
          <li>{steps.signIn}</li>
          <li>{replacePlaceholders(steps.goToMyAccount, { myAccountLink })}</li>
          <li>{steps.uploadPicture}</li>
          <li>{replacePlaceholders(steps.refreshPage, { refreshLink })}</li>
        </ol>
      </ModalWithCloseButton>
    )
  }

  function renderEditMotivationLink() {
    if (lang !== 'de') return null
    return (
      <p className="serlo-p text-sm text-right ml-auto mt-3">
        <a
          onClick={() => setShowMotivationModal(true)}
          className="serlo-link cursor-pointer"
        >
          <FontAwesomeIcon icon={faPencilAlt} />{' '}
          {motivation
            ? strings.profiles.motivation.edit
            : strings.profiles.motivation.add}
        </a>
      </p>
    )
  }

  function renderHowToEditMotivation() {
    if (lang !== 'de') return null
    const { heading, intro, privacy, toForm } = strings.profiles.motivation
    const editUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdb_My7YAVNA7ha9XnBcYCZDk36cOqgcWkBqowatbefX0IzEg/viewform?usp=pp_url&entry.14483495=${username}`

    return (
      <ModalWithCloseButton
        isOpen={showMotivationModal}
        onCloseClick={() => setShowMotivationModal(false)}
        title={heading}
      >
        <p className="serlo-p">{intro}</p>
        <p className="serlo-p">{privacy}</p>
        <p className="serlo-p">
          <a
            href={editUrl}
            className="serlo-button serlo-make-interactive-primary"
          >
            {toForm}
          </a>
        </p>
      </ModalWithCloseButton>
    )
  }
}

const ProfileHeader = styled.header`
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: grid; //grid
    grid-template-columns: 175px auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'image badges' 'chatButton motivation';
    row-gap: 20px;
    column-gap: 20px;
    place-items: center start;
  }
`
