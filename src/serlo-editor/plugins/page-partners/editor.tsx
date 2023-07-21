import { PagePartnersPluginProps } from '.'
import { PartnerList } from '@/components/landing/rework/partner-list'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
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
        pluginId={id}
        pluginType={EditorPluginType.PagePartners}
        pluginControls={<DefaultControls pluginId={id} />}
      />
    )
  }
}
