import clsx from 'clsx'
import Cookies from 'js-cookie'
import React from 'react'

import { Breadcrumbs } from '../navigation/breadcrumbs'
import { MathSpan } from '@/components/content/math-span'
import { useInstanceData } from '@/contexts/instance-context'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { EditorPageData } from '@/fetcher/fetch-editor-data'

export function AddRevision({
  initialState,
  type,
  needsReview,
  id,
  breadcrumbsData,
}: EditorPageData) {
  const { strings } = useInstanceData()

  return (
    <>
      <Breadcrumbs
        data={
          breadcrumbsData ?? [
            {
              label: strings.revisions.toContent,
              url: `/${id}`,
            },
          ]
        }
        asBackButton={breadcrumbsData ? undefined : true}
      />
      <MathSpan formula="" />
      <div className="controls-portal sticky top-0 z-[94] bg-white" />
      <div
        className={clsx(
          'max-w-[816px] mx-auto mb-24 edtr-io serlo-editor-hacks'
        )}
      >
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
    </>
  )
}
