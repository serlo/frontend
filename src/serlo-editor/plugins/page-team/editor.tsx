import { either as E } from 'fp-ts'
import * as t from 'io-ts'

import { PageTeamPluginProps } from '.'
import { PageTeamRenderer } from './renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

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
  const { id } = props
  const noData = !data || data.length === 0
  const { lang } = useInstanceData()
  const focused = useAppSelector((state) => selectIsFocused(state, id))

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
      {renderPluginToolbar()}
      <div>
        {noData ? renderDataImport() : <PageTeamRenderer data={rendererData} />}
      </div>
      {props.renderIntoSettings(renderDataImport())}
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null
    const buttonClassName = "mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"

    return (
      <PluginToolbar
        pluginId={id}
        pluginType={EditorPluginType.PageTeam}
        pluginControls={<DefaultControls pluginId={id} />}
        pluginSettings={renderDataImportButton(buttonClassName)}
      />
    )
  }

  function renderDataImport() {
    const buttonClassName = "serlo-button-editor-primary mb-12 text-base"
    return (
      <div className="bg-editor-primary-50 p-4">
        <b className="serlo-h4 mb-4 ml-0 block">Supply data to plugin</b>
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
        {renderDataImportButton(buttonClassName)}
      </div>
    )
  }

  function renderDataImportButton(buttonClassName: string) {
    return (
      <button
        className={buttonClassName}
        onClick={async () => {
          try {
            const response = await fetch(
              `https://opensheet.elk.sh/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/teamdata_${lang}`
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
            console.error(error)
          }
        }}
      >
        Import Data
      </button>
    )
  }
}
