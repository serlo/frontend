import { editorColorText, EditorSvgIcon } from '@editor/editor-ui'

interface ColorTextIconProps {
  color: string
}

export const ColorTextIcon = ({ color }: ColorTextIconProps) => (
  <span className="relative inline-block align-middle">
    <span className="flex flex-col items-center">
      <EditorSvgIcon pathData={editorColorText} />
      <span
        className="absolute bottom-[1.5px] w-[70%] rounded-[3px] border-2"
        style={{ borderColor: color }}
      />
    </span>
  </span>
)
