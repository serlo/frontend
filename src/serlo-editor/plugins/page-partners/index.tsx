import { PartnerList } from '@/components/landing/rework/partner-list'
import { EditorPlugin, object } from '@/serlo-editor/plugin'

const pagePartnersState = object({})
export type PagePartnersPluginState = typeof pagePartnersState

export const pagePartnersPlugin: EditorPlugin = {
  Component: () => <PartnerList inContent />,
  state: pagePartnersState,
  config: {},
}
