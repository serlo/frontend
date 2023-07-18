import {
  HeadlessTextEditor,
  HeadlessTextEditorProps,
} from './headless-text-editor'
import { TextEditor, TextEditorProps } from './text-editor'
import { useTextConfig } from '../hooks/use-text-config'

export type TextEditorWrapperProps = TextEditorProps | HeadlessTextEditorProps

export function TextEditorWrapper(props: TextEditorWrapperProps) {
  const config = useTextConfig(props.config)

  if (config.controls) {
    return <HeadlessTextEditor {...(props as HeadlessTextEditorProps)} />
  }

  return <TextEditor {...props} />
}
