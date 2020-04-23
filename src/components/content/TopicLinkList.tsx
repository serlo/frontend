import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { LinksInterface, TopicPurposes } from './Topic'

interface LinksProps {
  links: LinksInterface
  purpose: TopicPurposes
}

interface IconProps {
  icon: string
  size: IconSizeEnum
}

enum IconSizeEnum {
  one = '1x',
  two = '2x',
  three = '3x'
}

enum HeadlineEnum {
  courses = 'Kurse',
  articles = 'Artikel',
  videos = 'Videos',
  applets = 'Applets',
  exercises = 'Aufgaben'
}

function RenderIcon(props: IconProps) {
  switch (props.icon) {
    case 'courses':
      return (
        <FontAwesomeIcon
          icon={faGraduationCap}
          size={props.size}
          color="#333333"
        />
      )
    case 'articles':
      return (
        <FontAwesomeIcon icon={faNewspaper} size={props.size} color="#333333" />
      )
    case 'videos':
      return (
        <FontAwesomeIcon
          icon={faPlayCircle}
          size={props.size}
          color="#333333"
        />
      )
    case 'applets':
      return (
        <FontAwesomeIcon icon={faCubes} size={props.size} color="#333333" />
      )
    case 'exercises':
      return <FontAwesomeIcon icon={faFile} size={props.size} color="#333333" />
    case 'subfolders':
      return (
        <FontAwesomeIcon
          icon={faFolderOpen}
          size={props.size}
          color="#333333"
        />
      )
    default:
      return (
        <FontAwesomeIcon icon={faCircle} size={props.size} color="#333333" />
      )
  }
}

export default function TopicLinkList({ links, purpose }: LinksProps) {
  const IconsSize =
    purpose === TopicPurposes.detail ? IconSizeEnum.three : IconSizeEnum.two
  return (
    <>
      {Object.keys(links).map(link => {
        // console.log(HeadlineEnum[link])
        console.log(link)

        return links[link] && links[link].length > 0 ? (
          <LinkSection purpose={purpose} key={link}>
            <IconWrapper purpose={purpose} title={HeadlineEnum[link]}>
              <RenderIcon icon={link} size={IconsSize}></RenderIcon>
            </IconWrapper>
            <div>
              {purpose === TopicPurposes.detail && (
                <LinkSectionHeadline>
                  <RenderIcon size={IconSizeEnum.one} icon={link}></RenderIcon>{' '}
                  {HeadlineEnum[link]}
                </LinkSectionHeadline>
              )}
              {links[link].map(article => {
                return (
                  <Link
                    href={article.url}
                    key={article.url + '_' + article.title}
                  >
                    {article.title}
                  </Link>
                )
              })}
            </div>
          </LinkSection>
        ) : null
      })}
    </>
  )
}

const LinkSection = styled.div<{ purpose: TopicPurposes }>`
  align-items: flex-start;
  display: flex;

  margin-bottom: ${props =>
    props.purpose === TopicPurposes.overview && '1.5rem'};

  margin-top: ${props => props.purpose !== TopicPurposes.overview && '20px'};
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: ${props =>
      props.purpose !== TopicPurposes.overview ? '20px' : '8px'};
  }

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const LinkSectionHeadline = styled.h4`
  color: ${props => props.theme.colors.dark1};
  font-size: 1.65rem;
  margin: 0 0 0.5rem;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    > svg {
      display: none;
    }
  }
`

const Link = styled.a`
  color: ${props => props.theme.colors.brand};
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1.6;
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const IconWrapper = styled.span<{ purpose: TopicPurposes }>`
  margin-top: 6px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 8px;
    margin-top: 16px;
    display: ${props =>
      props.purpose === TopicPurposes.overview ? 'inline-block' : 'none'};
  }

  ${props =>
    props.purpose === TopicPurposes.overview
      ? css`
          min-width: 4rem;
        `
      : css`
          min-width: 6rem;
        `}
`
