import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gql } from 'graphql-request'
import React from 'react'
import styled from 'styled-components'

import { PageTitle } from '../content/page-title'
import { LoadingSpinner } from '../navigation/loading-spinner'
import { StyledTable } from '../tags/styled-table'
import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EntityTypes } from '@/data-types'
import { getRawTitle } from '@/fetcher/create-title'
import { QueryResponse } from '@/fetcher/query'
import { makeLightButton } from '@/helper/css'
import { shouldUseNewAuth } from '@/helper/feature-auth'
import { entityIconMapping } from '@/helper/icon-by-entity-type'

/* TO DO: 
- sort out error / loading handling
*/

export function ManageSubscriptions() {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

  const { data, error } = useGraphqlSwrWithAuth<{
    subscriptions: {
      nodes: QueryResponse[]
    }
  }>({
    query: gql`
      query {
        subscriptions {
          nodes {
            __typename
            id
            alias
            ... on User {
              username
            }
            ... on TaxonomyTerm {
              type
              name
            }
            ... on Exercise {
              taxonomyTerms {
                nodes {
                  navigation {
                    path {
                      nodes {
                        label
                      }
                    }
                  }
                }
              }
            }
            ... on ExerciseGroup {
              taxonomyTerms {
                nodes {
                  navigation {
                    path {
                      nodes {
                        label
                      }
                    }
                  }
                }
              }
            }
            ... on Page {
              currentRevision {
                title
              }
            }
            ... on Article {
              currentRevision {
                title
              }
            }
            ... on Video {
              currentRevision {
                title
              }
            }
            ... on Applet {
              currentRevision {
                title
              }
            }
            ... on CoursePage {
              currentRevision {
                title
              }
            }
            ... on Course {
              currentRevision {
                title
              }
            }
            ... on Event {
              currentRevision {
                title
              }
            }
          }
        }
      }
    `,
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> only update on cache mutation
    },
  })

  if (!mounted) return null

  if (!loggedInData) return renderUnauthorized()

  const loggedInStrings = loggedInData.strings.subscriptions
  if (loggedInStrings === undefined) return null

  if (error) return renderUnknownError()
  if (!data) return renderLoading()

  return wrapInContainer(
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>{strings.entities.content}</StyledTh>
          <StyledTh>{loggedInStrings.mail}</StyledTh>
          <StyledTh>{loggedInStrings.subscription}</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        {data?.subscriptions.nodes.map((entry) => {
          const typenameCamelCase = (entry.__typename.charAt(0).toLowerCase() +
            entry.__typename.slice(1)) as keyof typeof strings.entities

          const title =
            getRawTitle(entry, 'de') ?? strings.entities[typenameCamelCase]

          const icon =
            entityIconMapping[typenameCamelCase as EntityTypes] ?? faCircle

          return (
            <StyledTr key={entry.id}>
              <StyledTd>
                <span title={strings.entities[typenameCamelCase]}>
                  {' '}
                  <StyledIcon icon={icon} />{' '}
                </span>
                <Link href={entry.alias ?? ''}>{title}</Link>
              </StyledTd>
              <CenteredTd>
                <Button
                  href={`https://de.serlo.org/subscription/update/${entry.id}/0`}
                >
                  {loggedInStrings.noMails}
                </Button>
              </CenteredTd>
              <CenteredTd>
                <Button
                  href={`https://de.serlo.org/subscription/update/${entry.id}/1`}
                >
                  {loggedInStrings.noNotifications}
                </Button>
              </CenteredTd>
            </StyledTr>
          )
        })}
      </tbody>
    </StyledTable>
  )

  function wrapInContainer(children: JSX.Element) {
    return (
      <>
        <PageTitle title={strings.subscriptions.title} headTitle />
        <Wrapper>{children}</Wrapper>
      </>
    )
  }

  // Turn into component
  function renderUnauthorized() {
    return wrapInContainer(
      <>
        <StyledP>
          <Link href="/api/auth/login">
            {strings.subscriptions.pleaseLogInLink}
          </Link>{' '}
          {strings.subscriptions.pleaseLogInText}
        </StyledP>
      </>
    )
  }

  function renderUnknownError() {
    console.log(error)
    return wrapInContainer(
      <>
        <StyledP>{loggedInStrings.unknownProblem}</StyledP>
      </>
    )
  }

  function renderLoading() {
    return wrapInContainer(<LoadingSpinner text={loggedInStrings.loading} />)
  }
}

const Wrapper = styled.div`
  margin-bottom: 80px;
`

const CenteredTd = styled(StyledTd)`
  text-align: center;
`

const Button = styled.a`
  ${makeLightButton}
  margin: 0 auto;
  font-size: 1rem;
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.brand};
`
