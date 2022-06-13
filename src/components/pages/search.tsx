import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { PageTitle } from '../content/page-title'
import { HeadTags } from '../head-tags'
import { GoogleSeachWrapper } from '../navigation/google-search-wrapper'
import { MaxWidthDiv } from '../navigation/max-width-div'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { submitEvent } from '@/helper/submit-event'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

// interface GoogleSearchGlobal {
//   google: {
//     search: {
//       cse: {
//         element: {
//           render: (arg0: { div: string; tag: string }) => void
//         }
//       }
//     }
//   }
// }

export function Search() {
  const { strings } = useInstanceData()
  const { checkConsent, giveConsent } = useConsent()
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    setConsentGiven(checkConsent(ExternalProvider.GoogleSearch))
  }, [checkConsent])

  return (
    <>
      <HeadTags
        data={{ title: `Serlo.org - ${strings.header.search}` }}
        noindex
      />
      <PageTitle title={strings.header.search} />
      {consentGiven ? renderSearch() : renderConsentBanner()}
    </>
  )

  function renderSearch() {
    return (
      <div className="mx-side">
        <MaxWidthDiv>
          <GoogleSeachWrapper />
        </MaxWidthDiv>
        <style jsx global>{`
          .gsc-input {
            font-size: 1.125rem !important;
            line-height: 2rem !important;
          }

          .gsc-search-button {
            height: 2.6rem !important;
          }

          .gsc-control-cse,
          .gsc-control-cse * {
            @apply !font-serlo tracking-slightly-tighter;
          }

          .gsc-control-cse {
            padding: 0 !important;
            .gs-spelling,
            .gs-result .gs-title,
            .gs-result .gs-title * {
              font-size: 1.125rem !important;
              text-decoration: none;
            }

            &,
            .gsc-table-result {
              font-size: 1.125rem !important;
              @apply !font-serlo tracking-slightly-tighter;
              line-height: 1.7rem !important;
            }
          }

          .gsc-refinementHeader {
            margin-top: 2rem;
          }

          .gsc-control-wrapper-cse {
            .gsc-url-top,
            div.gs-per-result-labels {
              display: none;
            }

            div.gs-title {
              margin-top: 10px;
              margin-bottom: 4px;
            }
          }

          .gsc-webResult .gsc-result {
            padding-bottom: 22px;
          }

          .gsc-table-cell-thumbnail.gsc-thumbnail {
            display: none;
          }
        `}</style>
      </div>
    )
  }

  function renderConsentBanner() {
    const explanation = replacePlaceholders(strings.search.privacy, {
      privacypolicy: (
        <a
          className="text-brand serlo-link font-bold"
          href="/privacy"
          target="_blank"
        >
          {strings.entities.privacyPolicy}
        </a>
      ),
    })
    return (
      <div className="text-brand rounded-xl border-2 mx-side px-side py-3">
        {explanation}
        <button
          className="serlo-button serlo-make-interactive-primary mt-2 mb-1 block py-0.5"
          onClick={() => {
            submitEvent('search-consented')
            giveConsent(ExternalProvider.GoogleSearch)
            window.location.reload()
          }}
        >
          {strings.search.agree}
        </button>
      </div>
    )
  }
}
