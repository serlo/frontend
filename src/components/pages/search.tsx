import { useEffect } from 'react'

import { HeadTags } from '../head-tags'
import { MaxWidthDiv } from '../navigation/max-width-div'
import { useInstanceData } from '@/contexts/instance-context'

interface GoogleSearchGlobal {
  google: {
    search: {
      cse: {
        element: {
          render: (arg0: { div: string; tag: string }) => void
        }
      }
    }
  }
}

export function Search() {
  const { strings } = useInstanceData()

  const renderResults = () => {
    const _window = window as unknown as Window & GoogleSearchGlobal
    if (typeof _window.google === 'undefined') {
      setTimeout(() => {
        renderResults()
      }, 100)
      return false
    }

    _window.google.search.cse.element.render({
      div: 'gcs-results',
      tag: 'searchresults-only',
    })
  }

  useEffect(() => {
    renderResults()
  })

  return (
    <>
      <style jsx global>{`
        #___gcse_2 {
          display: none; /*somehow it renders twice -_-*/
        }

        .gsc-control-cse {
          border: 0;
          padding: 0;
        }

        .gsc-results-wrapper-overlay {
          top: 220px;
          padding: 0 0 220px 0;
          box-shadow: none;

          width: 96%;
          @apply left-side;

          @screen sm {
            > div {
              max-width: 800px;
              margin: 0 auto;
            }
          }
        }

        .gsc-modal-background-image {
          opacity: 1;
          top: 195px;
          @screen sm {
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
          @apply !font-serlo tracking-slightly-tighter;
          .gs-spelling,
          .gs-result .gs-title,
          .gs-result .gs-title * {
            font-size: 1.125rem;
            text-decoration: none;
          }

          &,
          .gsc-table-result {
            font-size: 1rem;
            @apply !font-serlo tracking-slightly-tighter;
            line-height: 1.33rem;
          }
        }

        .gsc-webResult .gsc-result {
          padding-bottom: 15px;
        }

        .gsc-table-cell-thumbnail.gsc-thumbnail {
          display: none;
        }
      `}</style>
      <HeadTags
        data={{ title: `Serlo.org - ${strings.header.search}` }}
        noindex
      />
      <MaxWidthDiv>
        <div className="py-12 px-0 mx-side">
          <div id="gcs-results"></div>
        </div>
      </MaxWidthDiv>
    </>
  )
}
