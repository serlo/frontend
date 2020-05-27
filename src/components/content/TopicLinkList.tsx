import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faNewspaper,
  faPlayCircle,
  faCubes,
  faFile,
  faCircle,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
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
  three = '3x',
}

enum HeadlineEnum {
  courses = 'Kurse',
  articles = 'Artikel',
  videos = 'Videos',
  applets = 'Applets',
  exercises = 'Aufgaben',
  subfolders = 'Bereiche',
}

const iconObjects = {
  courses: faGraduationCap,
  articles: faNewspaper,
  videos: faPlayCircle,
  applets: faCubes,
  exercises: faFile,
  subfolders: faFolderOpen,
}

function RenderIcon(props: IconProps) {
  // TODO: this should be checked in IconProps instead
  const icon = props.icon as keyof typeof iconObjects
  return (
    <FontAwesomeIcon icon={iconObjects[icon] || faCircle} size={props.size} />
  )
}

export default function TopicLinkList({ links, purpose }: LinksProps) {
  // purpose === TopicPurposes.detail ? IconSizeEnum.three : IconSizeEnum.two
  return (
    <>
      {Object.keys(links).map((link) => {
        // TODO: are we sure this is correct? There seems to be no semantic connection between LinksProps and HeadlineEnum.
        const key = link as keyof LinksProps['links']
        return links[key] && links[key]!.length > 0 ? (
          <LinkSection purpose={purpose} key={link}>
            {/* <IconWrapper purpose={purpose} title={HeadlineEnum[link]}>
              <RenderIcon icon={link} size={IconsSize} />
            </IconWrapper> */}
            <div>
              {/* {purpose === TopicPurposes.detail && ( */}
              <LinkSectionHeadline>
                <RenderIcon icon={link} size={IconSizeEnum.one} />{' '}
                {/* TODO: the potential relation between LinkProps and HeadlineEnum should be explicit in code */}
                {/* @ts-ignore */}
                {HeadlineEnum[key]}
              </LinkSectionHeadline>
              {/* TODO: semantic error since this could be undefined */}
              {links[key]!.map((article) => {
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

const Link = styled.a`
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
