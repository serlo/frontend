import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { DropdownButton } from './dropdown-button'

interface AnchorLinkCopyToolProps {
  serloEntityId: number
  pluginId: string
}

export function AnchorLinkCopyTool({
  pluginId,
  serloEntityId,
}: AnchorLinkCopyToolProps) {
  const editorStrings = useEditorStrings()
  const { strings } = useInstanceData()

  // only on "/add-revision/…" is a simple way to only show the tool on serlo.org and when we have a uuid
  if (!navigator.clipboard || !window.location.href.includes('add-revision')) {
    return null
  }

  return (
    <DropdownButton
      onClick={() => {
        const url = `https://serlo.org/${serloEntityId}#${
          pluginId.split('-')[0]
        }`
        void navigator.clipboard.writeText(url)
        showToastNotice(strings.share.copySuccess, 'success', 2000)
      }}
      label={editorStrings.plugins.rows.copyAnchorLink}
      icon={faHashtag}
      separatorTop
      dataQa="copy-anchor-link-button"
    />
  )
}
