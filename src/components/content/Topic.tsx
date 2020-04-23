import React from 'react'
import styled from 'styled-components'
import TopicLinkList from './TopicLinkList'
import { renderArticle } from '../../schema/articleRenderer'
import { makeMargin } from '../../helper/csshelper'

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
  excercises?: LinkInterface[]
}

export enum TopicPurposes {
  overview,
  detail
}

interface TopicProp {
  title: string
  url?: string
  description: any
  purpose?: TopicPurposes
  links: LinksInterface
  children?: TopicProp[]
  exercises: any
}

interface TopicProps {
  data: TopicProp
}

export default function Topic({ data }: TopicProps) {
  //only show when description actually has content. probably better to filter upstream

  const showDescription = !(
    data.description.length === 1 &&
    data.description[0].type === 'p' &&
    data.description[0].children[0].text === ''
  )

  return (
    <>
      {data.purpose === TopicPurposes.detail ? (
        <Headline>{data.title}</Headline>
      ) : (
        <h2>
          <HeadlineLink href={data.url}>{data.title}</HeadlineLink>
        </h2>
      )}

      <Wrapper purpose={data.purpose}>
        {showDescription && (
          <Overview>{renderArticle(data.description)}</Overview>
        )}
        {data.children &&
          data.children.map(child => (
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
    </>
  )
}

const Wrapper = styled.div<{ purpose: TopicPurposes }>`
  display: flex;

  border-bottom: 1px solid ${props => props.theme.colors.lightgray};
  &:last-child{
    border-bottom: 0;
  }

  margin-bottom: 20px;
  padding-bottom: 10px;

    ${props =>
      props.purpose === TopicPurposes.overview
        ? `
            flex-direction: row;
        `
        : `
            flex-direction: column;
        `}
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const Headline = styled.h1`
  font-size: 2rem;
  ${makeMargin}
  margin-top: 32px;
`

const HeadlineLink = styled.a`
  color: ${props => props.theme.colors.brand};
  /* cursor: pointer; */
  display: block;
  font-size: 1.65rem;
  text-decoration: none;

  ${makeMargin}
  /* margin-bottom: 10px; */

  &:hover {
    text-decoration: underline;
  }
`

const LinkList = styled.div`
  display: flex;
  flex: 1 1 55%;
  flex-direction: column;
  ${makeMargin}
`

const TopicImage = styled.img`
  margin: 0 auto 1rem;
  max-width: 90%;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin: 0;
`

const Overview = styled.div`
  flex: 1 1 40%;
  img {
    margin-top: 22px;
    @media (min-width: ${props => props.theme.breakpoints.sm}) {
      margin-bottom: 20px;
    }
  }
`
