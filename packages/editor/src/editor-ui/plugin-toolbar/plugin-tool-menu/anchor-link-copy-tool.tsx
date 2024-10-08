import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { DropdownButton } from './dropdown-button'
import { UuidsContext } from '@/contexts/uuids-context'

export function AnchorLinkCopyTool({ pluginId }: { pluginId: string }) {
  const rowsStrings = useEditStrings().plugins.rows

  // using useContext directly so result can also be null for edusharing
  const serloEntityId = useContext(UuidsContext)?.entityId

  const isActive =
    serloEntityId &&
    // only on "/add-revision/…" is a simple way to only show the tool on serlo.org
    // and when we have a uuid for the content
    typeof window !== 'undefined' &&
    window.location.href.includes('/entity/repository/add-revision/') &&
    navigator.clipboard

  if (!isActive) return null

  return (
    <DropdownButton
      onClick={() => {
        const url = `https://serlo.org/${serloEntityId}#${
          pluginId.split('-')[0]
        }`
        void navigator.clipboard.writeText(url)
        showToastNotice(rowsStrings.copySuccess, 'success', 2000)
      }}
      label={rowsStrings.copyAnchorLink}
      icon={faHashtag}
      separatorTop
      dataQa="copy-anchor-link-button"
    />
  )
}
