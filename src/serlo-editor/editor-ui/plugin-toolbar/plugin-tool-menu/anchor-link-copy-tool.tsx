import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { DropdownButton } from './dropdown-button'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

interface AnchorLinkCopyToolProps {
  pluginId: string
}

export function AnchorLinkCopyTool({ pluginId }: AnchorLinkCopyToolProps) {
  const serloEntityId = useEntityId()
  const editorStrings = useEditorStrings()
  const { strings } = useInstanceData()

  if (
    !serloEntityId ||
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
        showToastNotice(strings.share.copySuccess, 'success')
        showToastNotice('👉 ' + editorStrings.edtrIo.anchorLinkWarning)
      }}
      label={editorStrings.plugins.rows.copyAnchorLink}
      icon={faHashtag}
      className="mt-2.5 border-t pt-2.5"
    />
  )
}
