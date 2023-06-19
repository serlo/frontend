import styled from 'styled-components'

import { RowsPluginConfig } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { colors, legacyEditorTheme } from '@/helper/colors'
import { EdtrIcon, edtrPlus } from '@/serlo-editor/editor-ui'

interface AddButtonProps {
  focused: boolean
  visible: 'always' | 'on-focus'
  config: RowsPluginConfig
}

const AddButton = styled.div<AddButtonProps>(({ focused, visible }) => {
  return {
    maxWidth: '100%',
    height: '26px',
    borderRadius: '13px',
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    color: legacyEditorTheme.secondary.color,
    backgroundColor: legacyEditorTheme.primary.color,
    padding: '5px 0 10px',
    opacity: visible === 'always' ? 0.6 : focused ? 0.6 : 0,
    transition: '150ms all ease-in-out',
    // position: inline ? 'absolute' : 'relative',
    zIndex: 70,

    '&:hover': {
      color: colors.editorPrimary,
      opacity: 1,
      cursor: 'pointer',
    },
  }
})

interface AddRowButtonProps {
  config: RowsPluginConfig
  focused: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
  visuallyEmphasized?: boolean
}

export function AddRowButton(props: AddRowButtonProps) {
  const { config, focused, onClick, visuallyEmphasized = false } = props
  const editorStrings = useEditorStrings()

  return (
    <AddButton
      className="add-trigger"
      config={config}
      focused={focused}
      visible={visuallyEmphasized ? 'always' : 'on-focus'}
      title={editorStrings.rows.addAnElement}
      onMouseDown={onClick}
    >
      <EdtrIcon icon={edtrPlus} className="w-[26px]" />
      {visuallyEmphasized ? (
        <span className="text-almost-black">
          {editorStrings.rows.addAnElement}
        </span>
      ) : null}
    </AddButton>
  )
}
