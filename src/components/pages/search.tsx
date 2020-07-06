import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

import { SearchResults } from '@/components/navigation/search-results'

export function Search() {
  return (
    <>
      <Head>
        <title>Serlo.org - Suche</title>
      </Head>
      <StyledSearchResults>
        <div className="gcse-searchresults"></div>
      </StyledSearchResults>
    </>
  )
}

const StyledSearchResults = styled(SearchResults)`
  padding: 50px 0;
`
