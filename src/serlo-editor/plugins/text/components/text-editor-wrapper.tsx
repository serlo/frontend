import { InlineTextEditor, InlineTextEditorProps } from './inline-text-editor'
import { TextEditor, TextEditorProps } from './text-editor'
import { useTextConfig } from '../hooks/use-text-config'

export type TextEditorWrapperProps = TextEditorProps | InlineTextEditorProps

export function TextEditorWrapper(props: TextEditorWrapperProps) {
  const config = useTextConfig(props.config)

  if (config.controls) {
    return <InlineTextEditor {...(props as InlineTextEditorProps)} />
  }

  return <TextEditor {...props} />
}
