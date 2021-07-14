import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useAuthentication } from '@/auth/use-authentication'
import { CommentArea } from '@/components/comments/comment-area'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { TimeAgo } from '@/components/time-ago'
import { UserTools } from '@/components/user-tools/user-tools'
import { ProfileBadges } from '@/components/user/profile-badges'
import { ProfileRoles } from '@/components/user/profile-roles'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { makeGreenButton, makeMargin } from '@/helper/css'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { renderArticle } from '@/schema/article-renderer'

export interface ProfileProps {
  userData: UserPage['userData']
}

export const Profile: NextPage<ProfileProps> = ({ userData }) => {
  const { strings } = useInstanceData()
  const {
    id,
    username,
    description,
    lastLogin,
    imageUrl,
    chatUrl,
    date,
    motivation,
  } = userData
  const { activeDonor, activeReviewer, activeAuthor } = userData
  const auth = useAuthentication()
  const lastLoginDate = lastLogin ? new Date(lastLogin) : undefined
  const [showImageModal, setShowImageModal] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  useEffect(() => {
    setIsOwnProfile(auth.current?.username === username)
  }, [auth, username])

  return (
    <>
      <Head>
        <title>{username}</title>
        {!activeDonor && !activeAuthor && !activeReviewer && (
          <meta name="robots" content="noindex" />
        )}
      </Head>

      <ProfileHeader>
        {renderProfileImage()}
        <div>
          <h1 className="serlo-h1">{username}</h1>
          <ProfileBadges userData={userData} date={date} />
        </div>
        {motivation && (
          <Motivation className="serlo-p text-1.5xl">
            &quot;{motivation}&quot;
          </Motivation>
        )}
        <ChatButton href={chatUrl} enabled={!isOwnProfile}>
          <FontAwesomeIcon icon={faTelegramPlane} />{' '}
          {strings.profiles.directMessage}
        </ChatButton>
      </ProfileHeader>

      {description && (
        <>
          <h2 className="serlo-h2">{strings.profiles.aboutMe}</h2>
          {renderArticle(description, `profile${id}`)}
        </>
      )}
      <CommentArea id={id} noForms />
      <aside className="mt-16 text-gray-400 text-sm mx-side">
        <ProfileRoles roles={userData.roles} />
        {lastLoginDate && (
          <p>
            {strings.profiles.lastLogin}:{' '}
            <b>
              <TimeAgo datetime={lastLoginDate} dateAsTitle />
            </b>
          </p>
        )}
      </aside>
      {renderUserTools()}
      {renderHowToEditImage()}
    </>
  )

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

  function renderProfileImage() {
    return (
      <ProfileImageCage>
        <ProfileImage src={imageUrl} />
        {isOwnProfile && (
          <ProfileImageEditButton onClick={() => setShowImageModal(true)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </ProfileImageEditButton>
        )}
      </ProfileImageCage>
    )
  }

  function renderHowToEditImage() {
    const { heading, description, steps } = strings.profiles.howToEditImage
    const chatUrl = (
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
          {replacePlaceholders(description, { chatUrl })}
        </p>
        <ol className="serlo-ol">
          <li>{replacePlaceholders(steps.goToChat, { chatUrl })}</li>
          <li>{steps.signIn}</li>
          <li>{replacePlaceholders(steps.goToMyAccount, { myAccountLink })}</li>
          <li>{steps.uploadPicture}</li>
          <li>{replacePlaceholders(steps.refreshPage, { refreshLink })}</li>
        </ol>
      </ModalWithCloseButton>
    )
  }
}

const Motivation = styled.p`
  grid-area: motivation;
`

const ChatButton = styled.a<{ enabled: boolean }>`
  ${makeGreenButton}
  background-color: ${(props) =>
    props.enabled
      ? props.theme.colors.brandGreen
      : props.theme.colors.lighterBrandGreen};
  display: block;
  width: 175px;
  text-align: center;
  grid-area: chatButton;
  align-self: self-start;
  margin-top: 5px;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.enabled
        ? props.theme.colors.brand
        : props.theme.colors.lighterblue};
  }
`

const ProfileImageEditButton = styled.button`
  ${makeGreenButton}
  display: block;
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 2em;
  height: 2em;
  background-color: ${(props) => props.theme.colors.brandGreen};
  color: ${(props) => props.theme.colors.white};

  &:focus {
    background-color: ${(props) => props.theme.colors.brand};
  }
`

const ProfileImageCage = styled.figure`
  width: 175px;
  height: 175px;
  contain: content;
`

const ProfileImage = styled.img`
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const ProfileHeader = styled.header`
  ${makeMargin}
  margin-top: 60px;
  margin-bottom: 50px;

  & p {
    margin-bottom: 0;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 175px auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'image badges' 'chatButton motivation';
    row-gap: 20px;
    column-gap: 20px;
    place-items: center start;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    & > * {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      margin-top: 23px;
    }
  }

  h1 {
    margin-top: 15px;
    margin-bottom: 10px;
  }
`
