import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { BoxProps } from '.'
import { types } from './renderer'

export const BoxToolbar = ({ id, state }: BoxProps) => {
  const boxStrings = useEditorStrings().plugins.box
  const { strings } = useInstanceData()

  const typeOptions = types.map((type) => {
    return (
      <option
        key={type}
        value={type}
        data-qa={`plugin-box-type-chooser-option-${type}`}
      >
        {strings.content.boxTypes[type]}
      </option>
    )
  })

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Box}
      pluginSettings={
        <>
          <div className="serlo-tooltip-trigger">
            <EditorTooltip
              text={boxStrings.typeTooltip}
              className="-ml-4 !pb-1"
            />
            <select
              onChange={(e) => state.type.set(e.target.value)}
              className={cn(`
                mr-2 cursor-pointer rounded-md !border border-gray-500
              bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `)}
              value={state.type.value}
              data-qa="plugin-box-type-chooser"
            >
              {typeOptions}
            </select>
          </div>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}
