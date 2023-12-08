import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { DropdownButton } from './dropdown-button'
import { shouldUseFeature } from '@serlo/frontend/src/components/user/profile-experimental'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { showToastNotice } from '@serlo/frontend/src/helper/show-toast-notice'

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

  if (
    !navigator.clipboard ||
    !window.location.href.includes('add-revision') ||
    !shouldUseFeature('editorAnchorLinkCopyTool')
  ) {
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
        showToastNotice(
          '👉 ' + editorStrings.edtrIo.anchorLinkWarning,
          undefined,
          5500
        )
      }}
      label={editorStrings.plugins.rows.copyAnchorLink}
      icon={faHashtag}
      className="mt-2.5 border-t pt-2.5"
      dataQa="copy-anchor-link-button"
    />
  )
}
