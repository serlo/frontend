import type { BoxProps } from '.'
import { type BoxType, types } from './renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const BoxToolbar = ({ id, state }: BoxProps) => {
  const boxStrings = useEditorStrings().plugins.box
  const { strings } = useInstanceData()

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
              className={tw`
                mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100 px-1 py-[1px]
                text-sm transition-all hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
              value={state.type.value}
            >
              {types.map((type) => {
                return (
                  <option key={type} value={type}>
                    {strings.content.boxTypes[type as BoxType]}
                  </option>
                )
              })}
            </select>
          </div>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}
