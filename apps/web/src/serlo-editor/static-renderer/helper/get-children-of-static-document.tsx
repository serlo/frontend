import { AnyEditorDocument } from '@/serlo-editor/types/editor-plugins'
import {
  isArticleIntroductionDocument,
  isArticleDocument,
  isExerciseDocument,
  isImageDocument,
  isMultimediaDocument,
  isPageLayoutDocument,
  isRowsDocument,
  isSolutionDocument,
} from '@/serlo-editor/types/plugin-type-guards'

/**
 * Helper for static renderer that returns the direct children of the supplied document.
 * Run this recursively if you need the nested children as well
 */
export function getChildrenOfStaticDocument(
  document?: AnyEditorDocument,
  ignore?: string[]
): AnyEditorDocument[] {
  if (!document || ignore?.includes(document.plugin)) return []

  const children =
    //
    isRowsDocument(document)
      ? document.state
      : //
        isArticleDocument(document)
        ? [document.state.introduction, document.state.content]
        : //
          isMultimediaDocument(document) ||
            isArticleIntroductionDocument(document)
          ? [document.state.explanation, document.state.multimedia]
          : //
            isPageLayoutDocument(document)
            ? [document.state.column1, document.state.column2]
            : //
              isExerciseDocument(document)
              ? [document.state.content, document.state.interactive]
              : //
                isSolutionDocument(document)
                ? [document.state.steps, document.state.strategy]
                : //
                  isImageDocument(document)
                  ? [document.state.caption]
                  : //
                    []

  return children as AnyEditorDocument[]

  // ignoring for now
  // Equations
  // SerloTable
  // ScMcExercise
  // InputExercise
}
