import React from 'react'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { SearchResults } from '@/components/navigation/search-results'
import { useInstanceData } from '@/contexts/instance-context'

export function Search() {
  const { strings } = useInstanceData()

  const renderResults = () => {
    // @ts-expect-error probably need a helper like in get-initial-props
    if (typeof window.google === 'undefined') {
      setTimeout(() => {
        renderResults()
      }, 100)
      return false
    }

    // @ts-expect-error probably need a helper like in get-initial-props
    window.google.search.cse.element.render({
      div: 'gcs-results',
      tag: 'searchresults-only',
    })
  }

  React.useEffect(() => {
    renderResults()
  })

  return (
    <>
      <HeadTags data={{ title: `Serlo.org - ${strings.header.search}` }} />
      <StyledSearchResults>
        <div id="gcs-results"></div>
      </StyledSearchResults>
    </>
  )
}

const StyledSearchResults = styled(SearchResults)`
  padding: 50px 0;
`
