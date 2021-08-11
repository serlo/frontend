import styled from 'styled-components'

import { TopicCategory } from './topic-category'
import { Link } from '@/components/content/link'
import { TaxonomyData, TaxonomySubTerm } from '@/data-types'
import { makeMargin } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export interface TopicProps {
  data: TaxonomyData
}

export interface SubTopicProps {
  data: TaxonomySubTerm
  subid: number
  id: number
}

export function SubTopic({ data, subid, id }: SubTopicProps) {
  return (
    <>
      <h2 className="my-3">
        <StyledLink href={data.url} path={[subid, 'title']}>
          {data.title}
        </StyledLink>
      </h2>

      <Wrapper>
        <Overview>
          {' '}
          <div className="mt-6 sm:mb-5">
            {data.description &&
              renderArticle(data.description, `tax${id}`, `subtopic${subid}`)}
          </div>
        </Overview>

        <LinkList>
          <TopicCategory category="articles" links={data.articles} id={subid} />
          <TopicCategory
            category="exercises"
            links={data.exercises}
            id={subid}
          />
          <TopicCategory category="videos" links={data.videos} id={subid} />
          <TopicCategory category="applets" links={data.applets} id={subid} />
          <TopicCategory category="courses" links={data.courses} id={subid} />
          <TopicCategory category="folders" links={data.folders} id={subid} />
          <TopicCategory category="events" links={data.events} id={subid} />

          <TopicCategory category="unrevised" links={data.events} id={subid} />
        </LinkList>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightgray};
  &:last-child {
    border-bottom: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpointsMax.mobile}) {
    flex-direction: column;
  }
`

const Overview = styled.div`
  flex: 1 1 40%;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.brand};
  display: block;
  font-size: 1.65rem;
  text-decoration: none;
  ${makeMargin}
  hyphens: auto;
  font-weight: bold;

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
