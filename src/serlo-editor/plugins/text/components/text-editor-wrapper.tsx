import { InlineTextEditor, InlineTextEditorProps } from './inline-text-editor'
import { TextEditor, TextEditorProps } from './text-editor'
import { useTextConfig } from '../hooks/use-text-config'

export type TextEditorWrapperProps = TextEditorProps | InlineTextEditorProps

/**
 * TODO: This is just a quick solution. Things to be reconsidered:
 * 1. Should this be a component or just a function
 * 2. The naming of the components (or function)
 * 3. The naming of the config property (`controls`)
 * 4. Is it worth having a separate component for the inline editor?
 */
export function TextEditorWrapper(props: TextEditorWrapperProps) {
  const config = useTextConfig(props.config)

  if (config.controls) {
    return <InlineTextEditor {...(props as InlineTextEditorProps)} />
  }

  return <TextEditor {...props} />
}
