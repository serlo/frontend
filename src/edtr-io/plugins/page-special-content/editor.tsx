import clsx from 'clsx'

import { PageSpecialContentPluginProps } from '.'
import { PageSpecialContentRenderer, supportedTypes } from './renderer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export const PageSpecialContentEditor: React.FunctionComponent<
  PageSpecialContentPluginProps
> = (props) => {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor
  const { type, data } = props.state

  const hasNoType = type.value === ''

  return (
    <>
      {hasNoType ? (
        renderInlineSettings()
      ) : (
        <div>
          {data.value === '' ? (
            <p>Please Import Data in Settings</p>
          ) : (
            <PageSpecialContentRenderer type={type.value} data={data.value} />
          )}
        </div>
      )}
      {renderIntoSettingsModal()}
    </>
  )

  function renderInlineSettings() {
    return (
      <>
        <b className="serlo-h4 block mt-6 ml-0 mb-4">
          {editorStrings.pageSpecialContent.choose}:
        </b>
        <ul className="pb-8 unstyled-list flex">
          {supportedTypes.map(renderLi)}
        </ul>
      </>
    )
  }

  function renderIntoSettingsModal() {
    return props.renderIntoSettings(
      <>
        {renderInlineSettings()}
        <b className="serlo-h4 block ml-0 mb-4">
          {editorStrings.pageSpecialContent.data}:
        </b>
        <p className="mb-2">
          Make your changes in{' '}
          <a href="https://docs.google.com/spreadsheets/d/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/edit#gid=0">
            this spreadsheet
          </a>{' '}
          first and then import data here.
        </p>
        <button
          className="serlo-button bg-amber-200 hover:bg-amber-200 focus:bg-amber-300 mb-12"
          onClick={async () => {
            try {
              const response = await fetch(
                'https://opensheet.elk.sh/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/teamdata'
              )
              const jsonString = await response.text()
              data.set(jsonString)
              showToastNotice('👍 Imported', 'success')
            } catch (error) {
              showToastNotice('⚠️ Sorry… something went wrong', 'warning')
              // eslint-disable-next-line no-console
              console.log(error)
            }
          }}
        >
          Import Data
        </button>
      </>
    )
  }

  function renderLi(title: typeof supportedTypes[number]) {
    const active = type.value === title

    return (
      <li key={title}>
        <button
          onClick={(event) => {
            event.preventDefault()
            type.set(title)
          }}
          className={clsx(
            'bg-brand-150 rounded-lg flex flex-row w-24 mr-2 opacity-50 p-1',
            'hover:bg-brand capitalize font-bold',
            active && 'bg-brand'
          )}
        >
          {title}
        </button>
      </li>
    )
  }
}
