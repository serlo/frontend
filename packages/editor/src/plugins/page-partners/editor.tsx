import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { PagePartnersPluginProps } from '.'
import { PartnerList } from '@/components/landing/rework/partner-list'

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
