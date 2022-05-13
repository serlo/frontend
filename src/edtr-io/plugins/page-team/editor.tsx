import { either as E } from 'fp-ts'
import * as t from 'io-ts'

import { PageTeamPluginProps } from '.'
import { PageTeamRenderer } from './renderer'
import { showToastNotice } from '@/helper/show-toast-notice'

const TeamDataDecoder = t.array(
  t.strict({
    firstName: t.string,
    lastName: t.string,
    user: t.string,
    position: t.string,
    extraLinkUrl: t.string,
    extraLinkText: t.string,
    photo: t.string,
  })
)

export const PageTeamEditor: React.FunctionComponent<PageTeamPluginProps> = (
  props
) => {
  const { data } = props.state
  const noData = !data || data.length === 0

  const rendererData = data.map((entry) => {
    return {
      firstName: entry.firstName.value,
      lastName: entry.lastName.value,
      user: entry.user.value,
      position: entry.position.value,
      extraLinkUrl: entry.extraLinkUrl.value,
      extraLinkText: entry.extraLinkText.value,
      photo: entry.photo.value,
    }
  })

  return (
    <>
      <div>
        {noData ? renderDataImport() : <PageTeamRenderer data={rendererData} />}
      </div>
      {props.renderIntoSettings(renderDataImport())}
    </>
  )

  function renderDataImport() {
    return (
      <div className="bg-amber-50 p-4">
        <b className="serlo-h4 block ml-0 mb-4">Supply data to plugin</b>
        <p className="mb-4">
          Make your changes in{' '}
          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/edit#gid=0"
            rel="noreferrer"
          >
            this spreadsheet
          </a>{' '}
          first and afterwards use this button.
        </p>
        <button
          className="serlo-button bg-amber-200 hover:bg-amber-300 focus:bg-amber-300 mb-12 text-base"
          onClick={async () => {
            try {
              const response = await fetch(
                'https://opensheet.elk.sh/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/teamdata'
              )
              const teamData = TeamDataDecoder.decode(
                (await response.json()) as unknown
              )

              if (E.isRight(teamData)) {
                data.set(() => teamData.right)
                showToastNotice('👍 Imported', 'success')
              } else {
                throw new Error(
                  'Json result from opensheet.elk.sh is not valid'
                )
              }
            } catch (error) {
              showToastNotice('⚠️ Sorry… something went wrong', 'warning')
              // eslint-disable-next-line no-console
              console.log(error)
            }
          }}
        >
          Import Data
        </button>
      </div>
    )
  }
}
