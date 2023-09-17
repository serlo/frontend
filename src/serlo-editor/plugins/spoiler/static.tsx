import { SpoilerRenderer } from './renderer'
import { isPrintMode } from '@/components/print-mode'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSpoilerPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function SpoilerStaticRenderer({ state }: EditorSpoilerPlugin) {
  const { title, content } = state
  return (
    <SpoilerRenderer
      title={<>{title}</>}
      content={<StaticRenderer state={content} />}
      openOverwrite={isPrintMode ? true : undefined}
    />
  )
}
