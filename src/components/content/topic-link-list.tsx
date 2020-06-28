import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { Link } from './link'
import { LinksInterface, TopicPurposes } from './topic'
import { getIconAndTitleByContentType } from '@/helper/header-by-content-type'

interface LinksProps {
  links: LinksInterface
  purpose: TopicPurposes
}

export type LinkInterfaceKeys = keyof LinksProps['links']

export function TopicLinkList({ links, purpose }: LinksProps) {
  return (
    <>
      {Object.keys(links).map((link) => {
        const key = link as LinkInterfaceKeys
        const iconAndTitle = getIconAndTitleByContentType(key)

        if (links[key] === undefined || links[key]!.length < 1) return null

        return (
          <LinkSection purpose={purpose} key={link}>
            <div>
              <LinkSectionHeadline>
                {iconAndTitle.title}{' '}
                <FontAwesomeIcon icon={iconAndTitle.icon} />
              </LinkSectionHeadline>

              {links[key]!.map((article) => {
                return (
                  <StyledLink
                    href={article.url}
                    key={article.url + '_' + article.title}
                  >
                    {article.title}
                  </StyledLink>
                )
              })}
            </div>
          </LinkSection>
        )
      })}
    </>
  )
}

const LinkSection = styled.div<{ purpose: TopicPurposes }>`
  align-items: flex-start;
  display: flex;

  margin-bottom: ${(props) =>
    props.purpose === TopicPurposes.overview && '1.5rem'};

  margin-top: ${(props) => props.purpose !== TopicPurposes.overview && '20px'};
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: ${(props) =>
      props.purpose !== TopicPurposes.overview ? '20px' : '8px'};
  }

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const LinkSectionHeadline = styled.h4`
  color: ${(props) => props.theme.colors.dark1};
  font-size: 1.125rem;
  margin: 0 0 13px;
  font-weight: 600;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.brand};
  cursor: pointer;
  font-size: 1.2rem;
  margin-bottom: 12px;
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
