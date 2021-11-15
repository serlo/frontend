import clsx from 'clsx'
import Cookies from 'js-cookie'
import React from 'react'

import { MathSpan } from '@/components/content/math-span'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { EditorPageData } from '@/fetcher/fetch-editor-data'

export function AddRevision({
  initialState,
  type,
  needsReview,
}: EditorPageData) {
  return (
    <>
      <MathSpan formula="" />
      <div className="controls-portal sticky top-0 z-[99] bg-white" />
      <div className={clsx('max-w-[816px] mx-auto mb-24 edtr-io')}>
        <SerloEditor
          getCsrfToken={() => {
            const cookies = typeof window === 'undefined' ? {} : Cookies.get()
            return cookies['CSRF']
          }}
          needsReview={needsReview}
          onSave={(data) => {
            return new Promise((resolve, reject) => {
              fetch(window.location.pathname, {
                method: 'POST',
                headers: {
                  'X-Requested-with': 'XMLHttpRequest',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-From': 'legacy-serlo.org',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then(
                  (data: {
                    success: boolean
                    redirect: Location
                    errors: object
                  }) => {
                    if (data.success) {
                      resolve()
                      window.location = data.redirect
                    } else {
                      // eslint-disable-next-line no-console
                      console.log(data.errors)
                      reject()
                    }
                  }
                )
                .catch((value) => {
                  // eslint-disable-next-line no-console
                  console.log(value)
                  reject(value)
                })
            })
          }}
          type={type}
          initialState={initialState}
        />
      </div>
      <style jsx global>{`
        .edtr-io h1 {
          @apply mx-side mb-9 mt-4 p-0 font-bold text-3.5xl special-hyphens-auto;
        }
        .edtr-io h2 {
          @apply mt-0 mb-6 pb-1 pt-6;
          @apply text-2.5xl font-bold special-hyphens-auto;
          @apply text-truegray-900 border-truegray-300 border-b;
        }
        .edtr-io {
          h3 {
            @apply mt-5 mb-8 pt-3 font-bold text-1.5xl text-truegray-900;
          }
          div[contenteditable] h3 {
            @apply mt-0;
          }
        }
        .edtr-io {
          @apply text-lg leading-cozy;
        }
        .edtr-io a[data-key] {
          @apply text-brand no-underline break-words hover:underline special-hyphens-auto;
        }
        .edtr-io [data-slate-object='block'] {
          @apply mb-block;
        }
        .edtr-io ul {
          @apply mx-side mb-block mt-4 pl-5 list-none;

          & > li:before {
            @apply absolute special-content-space bg-brand-lighter;
            @apply w-2.5 h-2.5 rounded-full -ml-5 mt-2.25;
          }
          & > li {
            @apply mb-2;
          }
          & > li > ul,
          & > li > ol {
            @apply mt-2 !mb-4;
          }
        }
        .edtr-io ol {
          @apply mx-side mb-block mt-0 pl-7 list-none;
          @apply special-reset-list-counter;

          & > li:before {
            @apply absolute special-content-list-counter special-increment-list-counter;
            @apply font-bold text-center rounded-full -ml-7;
            @apply mt-0.5 bg-brand-150 w-4 h-4 text-xs;
            @apply leading-tight text-brand pt-0.25;
          }
          & > li {
            @apply mb-2;
          }
          & > li > ul,
          & > li > ol {
            @apply mt-2 !mb-4;
          }
        }

        .edtr-io blockquote {
          @apply border-l-6 border-brand-150 p-2.5 my-block mx-side;
        }

        .edtr-io .page-header h1 input {
          @apply w-full;
          @apply mb-9 mt-6 p-0 font-bold text-3.5xl special-hyphens-auto;
        }

        .edtr-io button > div > svg {
          @apply ml-1.5 mr-1.5 mb-1 mt-2;
        }

        .edtr-io {
          .panel {
            margin-bottom: 20px;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 4px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
          }
          .panel-danger > .panel-heading {
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
          }
          .panel-danger {
            border-color: #ebccd1;
          }
          .panel-heading {
            padding: 10px 15px;
            border-bottom: 1px solid transparent;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }
          .panel-body {
            padding: 15px;
          }
        }

        .edtr-io .page-header {
          padding-bottom: 9px;
          margin: 40px 0 20px;
          border-bottom: 1px solid #eee;
        }

        .edtr-io select {
          @apply border-2;
        }

        .edtr-io a {
          @apply text-brand hover:underline;
        }

        .edtr-io {
          .row {
            margin-right: -15px;
            margin-left: -15px;
          }

          .col-sm-1,
          .col-sm-11 {
            float: left;
          }

          .col-sm-1,
          .col-sm-11,
          .col-xs-12 {
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }
          .col-xs-12 {
            width: 100%;
          }
          @media (min-width: 768px) {
            .col-sm-1 {
              width: 8.33333333%;
            }
            .col-sm-11 {
              width: 91.66666667%;
            }
          }

          .edtr-io .hidden-xs {
            @media (max-width: 767px) {
              display: none !important;
            }
          }
        }
      `}</style>
    </>
  )
}
