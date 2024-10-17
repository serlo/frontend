import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import { DropdownButton } from './dropdown-button'

// currently only for serlo.org
export function AnchorLinkCopyTool({ pluginId }: { pluginId: string }) {
  const rowsStrings = useEditStrings().plugins.rows

  const matchSerloId = /\/entity\/repository\/add-revision\/(?<id>\d+)/

  const serloEntityId =
    typeof window !== 'undefined' &&
    window.location.href.match(matchSerloId)?.groups?.id

  if (!serloEntityId || !navigator.clipboard) return null

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
