import { EditorPluginType } from '@editor/types/editor-plugin-type'
import * as t from 'io-ts'

/*
 * Simple validation of editor state
 */
export const StateDecoder = t.strict({
  plugin: t.literal(EditorPluginType.Rows),
  state: t.array(
    t.strict({
      plugin: t.union([
        t.literal(EditorPluginType.Article),
        t.literal(EditorPluginType.ArticleIntroduction),
        t.literal(EditorPluginType.Geogebra),
        t.literal(EditorPluginType.Anchor),
        t.literal(EditorPluginType.Video),
        t.literal(EditorPluginType.Audio),
        t.literal(EditorPluginType.SerloTable),
        t.literal(EditorPluginType.Highlight),
        t.literal(EditorPluginType.Injection),
        t.literal(EditorPluginType.Multimedia),
        t.literal(EditorPluginType.Spoiler),
        t.literal(EditorPluginType.Box),
        t.literal(EditorPluginType.Image),
        t.literal(EditorPluginType.Text),
        t.literal(EditorPluginType.Equations),
      ]),
      state: t.unknown,
    })
  ),
})
