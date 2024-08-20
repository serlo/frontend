import { NextPage } from 'next'
import XAPI from '@xapi/xapi'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'

const endpoint = 'https://watershedlrs.com/api/organizations/25975/lrs'
const key = '97c9dcdcc2b2d8' //
const secret = '44ac953d3f72a4'
const auth = XAPI.toBasicAuth(key, secret)
const xapi = new XAPI({
  endpoint,
  auth,
})

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      noIndex
      showNav={false}
      authorization={{}}
    >
      <div className="mx-auto max-w-2xl rounded-xl p-4">
        <h1 className="serlo-h1">xAPI Trigger</h1>
        <button
          className="serlo-button-blue text-xl"
          onClick={() => {
            void xapi.sendStatement({
              statement: {
                actor: {
                  name: 'Botho',
                  mbox: 'mailto:botho@serlo.org',
                  objectType: 'Agent',
                },
                verb: {
                  id: 'http://example.com/verbs/tested',
                  display: {
                    'en-GB': 'tested',
                  },
                },
                object: {
                  objectType: 'Activity',
                  id: 'https://serlo.org/___xapi_trigger',
                },
              },
            })
          }}
        >
          Click to send xAPI statement
        </button>

        <div className="mt-12">
          Afterwards:{' '}
          <a
            className="serlo-link"
            href="https://watershedlrs.com/app/index.html#/data/search"
          >
            Open Watershed to see the statement
          </a>
        </div>
      </div>
    </FrontendClientBase>
  )
}
export default ContentPage
