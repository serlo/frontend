import { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'
import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import { EditorImageDocument } from '@editor/types/editor-plugins'

import type { InstanceData } from '@/data-types'

export function getAltOrFallback(
  instanceData: InstanceData,
  caption: EditorImageDocument['state']['caption'],
  alt: EditorImageDocument['state']['alt']
) {
  const altFallback = instanceData.strings.content.imageAltFallback

  const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

  return alt
    ? alt
    : hasVisibleCaption
      ? extractStringFromTextDocument(caption)
      : altFallback
}
