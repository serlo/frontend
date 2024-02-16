import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'

import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import type { InstanceData, LoggedInData } from '@/data-types'

export interface SerloRendererProps {
  instanceData: InstanceData
  loggedInData: LoggedInData
  document?: AnyEditorDocument | AnyEditorDocument[]
}

export function SerloRenderer({
  instanceData,
  loggedInData,
  ...props
}: SerloRendererProps) {
  return (
    <InstanceDataProvider value={instanceData}>
      <LoggedInDataProvider value={loggedInData}>
        <div className="serlo-editor-hacks">
          <StaticRenderer {...props} />
        </div>
      </LoggedInDataProvider>
    </InstanceDataProvider>
  )
}
