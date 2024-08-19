import { NextPage } from 'next'
import { useEffect, useState } from 'react'
//@ts-expect-error no types available
import TinCan from 'tincanjs'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'

const ContentPage: NextPage = () => {
  const [tincan, setTincan] = useState<null | {
    sendStatement: (
      param: object,
      onErr: (p1: object, p2: object) => void
    ) => void
  }>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const _tincan = new TinCan({
      recordStores: [
        {
          endpoint: 'https://watershedlrs.com/api/organizations/25975/lrs/',
          username: '97c9dcdcc2b2d8', // key
          password: '44ac953d3f72a4', // secret
          allowFail: false,
        },
      ],
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setTincan(_tincan)
  }, [])

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
            if (!tincan) return
            tincan.sendStatement(
              {
                actor: {
                  mbox: 'mailto:test@serlo.org',
                },
                verb: {
                  id: 'http://adlnet.gov/expapi/verbs/attempted',
                },
                target: {
                  id: 'https://experienceapi.com/activities/sending-my-first-statement',
                },
              },
              function (err: object, result: object) {
                // eslint-disable-next-line no-console
                console.error(err)
                // eslint-disable-next-line no-console
                console.log(result)
              }
            )
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
