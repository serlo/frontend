import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { LinksInterface, TopicPurposes } from './topic'

interface LinksProps {
  links: LinksInterface
  purpose: TopicPurposes
}

interface IconProps {
  icon: string
  size: IconSizeEnum
}

enum IconSizeEnum {
  two = '2x',
  three = '3x'
}

enum HeadlineEnum {
  courses = 'Kurse',
  articles = 'Artikel',
  videos = 'Videos',
  applets = 'Applets',
  excercises = 'Aufgaben'
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
    case 'excercises':
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

export function TopicLinkList({ links, purpose }: LinksProps) {
  const IconsSize =
    purpose === TopicPurposes.detail ? IconSizeEnum.three : IconSizeEnum.two
  return (
    <>
      {Object.keys(links).map(link => {
        return (
          <>
            {links[link] && links[link].length > 0 && (
              <LinkSection purpose={purpose}>
                <IconWrapper purpose={purpose}>
                  <RenderIcon icon={link} size={IconsSize}></RenderIcon>
                </IconWrapper>
                <div>
                  {purpose === TopicPurposes.detail && (
                    <LinkSectionHeadline>
                      {HeadlineEnum[link]}
                    </LinkSectionHeadline>
                  )}
                  {links[link].map(article => {
                    return <Link href={article.url}>{article.title}</Link>
                  })}
                </div>
              </LinkSection>
            )}
          </>
        )
      })}
    </>
  )
}

const LinkSection = styled.div<{ purpose: TopicPurposes }>`
  align-items: flex-start;
  display: flex;
  ${props =>
    props.purpose === TopicPurposes.overview
      ? `
      margin-bottom: 1.5rem;
        `
      : `
      margin-top: 3rem;
        `}
`

const LinkSectionHeadline = styled.h4`
  color: ${props => props.theme.colors.dark1};
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 0.5rem;
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
  ${props =>
    props.purpose === TopicPurposes.overview
      ? `
        min-width: 4rem;
        `
      : `
            min-width: 8rem;
        `}
`
