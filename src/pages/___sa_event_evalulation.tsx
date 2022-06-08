import clsx from 'clsx'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase noHeaderFooter showNav={false}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <AnalyticsEventEval />
    </FrontendClientBase>
  )
}
export default ContentPage

interface Datapoint {
  // added_date: string
  // added_iso: string
  // added_unix: number
  // browser_name: string
  // browser_version: string
  // country_code: string | null
  datapoint: string
  device_type: string
  // document_referrer: string
  // hostname: string
  // hostname_original: string | null
  // is_robot: false
  // lang_language: string
  // lang_region: string
  // os_name: string
  // os_version: null
  path: string
  // screen_height: number
  // screen_width: number
  // session_id: string
  // user_agent: string
  // utm_campaign?: null
  // utm_content?: null
  // utm_medium?: null
  // utm_source?: null
  // utm_term?: null
  // uuid?: null
  // viewport_height: number
}

interface InputJsonData {
  datapoints: Datapoint[]
  meta: { amount: number; createdAt: string; finishedInMs: number }
}

const AnalyticsEventEval = () => {
  const dateFromInputRef = useRef<HTMLInputElement>(null)
  const dateToInputRef = useRef<HTMLInputElement>(null)
  const [activeEvent, setActiveEvent] = useState<string | undefined>(undefined)
  const [data, setData] = useState<InputJsonData | null>(null)
  const [apiUrl, setApiUrl] = useState<string | null>(null)

  const onDateChange = () => {
    if (!dateFromInputRef.current || !dateToInputRef.current) return
    if (!dateFromInputRef.current.value || !dateToInputRef.current.value) return

    setApiUrl(
      `https://simpleanalytics.com/api/export/datapoints?version=5&format=json&hostname=de.serlo.org&start=${dateFromInputRef.current.value}&end=${dateToInputRef.current.value}&robots=false&timezone=Europe%2FBerlin&fields=datapoint%2Cdevice_type%2Cpath&type=events`
    )
  }

  const importAndParse = async (file: File) => {
    try {
      const input = await file.text()
      const inputData = JSON.parse(input) as InputJsonData
      setData(inputData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="serlo-h1 mt-12">Evaluate Analytics Events</h1>
      {data ? renderOverview() : renderInput()}
    </>
  )

  function renderInput() {
    // obvious enhancement:
    // authenticate and fetch data directly

    const inputStyle =
      'serlo-input-font-reset serlo-button font-normal text-brand bg-brand-100 hover:bg-brand-150 mt-2'
    const dateInputStyle = inputStyle + ' mt-12 mx-2'

    return (
      <div className="mx-side my-6">
        <ol className="serlo-ol  italic text-base">
          <li>Select a date-range</li>
          <li>make sure you are logged into Simple Analytics</li>
          <li>Use the generated Link to download data</li>
          <li>Paste data into input</li>
        </ol>
        <label className="italic">
          from:
          <input
            ref={dateFromInputRef}
            type="date"
            className={dateInputStyle}
            onChange={onDateChange}
          />
        </label>
        <label className="italic">
          to:
          <input
            ref={dateToInputRef}
            type="date"
            className={dateInputStyle}
            onChange={onDateChange}
          />
        </label>
        <br />
        {apiUrl ? (
          <div className="mt-2">
            <a
              href={apiUrl}
              target="_blank"
              rel="noreferrer"
              className="serlo-link"
            >
              Get data from here and
            </a>{' '}
            paste it below.
          </div>
        ) : null}

        <br />
        <i className="text-base">Choose JSON file:</i>
        <input
          type="file"
          accept=".json,text/json"
          className={inputStyle}
          placeholder="Choose JSON file"
          onChange={async (e) => {
            if (e.target.files) void importAndParse(e.target.files[0])
          }}
        />
      </div>
    )
  }

  function renderOverview() {
    if (!data) return
    const allCount = data.meta.amount

    const datapointsByName = {} as Record<string, Datapoint[]>

    data.datapoints.forEach((point) => {
      const name = point.datapoint
      if (name)
        if (
          (name &&
            (name.startsWith('legacy_serlo_org') ||
              name.startsWith('invite2edit'))) ||
          name.startsWith('quickbar_') ||
          name.startsWith('search_')
        ) {
          if (!datapointsByName[name]) datapointsByName[name] = []
          datapointsByName[name].push(point)
        }
    })
    return (
      <>
        <p className="serlo-p">
          {allCount} events loaded.{' '}
          <button
            className="serlo-button serlo-make-interactive-transparent-blue"
            onClick={() => window.location.reload()}
          >
            Use other data
          </button>
        </p>
        <h2 className="serlo-h3">Select Event:</h2>
        <nav className="mx-side">
          {Object.keys(datapointsByName).map((eventName) => {
            return (
              <button
                key={eventName}
                className={clsx(
                  'serlo-button mr-2 mb-2 text-base',
                  eventName === activeEvent
                    ? 'serlo-make-interactive-primary'
                    : 'serlo-make-interactive-light'
                )}
                onClick={() => {
                  setActiveEvent(eventName)
                }}
              >
                {eventName} ({datapointsByName[eventName].length})
              </button>
            )
          })}
        </nav>
        <div>{renderEventLists(datapointsByName)}</div>
      </>
    )
  }

  function renderEventLists(datapointsByName: Record<string, Datapoint[]>) {
    if (!activeEvent || !hasOwnPropertyTs(datapointsByName, activeEvent))
      return null

    return (
      <>
        {renderByPath(datapointsByName[activeEvent])}
        {renderByDevice(datapointsByName[activeEvent])}
      </>
    )
  }

  function renderByPath(events: Datapoint[]) {
    const paths = {} as Record<string, number>

    events.forEach((event) => {
      if (!paths[event.path]) paths[event.path] = 1
      else paths[event.path] = paths[event.path] + 1
    })

    const sortedArray = Object.entries(paths).sort(([, a], [, b]) => b - a)

    return (
      <>
        <p className="serlo-p text-base mt-5 mb-2 italic">by path:</p>
        <table className="serlo-table">
          <tbody>
            {sortedArray.map(([path, count]) => {
              return (
                <tr key={path}>
                  <td className="serlo-td">{path}</td>
                  <td className="serlo-td">{count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }

  function renderByDevice(events: Datapoint[]) {
    const devices = {} as Record<string, number>

    events.forEach((event) => {
      if (!devices[event.device_type]) devices[event.device_type] = 1
      else devices[event.device_type] = devices[event.device_type] + 1
    })

    const sortedArray = Object.entries(devices).sort(([, a], [, b]) => b - a)

    return (
      <>
        <p className="serlo-p text-base mt-5 mb-2 italic">devices:</p>
        <table className="serlo-table">
          <tbody>
            {sortedArray.map(([path, count]) => {
              return (
                <tr key={path}>
                  <td className="serlo-td">{path}</td>
                  <td className="serlo-td">{count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}
