import { Fragment } from 'react'
import styled from 'styled-components'

import { UnstyledLink } from '../content/link'
import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import TimeBadge from '@/assets-webkit/img/community/badge-time.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { makeMargin } from '@/helper/css'

export function ProfileBadges({
  userData,
  date,
}: {
  userData: UserPage['userData']
  date: string
}) {
  const registerDate = new Date(date)
  const { strings, lang } = useInstanceData()

  const badges = [...getBadges()]

  return badges.length > 0 ? (
    <BadgesContainer>
      {badges.map((badge, index) => (
        <Fragment key={index}>{badge}</Fragment>
      ))}
    </BadgesContainer>
  ) : null

  function* getBadges() {
    const { activeDonor, activeReviewer, activeAuthor } = userData

    for (const [hasBadge, key, Badge] of [
      [activeReviewer, 'reviewer', <ReviewerBadge key={0} />],
      [activeAuthor, 'author', <AuthorBadge key={1} />],
      [activeDonor, 'donor', <DonorBadge key={2} />],
    ] as const) {
      if (hasBadge)
        yield renderBadge({ Badge, name: strings.roles[key], anchor: key })
    }

    yield* getTimeBadge()
  }

  function* getTimeBadge() {
    const elapsed = new Date().getTime() - new Date(registerDate).getTime()
    const years = Math.floor(elapsed / (365.25 * 24 * 60 * 60 * 1000))

    if (years < 1) return

    const maxYears = 5
    const { yearWithSerlo, yearsWithSerlo } = strings.profiles

    yield renderBadge({
      Badge: (
        <>
          <TimeBadgeNumber>
            {years > maxYears && (
              <span className="text-lg align-text-top inline-block pt-1 pr-1">
                &gt;
              </span>
            )}
            {Math.min(years, maxYears)}
          </TimeBadgeNumber>
          <TimeBadge />
        </>
      ),
      name: years === 1 ? yearWithSerlo : yearsWithSerlo,
    })
  }

  function renderBadge({
    Badge,
    name,
    anchor,
  }: {
    Badge: JSX.Element
    name: string
    anchor?: string
  }) {
    const content = (
      <BadgeContainer>
        {Badge}
        <p className="text-sm leading-tight">{name}</p>
      </BadgeContainer>
    )
    return (
      <>
        {lang === 'de' && anchor ? (
          <UnstyledLink
            href={`/community/202923/rollen-der-serlo-community#${anchor}`}
          >
            {content}
          </UnstyledLink>
        ) : (
          content
        )}
      </>
    )
  }
}

const BadgesContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    justify-content: left;
  }
  ${makeMargin}
`

const BadgeContainer = styled.div`
  margin-right: 30px;
  width: 65px;
  > svg {
    height: 40px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  > * {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
`

const TimeBadgeNumber = styled.div`
  position: absolute;
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  width: 65px;
  margin-top: 13px;
`
