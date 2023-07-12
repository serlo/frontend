import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useState, useMemo, useRef } from 'react'
import styled from 'styled-components'

import { edtrClose, EdtrIcon } from '.'
import {
  OverlayButton,
  PluginToolbarOverlayButton,
} from '../plugin/plugin-toolbar'
import { PluginToolbar } from './plugin-toolbar/plugin-toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export interface DocumentEditorProps {
  children: React.ReactNode // The rendered document
  settingsRef: React.RefObject<HTMLDivElement> // The rendered settings
  toolbarRef: React.RefObject<HTMLDivElement> // The rendered toolbar buttons
  hasSettings: boolean // `true` if the document has rendered any settings
  hasToolbar: boolean // `true` if the document has rendered any toolbar buttons
  renderSettings?( // Render prop to override rendering of settings
    children: React.ReactNode, // the rendered settings
    { close }: { close(): void }
  ): React.ReactNode // returns the newly rendered settings
  renderToolbar?(children: React.ReactNode): React.ReactNode // Render prop to override rendering of toolbar
  focused: boolean // `true` if the document is focused
  documentId: string
}

export function DocumentEditor({
  focused,
  children,
  renderSettings,
  renderToolbar,
  settingsRef,
  toolbarRef,
  hasSettings,
  hasToolbar,
  documentId,
}: DocumentEditorProps) {
  const [hasHover, setHasHover] = useState(false)

  const editorStrings = useEditorStrings()

  const shouldShowSettings = showSettings()
  const renderSettingsContent = useMemo<typeof renderSettings>(() => {
    return shouldShowSettings
      ? (children, { close }) => (
          <>
            <Header className="mb-4">
              <H4>{editorStrings.edtrIo.extendedSettings}</H4>
              <BorderlessOverlayButton
                as={OverlayButton}
                onClick={() => {
                  close()
                }}
                label={editorStrings.edtrIo.close}
              >
                <EdtrIcon icon={edtrClose} />
              </BorderlessOverlayButton>
            </Header>
            {renderSettings?.(children, { close }) || children}
          </>
        )
      : undefined
  }, [renderSettings, shouldShowSettings, editorStrings])

  const isFocused = focused && (showSettings() || showToolbar())
  const isHovered = hasHover && (showSettings() || showToolbar())

  const isAppended = useRef(false)
  const toolbar = (
    <>
      {showSettings() ? (
        <PluginToolbarOverlayButton
          label={editorStrings.edtrIo.settings}
          icon={<FaIcon icon={faCog} className="text-xl" />}
          renderContent={renderSettingsContent}
          contentRef={settingsRef}
        />
      ) : null}
      <div
        ref={(ref) => {
          // The ref `isAppended` ensures that we only append the content once
          // so that we don't lose focus on every render
          if (ref && toolbarRef.current && !isAppended.current) {
            isAppended.current = true
            ref.appendChild(toolbarRef.current)
          } else if (!showSettings()) {
            isAppended.current = false
          }
        }}
      />
    </>
  )

  return (
    <Container
      className={
        isFocused || isHovered
          ? 'default-document-editor-container document-editor-container'
          : 'document-editor-container'
      }
      isFocused={isFocused}
      isHovered={isHovered}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
    >
      <ToolbarContainer isFocused={isFocused} isHovered={isHovered}>
        <ToolbarContent isFocused={isFocused} isHovered={isHovered}>
          {renderToolbar ? renderToolbar(toolbar) : toolbar}
        </ToolbarContent>
      </ToolbarContainer>
      {isFocused ? (
        <PluginToolbar
          pluginId={documentId}
          settings={renderSettings?.(null, { close }) ?? children ?? null}
        />
      ) : null}
      {children}
    </Container>
  )

  function showSettings(): boolean {
    return (
      hasSettings ||
      (renderSettings !== undefined &&
        renderSettings(null, {
          close() {
            // noop
          },
        }) !== null)
    )
  }

  function showToolbar(): boolean {
    return hasToolbar || renderToolbar !== undefined
  }
}

interface ToolbarProps {
  isFocused: boolean
  isHovered: boolean
}

const ToolbarContent = styled.div<ToolbarProps>(({ isFocused, isHovered }) => ({
  backgroundColor: '#fff',
  borderRadius: '5px 0 0 5px',
  marginRight: '2px',
  paddingBottom: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  opacity: isFocused ? 1 : isHovered ? 0.7 : 0,
  zIndex: 16,
  position: 'relative',
  transition: '250ms opacity ease-in-out',
}))

const ToolbarContainer = styled.div<ToolbarProps>(
  ({ isFocused, isHovered }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: 'center top',
    transform: 'translateX(-100%)',
    pointerEvents: isFocused || isHovered ? 'all' : 'none',
    zIndex: isHovered ? '21' : 'auto',
    '&::before': {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      right: 0,
      content: '""',
      opacity: 1,
      height: '100%',
      width: '2px',
      zIndex: 15,
    },
  })
)

const Container = styled.div<Partial<ToolbarProps>>(
  ({ isFocused, isHovered }) => ({
    minHeight: '10px',
    marginBottom: '25px',
    position: 'relative',
    borderLeft: '2px solid transparent',
    paddingLeft: '5px',
    transition: '250ms all ease-in-out',

    ...(isFocused || isHovered
      ? {
          borderColor: isFocused ? '#333' : '#eee',
          paddingTop: 0,
          paddingBottom: 0,
        }
      : {}),

    ...(!isFocused && isHovered
      ? {
          [`&:hover:has(.default-document-editor-container:hover) > ${ToolbarContainer} > ${ToolbarContent}`]:
            {
              opacity: 0,
              borderColor: 'transparent',
            },
        }
      : {}),
  })
)

const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const H4 = styled.h4({
  marginRight: '25px',
})

const BorderlessOverlayButton = styled.button({
  border: 'none !important',
  padding: '0 !important',
  minWidth: '0 !important',
})
