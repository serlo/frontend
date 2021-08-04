import { Fragment } from 'react'
import styled from 'styled-components'

import { UnstyledLink } from '../content/link'
import AuthorBadge from '@/assets-webkit/img/community/badge-author.svg'
import DonorBadge from '@/assets-webkit/img/community/badge-donor.svg'
import ReviewerBadge from '@/assets-webkit/img/community/badge-reviewer.svg'
import { useInstanceData } from '@/contexts/instance-context'
import { UserPage } from '@/data-types'
import { makeMargin } from '@/helper/css'
import { isDefined } from '@/helper/utils'

export function ProfileBadges({
  userData,
  date,
}: {
  userData: UserPage['userData']
  date: string
}) {
  const registerDate = new Date(date)
  const { strings, lang } = useInstanceData()

  const { activeDonor, activeReviewer, activeAuthor } = userData
  const badges = [
    activeReviewer &&
      renderBadge({
        Badge: <ReviewerBadge />,
        name: strings.roles.reviewer,
        anchor: 'reviewer',
      }),
    activeAuthor &&
      renderBadge({
        Badge: <AuthorBadge />,
        name: strings.roles.author,
        anchor: 'author',
      }),
    activeDonor &&
      renderBadge({
        Badge: <DonorBadge />,
        name: strings.roles.donor,
        anchor: 'donor',
      }),
    renderTimeBadge(),
  ].filter(isDefined)

  return badges.length > 0 ? (
    <BadgesContainer>
      {badges.map((badge, index) => (
        <Fragment key={index}>{badge}</Fragment>
      ))}
    </BadgesContainer>
  ) : null

  function renderTimeBadge() {
    const elapsed = new Date().getTime() - new Date(registerDate).getTime()
    const years = Math.floor(elapsed / (365.25 * 24 * 60 * 60 * 1000))

    if (years < 1) return null

    const maxYears = 5
    const { yearWithSerlo, yearsWithSerlo } = strings.profiles

    return renderBadge({
      Badge: (
        <svg viewBox="0 0 100 100">
          <path
            d="m 98.373744,42.123443 v 3.20708 c -1.38186,12.09087 0.12091,29.30964 -13.49038,41.14326 -10.91667,12.10802 -25.01161,11.57636 -38.70926,11.88507 -6.92656,0.15435 -13.35219,-0.90896 -18.89689,-3.36144 a 37.396497,37.130119 0 0 1 -13.52492,-9.9471 C 5.6166143,75.703473 2.6628943,64.075663 1.6264943,55.809273 v -0.3087 c 0,-13.15418 1.27822,-30.2529 13.2485597,-40.66305 C 26.845384,4.4273633 36.449284,1.4775333 51.027874,1.6318933 h 7.46203 c 11.7976,0.15435 21.6606,6.86006 28.9499,13.8916297 a 38.001059,37.730375 0 0 1 10.93394,26.59992 z"
            style={{
              fill: '#bcd179',
              stroke: 'black',
              strokeWidth: 3.25,
            }}
          />
          <text textAnchor="middle" x="50" y="66" style={{ fontSize: 50 }}>
            {years > maxYears && '>'}
            {Math.min(years, maxYears)}
          </text>
        </svg>
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
