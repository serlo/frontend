import React from 'react'
import styled from 'styled-components'

import { CookieBar } from '../content/cookie-bar'
import { HeadTags } from '../head-tags'
import { Footer } from '../navigation/footer'
import { Header } from '../navigation/header'
import { SearchResults } from '@/components/navigation/search-results'
import { useInstanceData } from '@/contexts/instance-context'

export function Search() {
  const { strings } = useInstanceData()
  return (
    <>
      <Header onSearchPage />
      <HeadTags data={{ title: `Serlo.org - ${strings.header.search}` }} />
      <StyledSearchResults>
        <div className="gcse-searchresults"></div>
      </StyledSearchResults>
      <Footer />
      <CookieBar />
    </>
  )
}

const StyledSearchResults = styled(SearchResults)`
  padding: 50px 0;
`
