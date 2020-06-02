import React from 'react'
import styled from 'styled-components'
import { inputFontReset } from '../../helper/csshelper'

export default function SearchResults(props) {
  return <SearchResultsWrap {...props}>{props.children}</SearchResultsWrap>
}

const SearchResultsWrap = styled.div`
  .gsc-control-cse {
    border: 0;
    padding: 0;
  }

  .gsc-results-wrapper-overlay {
    top: 220px;
    padding: 0 0 220px 0;
    box-shadow: none;

    width: 96%;
    left: ${(props) => props.theme.defaults.sideSpacingMobile};

    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
      > div {
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }

  .gsc-modal-background-image {
    opacity: 1;
    top: 195px;
    @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
      top: 190px;
    }
  }

  .gsc-control-wrapper-cse {
    max-width: 800px;
    margin: 0 auto;

    .gsc-results-wrapper-visible::before {
      /* content: attr(data-customsearch); */
      content: 'Custom Search';
      font-weight: bold;
      display: block;
      color: ${(props) => props.theme.colors.brand};
      width: 100%;
      padding: 10px 0;
      background: url('//www.google.com/cse/static/images/1x/googlelogo_lightgrey_46x16dp.png')
        left center no-repeat;
      text-indent: 50px;

      @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
        max-width: 800px;
        margin: 0 auto;
      }
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
