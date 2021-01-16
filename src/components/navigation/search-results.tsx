import styled from 'styled-components'

import { makeMargin, inputFontReset } from '../../helper/css'

export const SearchResults = styled.div`
  ${makeMargin}

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
      ${inputFontReset}
      line-height: 1.33rem;
    }
  }

  .gsc-webResult .gsc-result {
    padding-bottom: 15px;
  }

  .gsc-table-cell-thumbnail.gsc-thumbnail {
    display: none;
  }
`
