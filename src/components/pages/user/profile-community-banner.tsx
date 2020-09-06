import { gql } from 'graphql-request'
import styled from 'styled-components'

import { ProfileProps } from './profile'
import { ProfileDonationForm } from './profile-donation-form'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import BirdAuthorSVG from '@/assets-webkit/img/community/birds-author.svg'
import BirdDonorSVG from '@/assets-webkit/img/community/birds-donor.svg'
import BirdReviewerSVG from '@/assets-webkit/img/community/birds-reviewer.svg'
import { useAuth } from '@/auth/use-auth'
import { Link } from '@/components/content/link'
import { StyledP } from '@/components/tags/styled-p'
import { makeMargin } from '@/helper/css'

const bannerContent = {
  activeAuthors: {
    otherUserProfileMessage:
      '%username% trägt als Autorin bzw. Autor dazu bei, dass immer mehr großartige Lerninhalte auf serlo.org zu finden sind.',
    callToAction: (
      <>
        Schon mal überlegt <Link href="/mitmachen">selbst mitzumachen</Link>?
      </>
    ),
    ownProfileMessage:
      'Zusammen mit dir sind wir schon %no% Autorinnen und Autoren, die aktiv an serlo.org mitarbeiten.',
  },
  activeDonors: {
    otherUserProfileMessage:
      '%username% trägt mit einer regelmäßigen Spende dazu bei, dass serlo.org komplett kostenlos, werbefrei und unabhängig ist.',
    callToAction: (
      <>
        Kannst auch du dir vorstellen, uns mit einem{' '}
        <Link href="/user/me#spenden">kleinen Betrag zu unterstützen</Link>?
      </>
    ),
    ownProfileMessage:
      'Wir sind die ersten %no% Pioniere beim Aufbau einer langfristigen und unabhängigen Finanzierung für serlo.org.',
  },
  activeReviewers: {
    otherUserProfileMessage:
      'Als Reviewerin bzw. Reviewer sichert %username% die Qualität auf serlo.org und hilft unseren Autorinnen und Autoren.',
    callToAction: null,
    ownProfileMessage:
      'Als Team von %no% Reviewerinnen und Reviewern sorgen wir für die Qualität unserer Lernplattform.',
  },
}

export const ProfileCommunityBanner = ({ userData }: ProfileProps) => {
  const { activeReviewer, activeDonor, activeAuthor, username } = userData

  const isActive = activeReviewer || activeDonor || activeAuthor

  const auth = useAuth()
  const isOwnProfile = auth.current?.username === username

  if (!isActive) return null

  return (
    <>
      <CommunityWrapper>
        <Birdcage>{renderBird()}</Birdcage>
        {renderRoleExplanations()}
      </CommunityWrapper>
      {isOwnProfile && (
        <ProfileDonationForm
          username={username}
          activeDonor={activeDonor || false}
          isCommunity={activeReviewer || activeAuthor || false}
        />
      )}
    </>
  )

  function renderBird() {
    if (activeReviewer) return <BirdReviewerSVG />
    if (activeAuthor) return <BirdAuthorSVG />
    if (activeDonor) return <BirdDonorSVG />
  }

  function renderRoleExplanations() {
    return (
      <ExplanationsWrapper>
        {activeReviewer && (
          <Explanation>
            <ReviewerBadge /> {renderExplanationText('activeReviewers')}
          </Explanation>
        )}
        {activeAuthor && (
          <Explanation>
            <AuthorBadge /> {renderExplanationText('activeAuthors')}
          </Explanation>
        )}
        {activeDonor && (
          <Explanation>
            <DonorBadge /> {renderExplanationText('activeDonors')}
          </Explanation>
        )}
      </ExplanationsWrapper>
    )
  }

  function renderExplanationText(
    key: 'activeDonors' | 'activeAuthors' | 'activeReviewers'
  ) {
    if (isOwnProfile) {
      const counts = fetchGroupsTotalCounts()
      const parts = bannerContent[key].ownProfileMessage.split('%no%')
      const ownProfileMessage = (
        <>
          {parts[0]}
          <b>{counts && counts[key].totalCount}</b>
          {parts[1]}
        </>
      )
      return <StyledP>{ownProfileMessage}</StyledP>
    }

    return (
      <StyledP>
        {bannerContent[key].otherUserProfileMessage.replace(
          '%username%',
          username
        )}{' '}
        {bannerContent[key].callToAction}
      </StyledP>
    )
  }

  interface TotalCounts {
    activeReviewers: {
      totalCount: number
    }
    activeDonors: {
      totalCount: number
    }
    activeAuthors: {
      totalCount: number
    }
  }

  function fetchGroupsTotalCounts() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useGraphqlSwr<TotalCounts>({
      query: gql`
        {
          activeReviewers {
            totalCount
          }
          activeDonors {
            totalCount
          }
          activeAuthors {
            totalCount
          }
        }
      `,
      config: {
        refreshInterval: 60 * 1000, // seconds
      },
    })
    return data
  }
}

const CommunityWrapper = styled.section`
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: flex;
  }
`

const Birdcage = styled.div`
  max-width: 200px;
  margin-bottom: 40px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`

const ExplanationsWrapper = styled.div`
  ${makeMargin}
`
const Explanation = styled.div`
  display: flex;
  > svg {
    width: 80px;
    margin-top: -25px;
  }
`
