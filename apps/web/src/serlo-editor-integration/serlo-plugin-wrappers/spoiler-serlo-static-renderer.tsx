import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import { EditorSpoilerDocument } from '@editor/types/editor-plugins'

export function SpoilerSerloStaticRenderer({
  ...props
}: EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }) {
  return <SpoilerStaticRenderer {...props} />
}
