import type { PagePartnersPluginProps } from '.'
import { PartnerList } from '@/components/landing/rework/partner-list'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export const PagePartnersEditor: React.FunctionComponent<
  PagePartnersPluginProps
> = (props) => {
  const { id, focused } = props

  return (
    <>
      {focused ? (
        <PluginToolbar
          pluginType={EditorPluginType.PagePartners}
          pluginControls={<PluginDefaultTools pluginId={id} />}
        />
      ) : null}
      <PartnerList inContent />
    </>
  )
}
