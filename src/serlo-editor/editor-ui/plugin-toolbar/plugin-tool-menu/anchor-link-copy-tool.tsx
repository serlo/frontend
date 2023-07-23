import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { DropdownButton } from './dropdown-button'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

interface AnchorLinkCopyToolProps {
  pluginId: string
}

export function AnchorLinkCopyTool({ pluginId }: AnchorLinkCopyToolProps) {
  const serloEntityId = useEntityId()
  const pluginStrings = useEditorStrings().plugins
  const { strings } = useInstanceData()

  if (
    !serloEntityId ||
    !navigator.clipboard ||
    !window.location.href.includes('add-revision')
  )
    return null

  return (
    <DropdownButton
      onClick={() => {
        const url = `/${serloEntityId}#${pluginId.split('-')[0]}`
        void navigator.clipboard.writeText(url)
        showToastNotice(strings.share.copySuccess, 'success')
      }}
      label={pluginStrings.rows.copyAnchorLink}
      icon={faHashtag}
      className="mt-1 border-t pt-1"
    />
  )
}
