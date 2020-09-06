import React from 'react'
import styled from 'styled-components'

import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import { StyledP } from '@/components/tags/styled-p'
import { makeLightButton } from '@/helper/css'

interface ProfileDonationFormProps {
  activeDonor: boolean
  username: string
  isCommunity: boolean
}

export const ProfileDonationForm = ({
  activeDonor,
  username,
  isCommunity,
}: ProfileDonationFormProps) => {
  const [expanded, setExpanded] = React.useState(false)

  const refIframe = React.useRef<null | HTMLIFrameElement>(null)

  React.useEffect(() => {
    function donationFormListener(event: MessageEvent) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (event.data.type === 'size' && refIframe.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        refIframe.current.setAttribute('height', event.data.value)
      }
    }

    if (window.addEventListener) {
      window.addEventListener('message', donationFormListener, false)
    }
  })

  if (activeDonor) return null

  //TODO: get user id or check if we really need it here
  const encodedCampaignId = encodeURIComponent(
    `Spendenprofil { userId: 0, userName: ${username} }`
  )

  // <img src="${donorPicture}" width="23"></img>

  return (
    <DonationWrapper>
      <div>
        <StyledP>
          Hallo <b>{username}</b>,
        </StyledP>
        <StyledP>
          wir von Serlo setzen uns dafür ein, dass alle Menschen weltweit freien
          Zugang zu hochwertiger Bildung haben. Leider sind immer mehr digitale
          Bildungsangebote
        </StyledP>
        {!expanded && (
          <StyledP>
            <Button onClick={() => setExpanded(true)}>Mehr anzeigen…</Button>
          </StyledP>
        )}
        {expanded && (
          <>
            <StyledP>
              bezahlpflichtig oder voller Werbung. Da gehen wir einen anderen
              Weg. Unsere Lernplattform gehört einem gemeinnützigen Verein.
              Serlo bleibt <b>für immer</b> komplett kostenlos und werbefrei.
              Und wir haben Erfolg damit! Über 1 Mio Menschen nutzen serlo.org
              jeden Monat.
            </StyledP>
            <StyledP>
              Dieses Jahr planen wir tausende neue Übungsaufgaben und
              Erklärungen, entwickeln neue, interaktive Aufgabenformate und
              starten weitere Fächer. Um das alles zu schaffen, bauen wir eine
              große Community auf. Wenn viele mitschreiben, Feedback geben oder
              nur einen kleinen monatlichen Betrag spenden, kann unsere Vision
              Realität werden.
            </StyledP>
            <StyledP>
              {isCommunity
                ? 'Du bist schon Teil dieser Community. Kannst du dir dennoch vorstellen, auch einen kleinen finanziellen Beitrag zu leisten? Dann nutze bitte das Formular rechts.'
                : 'Kannst du dir vorstellen, unsere Arbeit als Spenderin bzw. Spender zu fördern und Teil der Community zu werden? Dann nutze bitte das Formular rechts.'}
            </StyledP>
            <StyledP>Vielen Dank!</StyledP>
          </>
        )}
        <StyledP>
          <DonorBadge width="110px" />
        </StyledP>
      </div>
      <StyledIframe
        ref={refIframe}
        src={`https://spenden.twingle.de/serlo-education-e-v/spendenprofil/tw5e8dbb1390e8b/page?tw_cid=${encodedCampaignId}`}
      />
    </DonationWrapper>
  )
}

const StyledIframe = styled.iframe`
  border: 0;
`

const Button = styled.button`
  ${makeLightButton}
`

const DonationWrapper = styled.section`
  display: flex;
`
