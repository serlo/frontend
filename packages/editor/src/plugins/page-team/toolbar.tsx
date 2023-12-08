import {
  faFileImport,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { showToastNotice } from '@serlo/frontend/src/helper/show-toast-notice'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'

import type { PageTeamPluginProps } from '.'

const required = t.type({
  firstName: t.string,
  lastName: t.string,
  user: t.string,
})
const optional = t.partial({
  position: t.string,
  extraLinkUrl: t.string,
  extraLinkText: t.string,
  photo: t.string,
})

const TeamDataDecoder = t.array(t.intersection([required, optional]))

export function PageTeamToolbar({ focused, id, state }: PageTeamPluginProps) {
  const { lang } = useInstanceData()

  if (!focused) return null

  const buttonClassName = cn(`
    mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all
  hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200
  `)

  return (
    <PluginToolbar
      pluginType={EditorPluginType.PageTeam}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      pluginSettings={renderButtons()}
    />
  )

  function renderButtons() {
    return (
      <>
        <a
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/edit#gid=0"
          rel="noreferrer"
          className={buttonClassName}
        >
          Open Spreadsheet <FaIcon icon={faUpRightFromSquare} />
        </a>
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
                const data = teamData.right.map((entry) => {
                  return {
                    position: '',
                    extraLinkUrl: '',
                    extraLinkText: '',
                    photo: '',
                    ...entry,
                  }
                })

                state.data.set(() => data)
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
          Import Data <FaIcon icon={faFileImport} />
        </button>
      </>
    )
  }
}
