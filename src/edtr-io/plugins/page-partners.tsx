import { EditorPlugin, object } from 'test-edtr-io/plugin'

import { PartnerList } from '@/components/landing/rework/partner-list'

export const pagePartnersPlugin: EditorPlugin = {
  Component: () => <PartnerList inContent />,
  state: object({}),
  config: {},
}
