import { PartnerList } from '@/components/landing/rework/partner-list'
import { EditorPlugin, object } from '@/serlo-editor/plugin'

export const pagePartnersPlugin: EditorPlugin = {
  Component: () => <PartnerList inContent />,
  state: object({}),
  config: {},
}
