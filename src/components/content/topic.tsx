import { faShareAlt, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'

import { makeMargin } from '../../helper/css'
import { renderArticle, EditorState } from '../../schema/article-renderer'
import { ShareModal } from '../navigation/share-modal'
import { UserToolsMobileButton } from '../navigation/tool-line-button'
import { UserTools } from '../navigation/user-tools'
import { UserToolsMobile } from '../navigation/user-tools-mobile'
import { TopicLinkList } from './topic-link-list'

export interface LinkInterface {
  title: string
  url: string
}

export interface LinksInterface {
  subfolders?: LinkInterface[]
  courses?: LinkInterface[]
  articles?: LinkInterface[]
  videos?: LinkInterface[]
  applets?: LinkInterface[]
  exercises?: LinkInterface[]
}

export enum TopicPurposes {
  overview,
  detail,
}

export interface TopicProp {
  title: string
  url?: string
  description: EditorState
  purpose?: TopicPurposes
  links: LinksInterface
  children?: TopicProp[]
  exercises: EditorState[]
  id: number
}

export interface TopicProps {
  data: TopicProp
  contentId?: number
}

export function Topic({ data, contentId }: TopicProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {data.purpose === TopicPurposes.detail ? (
        <>
          <Headline>
            {data.title}
            {data.exercises.length > 0 && (
              <span title="Aufgabensammlung">
                {' '}
                <StyledIcon icon={faFile} />{' '}
              </span>
            )}
          </Headline>
          <UserToolsMobile>
            <UserToolsMobileButton isOnTop onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
            </UserToolsMobileButton>
          </UserToolsMobile>
        </>
      ) : (
        <h2>
          <Link as={decodeURIComponent(data.url!)} href="/[...slug]">
            <HeadlineLink href={data.url}>{data.title}</HeadlineLink>
          </Link>
        </h2>
      )}
      <Wrapper purpose={data.purpose}>
        <Overview purpose={data.purpose}>
          {data.description && renderArticle(data.description.children)}
        </Overview>
        {data.children &&
          data.children.map((child) => (
            <React.Fragment key={child.title}>
              <Topic data={child} />
            </React.Fragment>
          ))}
        {data.exercises &&
          data.exercises.map((exercise, i) => (
            <React.Fragment key={i}>
              {renderArticle(exercise.children)}
            </React.Fragment>
          ))}
        <LinkList>
          <TopicLinkList
            links={data.links || {}}
            purpose={data.purpose || TopicPurposes.overview}
          ></TopicLinkList>
        </LinkList>
      </Wrapper>

      {data.purpose === TopicPurposes.detail && (
        <>
          <UserToolsMobile>
            <UserToolsMobileButton onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
            </UserToolsMobileButton>
          </UserToolsMobile>
          <UserTools onShare={() => setOpen(true)} hideEdit />
          <ShareModal
            open={open}
            onClose={() => setOpen(false)}
            contentId={contentId}
          />
        </>
      )}
    </>
  )
}

const Wrapper = styled.div<{ purpose: TopicPurposes | undefined }>`

  margin-bottom: 20px;
  padding-bottom: 10px;

    ${(props) =>
      props.purpose === TopicPurposes.overview &&
      css`
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid ${(props) => props.theme.colors.lightgray};
        &:last-child {
          border-bottom: 0;
        }
      `}
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const Headline = styled.h1`
  font-size: 2rem;
  ${makeMargin}
  margin-top: 32px;
  margin-bottom: 40px;
`

const HeadlineLink = styled.a`
  color: ${(props) => props.theme.colors.brand};
  display: block;
  font-size: 1.65rem;
  text-decoration: none;
  ${makeMargin}
  hyphens: auto;

  &:hover {
    text-decoration: underline;
  }
`

const LinkList = styled.div`
  display: flex;
  flex: 1 1 55%;
  flex-direction: column;
  ${makeMargin}
  margin-top: 6px;
`

const Overview = styled.div<{ purpose: TopicPurposes | undefined }>`
  img {
    margin-top: 22px;
    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
      margin-bottom: 20px;
    }
  }

  ${(props) =>
    props.purpose === TopicPurposes.overview &&
    css`
      flex: 1 1 40%;
    `}
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.43rem;
  vertical-align: initial;
`
