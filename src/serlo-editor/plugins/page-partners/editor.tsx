import { PagePartnersPluginProps } from '.'
import { PartnerList } from '@/components/landing/rework/partner-list'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const PagePartnersEditor: React.FunctionComponent<
  PagePartnersPluginProps
> = (props) => {
  const { id, focused } = props

  return (
    <>
      {renderPluginToolbar()}
      <PartnerList inContent />
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginType={EditorPluginType.PagePartners}
        pluginControls={<PluginDefaultTools pluginId={id} />}
      />
    )
  }
}
