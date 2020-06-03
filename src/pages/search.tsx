import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

import { CookieBar } from '@/components/content/cookie-bar'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { SearchResults } from '@/components/navigation/search-results'

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Serlo.org - Suche</title>
      </Head>
      <Header />
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
