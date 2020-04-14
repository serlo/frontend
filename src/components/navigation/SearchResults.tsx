import React from 'react'
import styled from 'styled-components'
import { inputFontReset } from '../../helper/csshelper'

export default function SearchResults(props) {
  return <SearchResultsWrap>{props.children}</SearchResultsWrap>
}

const SearchResultsWrap = styled.div`
  .gsc-control-cse {
    border: 0;
    padding: 0;
    /* z-index: 20; */
  }

  .gsc-results-wrapper-overlay {
    top: 220px;
    padding: 0 6px 220px 6px;
    box-shadow: none;
  }

  .gsc-modal-background-image {
    top: 210px;
    opacity: 1;
  }

  .gsc-control-wrapper-cse {
    max-width: 800px;
    margin: 0 auto;

    .gsc-results-wrapper-visible::before {
      content: 'Custom Search';
      font-weight: bold;
      display: block;
      color: ${props => props.theme.colors.brand};
      width: 100%;
      padding: 10px 0;
      background: url('http://www.google.com/cse/static/images/1x/googlelogo_lightgrey_46x16dp.png')
        left center no-repeat;
      text-indent: 50px;
    }

    .gsc-url-top,
    div.gs-per-result-labels {
      display: none;
    }

    div.gs-title {
      margin-bottom: 4px;
    }
  }

  .gsc-control-cse {
    ${inputFontReset}

    .gs-spelling,
    .gs-result .gs-title,
    .gs-result .gs-title * {
      font-size: 1.125rem;
      text-decoration: none;
    }

    &,
    .gsc-table-result {
      font-size: 1rem;
    }
  }

  .gsc-webResult .gsc-result {
    padding-bottom: 15px;
  }

  .gsc-table-cell-thumbnail.gsc-thumbnail {
    display: none;
  }
`
