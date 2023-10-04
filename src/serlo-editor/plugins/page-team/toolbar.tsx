import {
  faFileImport,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'

import type { PageTeamPluginProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
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

export function PageTeamToolbar({
  focused,
  editable,
  id,
  state,
}: PageTeamPluginProps) {
  const { lang } = useInstanceData()

  if (!focused || !editable) return null

  const buttonClassName = tw`
    mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all
  hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200
  `

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
                state.data.set(() => teamData.right)
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
