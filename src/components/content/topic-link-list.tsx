import {
  faGraduationCap,
  faNewspaper,
  faPlayCircle,
  faCubes,
  faFile,
  faCircle,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

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

export function TopicLinkList({ links, purpose }: LinksProps) {
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
                {/* TODO: the potential relation between LinkProps and HeadlineEnum should be explicit in code */}
                {/* @ts-ignore */}
                {HeadlineEnum[key]}{' '}
                <RenderIcon icon={link} size={IconSizeEnum.one} />
              </LinkSectionHeadline>
              {/* )} */}
              {/* TODO: semantic error since this could be undefined */}
              {links[key]!.map((article) => {
                return (
                  <Link
                    key={article.url + '_' + article.title}
                    href="/[...slug]"
                    as={decodeURIComponent(article.url)}
                  >
                    <StyledLink href={article.url}>{article.title}</StyledLink>
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

const StyledLink = styled.a`
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
