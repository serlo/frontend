import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Header from '@/components/navigation/Header'
import SearchResults from '@/components/navigation/SearchResults'
import CookieBar from '@/components/content/CookieBar'
import Footer from '@/components/navigation/Footer'

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
