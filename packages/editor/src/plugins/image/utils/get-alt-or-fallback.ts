import { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'
import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import { EditorImageDocument } from '@editor/types/editor-plugins'

export function getAltOrFallback(
  altFallback: string,
  caption: EditorImageDocument['state']['caption'],
  alt: EditorImageDocument['state']['alt']
) {
  const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

  return alt
    ? alt
    : hasVisibleCaption
      ? extractStringFromTextDocument(caption)
      : altFallback
}
