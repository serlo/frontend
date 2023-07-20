import { faClose, faCog } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, useMemo, useRef } from 'react'

import { PluginToolbarOverlayButton } from '../plugin/plugin-toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

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
}

// TODO: Rename this to `PluginSettings` or something similar after moving the toolbar out of it.
export function DocumentEditor({
  focused,
  children,
  renderSettings,
  renderToolbar,
  settingsRef,
  toolbarRef,
  hasSettings,
  hasToolbar,
}: DocumentEditorProps) {
  const [hasHover, setHasHover] = useState(false)

  const editorStrings = useEditorStrings()

  const shouldShowSettings = showSettings()

  const renderSettingsContent = useMemo<typeof renderSettings>(() => {
    return shouldShowSettings
      ? (children, { close }) => (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="mr-6">{editorStrings.edtrIo.extendedSettings}</h4>
              <button
                onClick={() => close()}
                className="serlo-button-editor-secondary"
              >
                <span className="sr-only">{editorStrings.edtrIo.close}</span>
                <FaIcon icon={faClose} />
              </button>
            </div>
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
    <div
      className={clsx(
        isFocused || isHovered
          ? 'default-document-editor-container document-editor-container py-0'
          : 'document-editor-container',
        'relative -ml-[7px] mb-6 min-h-[10px] border-l-2 pl-[5px] transition-all',
        isFocused || isHovered
          ? isFocused
            ? 'border-almost-black'
            : 'border-gray-200'
          : 'border-transparent',
        !isFocused && isHovered
          ? tw`
            hover:[&:has(.default-document-editor-container):hover>.toolbar-container>div]:border-transparent
            hover:[&:has(.default-document-editor-container):hover>.toolbar-container>div]:opacity-0
          `
          : ''
      )}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
    >
      {children}
      <div
        className={clsx(
          'toolbar-container absolute left-0 top-0 -translate-x-full [transform-origin:center_top]',
          isHovered ? 'z-[21]' : 'z-auto',
          isFocused || isHovered
            ? 'pointer-events-auto'
            : 'pointer-events-none',
          tw`
            before:pointer-events-none before:absolute before:right-0 before:top-0 before:z-[15]
            before:h-full before:w-0.5 before:opacity-100 before:content-[_]`
        )}
      >
        <div
          className={clsx(
            'relative z-[16] mr-0.5 flex flex-col items-end rounded-l-md bg-white pb-2.5 transition-opacity',
            isFocused ? 'opacity-100' : isHovered ? 'opacity-70' : 'opacity-0'
          )}
        >
          {renderToolbar ? renderToolbar(toolbar) : toolbar}
        </div>
      </div>
    </div>
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
