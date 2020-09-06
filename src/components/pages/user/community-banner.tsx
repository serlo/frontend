import styled from 'styled-components'

import { ProfileProps } from './profile'
import BirdAuthorSVG from '@/assets-webkit/img/community/birds-author.svg'
import BirdDonorSVG from '@/assets-webkit/img/community/birds-donor.svg'
import BirdReviewerSVG from '@/assets-webkit/img/community/birds-reviewer.svg'
import { useInstanceData } from '@/contexts/instance-context'

const bannerContent = {
  activeAuthors: {
    img: 'authors.png',
    imgBig: 'big-author.png',
    otherUserProfileMessage:
      '%username% trägt als Autorin bzw. Autor dazu bei, dass immer mehr großartige Lerninhalte auf serlo.org zu finden sind.',
    callToAction:
      '<a style="text-decoration: underline;" href="https://de.serlo.org/mitmachen">Schon mal überlegt selbst mitzumachen?</a>.',
    ownProfileMessage:
      'Zusammen mit dir sind wir schon %no% Autorinnen und Autoren, die aktiv an serlo.org mitarbeiten.',
  },
  activeDonors: {
    img: 'donors.png',
    imgBig: 'big-donor.png',
    otherUserProfileMessage:
      '%username% trägt mit einer regelmäßigen Spende dazu bei, dass serlo.org komplett kostenlos, werbefrei und unabhängig ist.',
    callToAction:
      '<a style="text-decoration: underline;" href="/user/me#spenden">Kannst auch du dir vorstellen, uns mit einem kleinen Betrag zu unterstützen?</a>',
    ownProfileMessage:
      'Wir sind die ersten %no% Pioniere beim Aufbau einer langfristigen und unabhängigen Finanzierung für serlo.org.',
  },
  activeReviewers: {
    img: 'reviewers.png',
    imgBig: 'big-reviewer.png',
    otherUserProfileMessage:
      'Als Reviewerin bzw. Reviewer sichert %username% die Qualität auf serlo.org und hilft unseren Autorinnen und Autoren.',
    ownProfileMessage:
      'Als Team von %no% Reviewerinnen und Reviewern sorgen wir für die Qualität unserer Lernplattform.',
  },
}

export const CommunityBanner = ({ userData }: ProfileProps) => {
  const { lang, strings } = useInstanceData()
  const { activeReviewer, activeDonor, activeAuthor } = userData

  const isActive = activeReviewer || activeDonor || activeAuthor

  if (!isActive || lang !== 'de') return null

  return (
    <CommunityWrapper>
      <Birdcage>{renderBird()}</Birdcage>
      {renderRoleExplanations()}
    </CommunityWrapper>
  )

  function renderBird() {
    if (activeReviewer) return <BirdReviewerSVG />
    if (activeAuthor) return <BirdAuthorSVG />
    if (activeDonor) return <BirdDonorSVG />
  }

  function renderRoleExplanations() {
    return (
      <div>
        {activeReviewer && (
          <div>{bannerContent.activeReviewers.otherUserProfileMessage}</div>
        )}
        {activeAuthor && 'test'}
        {activeDonor && 'test'}
      </div>
    )
  }
}

const CommunityWrapper = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: flex;
  }
`

const Birdcage = styled.div`
  max-width: 200px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 25%;
  }
`

// const ExplanationsWrapper = styled.div`

// `
