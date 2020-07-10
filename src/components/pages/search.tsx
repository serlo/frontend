import React from 'react'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { SearchResults } from '@/components/navigation/search-results'
import { useInstanceData } from '@/contexts/instance-context'

export function Search() {
  const { strings } = useInstanceData()
  return (
    <>
      <HeadTags data={{ title: `Serlo.org - ${strings.header.search}` }} />
      <StyledSearchResults>
        <div className="gcse-searchresults"></div>
      </StyledSearchResults>
    </>
  )
}

const StyledSearchResults = styled(SearchResults)`
  padding: 50px 0;
`
