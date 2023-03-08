import { EditorPlugin, object } from '@edtr-io/plugin'

import { PartnerList } from '@/components/landing/rework/partner-list'

export const pagePartnersPlugin: EditorPlugin = {
  Component: () => <PartnerList inContent />,
  state: object({}),
  config: {},
}
