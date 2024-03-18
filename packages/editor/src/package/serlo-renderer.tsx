import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { SupportedLanguage } from '@editor/types/language-data'

import { editorData } from './editor-data'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'

export interface SerloRendererProps {
  language?: SupportedLanguage
  document?: AnyEditorDocument | AnyEditorDocument[]
}

export function SerloRenderer({
  language = 'de',
  ...props
}: SerloRendererProps) {
  const { instanceData, loggedInData } = editorData[language]

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
