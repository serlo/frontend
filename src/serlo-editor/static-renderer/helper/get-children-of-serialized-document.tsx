import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorSolutionPlugin,
  SupportedEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

/**
 * Helper for static renderer that returns the direct children of the supplied document.
 * Run this recursively if you need the nested children as well
 */
export function getChildrenOfSerializedDocument(
  document?: SupportedEditorPlugin,
  ignore?: EditorPluginType[]
): SupportedEditorPlugin[] {
  if (!document || ignore?.includes(document.plugin)) return []

  const children =
    document.plugin === EditorPluginType.Rows
      ? document.state
      : //
      document.plugin === EditorPluginType.Article
      ? [document.state.introduction, document.state.content]
      : //
      document.plugin === EditorPluginType.Multimedia ||
        document.plugin === EditorPluginType.ArticleIntroduction
      ? [document.state.explanation, document.state.multimedia]
      : //
      document.plugin === EditorPluginType.PageLayout
      ? [document.state.column1, document.state.column2]
      : //
      document.plugin === EditorPluginType.Exercise
      ? [document.state.content, document.state.interactive]
      : //
      // TODO: this does not seem to run, investigate
      // @ts-expect-error allow solutions
      document.plugin === EditorPluginType.Solution
      ? [
          (document as EditorSolutionPlugin).state.steps,
          (document as EditorSolutionPlugin).state.strategy,
        ]
      : //
      document.plugin === EditorPluginType.Image
      ? [document.state.caption]
      : //
        []

  return children as SupportedEditorPlugin[]

  // ignoring for now
  // Equations
  // SerloTable
  // ScMcExercise
  // InputExercise
}
